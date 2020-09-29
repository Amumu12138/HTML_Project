package com.paojiao.sdk3.service;

import java.util.*;


import com.jfinal.aop.Inject;
import com.jfinal.kit.JsonKit;
import com.jfinal.kit.StrKit;
import com.jfinal.plugin.activerecord.ActiveRecordException;
import com.paojiao.sdk3.common.DS;
import com.paojiao.sdk3.common.PayStyle;
import com.paojiao.sdk3.common.PjConstants;
import com.paojiao.sdk3.common.mongo.manager.IpInfoManager;
import com.paojiao.sdk3.common.util.PjMap;
import com.paojiao.sdk3.handler.tasks.NotifyTask;
import com.paojiao.sdk3.model.*;
import com.paojiao.sdk3.model.pojo.IpInfoEntity;
import org.apache.log4j.Logger;

public class PjThirdSdkOrderService {
	public static final Logger log = Logger.getLogger(PjThirdSdkOrderService.class);


	@Inject
	private  PjThirdSdkGamePayEnvService gamePayEnvService;


	public PjThirdSdkOrder save(PjThirdSdkOrder entity) {
		try {
			return entity.use(DS.sdkMaster).save() == true ? entity : null;
		} catch (ActiveRecordException e) {
			log.error("save error:" + e.getMessage());
			return null;
		}

	}

	public int getPayCount(PjMemberBinding user) {
		StringBuilder sbSql = new StringBuilder(
				"select count(0) as payCount from pj_third_sdk_order where sdkUserId='")
				.append(user.getBindId()).append("' and status=1");
		List<PjThirdSdkOrder> orderList = PjThirdSdkOrder.dao.use(DS.sdkSlave)
				.find(sbSql.toString());
		if (orderList != null && orderList.size() > 0)
			return orderList.get(0).getInt("payCount");
		return 0;
	}


	public PjThirdSdkOrder generatePayOrder(PjThirdSdkChannel sdkChannel,
			PjThirdSdkChannelGame channelGame, PjCpGame game,
			PjMap<String, String> params, Float money, PjMemberBinding user,int ptype,int payType) {

		// 查询当前CP订单是否已存在
		String sql = "select * from pj_third_sdk_order where cpOrderNumber = ? and  gameId = ? limit 1";

		PjThirdSdkOrder order = PjThirdSdkOrder.dao.use(DS.sdkMaster).findFirst(sql,params.get("cpOrderNo"),game.getId());

		if (order != null) {// CP订单已存在,直接返回订单信息
			log.info("CP订单：gameId[" + game.getId() + "],cpOrderNo:["
					+ params.get("cpOrderNo") + "]已存在");
			return order;
		}

		try {
			Random rad = new Random();
			String orderNo = "H5_" + System.currentTimeMillis()
					+ rad.nextInt(10000);
			order = new PjThirdSdkOrder();
			order.setChannelGameId(channelGame.getId());
			order.setCid(params.get("channel"));
			order.setCpOrderNumber(params.get("cpOrderNo"));
			order.setCreateTime(new Date());
			order.setGameId(game.getId());
			if(StrKit.isBlank(params.get("productName"))){
				order.setGoodsName(params.get("goodsName"));
			}else{
				order.setGoodsName(params.get("productName"));
			}
			order.setIp(params.get("ip"));
			order.setMoney(money);
			order.setOrderNumber(orderNo);
			order.setPtype(ptype);//1:渠道支付 2:泡椒支付
			order.setPayType(payType);//支付中心支付
			order.setRoleId(params.get("roleId"));
			order.setRoleName(params.get("roleName"));
			order.setSdkChannelId(sdkChannel.getId());
			order.setSdkChannelName(sdkChannel.getSdkChannelName());
			order.setSdkUserId(user.getBindId());
			order.setSdkVersion(params.get("sdkVersion"));
			order.setServerId(params.get("serverId"));
			order.setServerName(params.get("serverName"));
			order.setStatus(0);
			order.setUid(user.getUserId());
			order.setDescription(params.get("description"));
			order.setExt(params.get("ext"));
			order.setAppVersion(params.get("appVersion"));
			return this.save(order);
		} catch (Exception e) {
			log.error("订单生成异常",e);
		}
		return null;
	}



	public PjThirdSdkOrder generateRhOrder(PjThirdSdkChannel sdkChannel,
										 PjThirdSdkChannelGame channelGame, PjCpGame game,
										 PjMap<String, String> params, Float money, PjMemberBinding user) {

		PjThirdSdkOrder order = new PjThirdSdkOrder();
		String appVersion = params.get("appVersion");
		int ptype = 2;// 默认泡椒支付
        int payType = PayStyle.PAY_CENTER.id;//支付中心支付
			PjThirdSdkGamePayEnv gamePayEnv = gamePayEnvService.getSdkGamePayEnv(channelGame.getId(), appVersion);
			PjThirdSdkGamePayEnv newGamePayEnv = null;
			try {
				if (gamePayEnv == null) {
					// 自动生成当前版本
					gamePayEnv = new PjThirdSdkGamePayEnv();
					gamePayEnv.setAddTime(new Date());
					gamePayEnv.setPayType(1);
					gamePayEnv.setSubPayType(0);
					gamePayEnv.setAddUser(1);
					gamePayEnv.setSdkChannelGameId(channelGame.getId());
					gamePayEnv.setStatus(1);
					gamePayEnv.setUpdateTime(new Date());
					gamePayEnv.setVersion(appVersion);
					newGamePayEnv = gamePayEnvService.createGamePayEnv(gamePayEnv);
				} else {
					newGamePayEnv = gamePayEnv;
				}

			} catch (Exception ex) {
				log.error("自动生成游戏支付环境异常[" + JsonKit.toJson(gamePayEnv) + "]",ex);
			}

			if (newGamePayEnv.getStatus() == 10) {// 如果游戏支付环境为禁用，则禁止充值
				log.error("Pay forbidden：gamePayEnv["+ JsonKit.toJson(newGamePayEnv) + "]");
				return null;
			}
		    ptype = newGamePayEnv.getPayType();// 支付方式：1渠道SDK支付，2泡椒支付
			log.info("[order:" + JsonKit.toJson(params)
					+ "]==========>channelGameId=" + channelGame.getId()
					+ ",appVersion:" + appVersion + ",payType=" + ptype);


			// 根据切支付规则判断当前订单是否切支付
			boolean changePay = false;
			int userStatus = user.getStatus();// 0禁用，1普通用户，2白名单用户，3黑名单用户
			log.info("[order:" + JsonKit.toJson(params) + "]==========>user:"	+ JsonKit.toJson(user));
			if (ptype == 2) {// 如果游戏支付渠道为泡椒支付
				changePay = true;
			}

			// 白名单用户
			if (userStatus == 2) {
				log.info("uid:[" + user.getUserId() + "]is paojiao test user!");
				changePay = true;
			}
			// 黑名单用户全部不切支付
			if (userStatus == 3) {
				log.info("uid:[" + user.getUserId() + "]is blacklist!");
				changePay = false;
			}

			// 泡椒支付用户切支付
			if (userStatus == 4) {
				log.info("uid:[" + user.getUserId() + "]is paojiao user!");
				changePay = true;
			}

			params.put("appVersion", appVersion);
			if (!changePay) { //不切支付使用渠道支付
				params.put("description", sdkChannel.getSdkChannelName()+ "渠道支付");
				ptype = 1;//渠道支付
				payType = -1;//渠道sdk支付
			}else{
				ptype = 2;//泡椒支付
				payType =PayStyle.PAY_CENTER.id;//支付中心支付
			}

		order = generatePayOrder(sdkChannel,channelGame, game, params, money, user,ptype,payType);

		return order;
	}



	public PjThirdSdkOrder findOrderByOrderNo(String orderNo) {
		String sql = "select * from pj_third_sdk_order where orderNumber= ? limit 1";
		PjThirdSdkOrder order = PjThirdSdkOrder.dao.use(DS.sdkMaster).findFirst(sql,orderNo);
		if (order != null) {
			return order;
		}
		return null;
	}

	public void finishOrderAndCallbackCp(String out_trade_no, String trade_no,
			int pjsilvers, int tickets) {

		String sql = "select * from pj_third_sdk_order where orderNumber= ?";
		PjThirdSdkOrder order = PjThirdSdkOrder.dao.use(DS.sdkMaster).findFirst(sql,out_trade_no);

		if (order != null) {

			if (order.getStatus() != 0 && order.getStatus() != 10) {// 已完成支付
				log.error("+++++++++订单[" + order.getOrderNumber() + "]已完成,重复回调....");
				return;
			}

			order.setFinishedTime(new Date());

			// 更新用户渠道
			String cid = order.getCid();
			sql="select cid from stat_user_cid where uid= ? and gameId= ?";

			StatUserCid statUserCid = StatUserCid.dao.use(DS.sdkSlave).findFirst(sql,order.getUid(),order.getGameId());

			if (statUserCid != null) {
				cid = statUserCid.getCid();
			}

			if (StrKit.isBlank(cid)) {
				sql="select cid from stat_new_user where uid=? and gameId= ?";
				StatNewUser statNewUser = StatNewUser.dao.use(DS.sdkSlave).findFirst(sql,order.getUid(),order.getGameId());
				if (statNewUser != null) {
					cid = statNewUser.getCid();
				}

				if (StrKit.isBlank(cid)) {
					cid = "pj001";
				} else {
					StatUserCid uc = new StatUserCid();
					uc.setAddTime(new Date());
					uc.setCid(cid);
					uc.setGameId(order.getGameId());
					uc.setUid(order.getUid());
					uc.use(DS.sdkMaster).save();
				}
			}
			order.setCid(cid);
			if (trade_no != null){
				order.setSdkOrderNumber(trade_no);
			}
			order.setStatus(3);// 等待发货状态

			//发货成功。 需要生成虚拟币消费记录
			PjConsumeByVirtualCoin consume = new PjConsumeByVirtualCoin();
			consume.setAddTime(new Date());
			consume.setCid(cid);
			consume.setGameId(order.getGameId());
			consume.setOrderNo(order.getOrderNumber());
			consume.setPjsilvers(pjsilvers);
			consume.setTickets(tickets);
			consume.setUid(order.getUid());

			// 异步进程通知CP发货
			Timer timer = new Timer();
			timer.schedule(new NotifyTask(order,consume), 500l, 10000l);

		} else {
			log.error("orderNumber:[" + out_trade_no + "] not found!!!!!!!!");
		}

	}

	public void finishOrderAndCallbackCp(String out_trade_no, String trade_no) {
		finishOrderAndCallbackCp(out_trade_no, trade_no, 0, 0);
	}

	public void updateOrder(PjThirdSdkOrder order) {
		boolean ret = order.use(DS.sdkMaster).update();
		if (!ret) {
			log.error("订单更新失败！" + JsonKit.toJson(order));
		}
	}

}
