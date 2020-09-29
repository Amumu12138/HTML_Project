package com.paojiao.sdk3.handler;

import java.util.Date;
import java.util.List;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;


import com.alibaba.fastjson.JSON;
import com.jfinal.aop.Aop;
import com.paojiao.sdk3.common.util.DateUtil;
import com.paojiao.sdk3.model.PjMemberUser;
import com.paojiao.sdk3.model.PjUserVip;
import com.paojiao.sdk3.model.PjUserVipConfig;
import com.paojiao.sdk3.model.PjUserVipGrowthRecord;
import com.paojiao.sdk3.model.StatActiveClient;
import com.paojiao.sdk3.model.StatActiveUser;
import com.paojiao.sdk3.model.StatNewClient;
import com.paojiao.sdk3.model.StatNewUser;
import com.paojiao.sdk3.service.*;
import org.apache.log4j.Logger;

public class StatHandler {

	private StatNewUserService statNewUserService = Aop.get(StatNewUserService.class);
	private StatActiveUserService statActiveUserService = Aop.get(StatActiveUserService.class);
	private StatNewClientService statNewClientService = Aop.get(StatNewClientService.class);
	private StatActiveClientService statActiveClientService = Aop.get(StatActiveClientService.class);
	private PjMemberUserService userService = Aop.get(PjMemberUserService.class);
	private UserVipService userVipService = Aop.get(UserVipService.class);


	public static final Logger log = Logger.getLogger(StatHandler.class);


	/**
	 * 统计新增/活跃用户线程池
	 */
	private static ThreadPoolExecutor statUserPool = new ThreadPoolExecutor(2,
			10, 10 * 60, TimeUnit.SECONDS, new LinkedBlockingQueue<Runnable>());

	/**
	 * 统计新增/活跃设备线程池
	 */
	private static ThreadPoolExecutor statClientPool = new ThreadPoolExecutor(2,
			10, 10 * 60, TimeUnit.SECONDS, new LinkedBlockingQueue<Runnable>());


	/**
	 * 统计用户积分
	 */
	private static ThreadPoolExecutor statUserPointPool = new ThreadPoolExecutor(2,
			10, 10 * 60, TimeUnit.SECONDS, new LinkedBlockingQueue<Runnable>());


	/**
	 * 统计线程，用于异步提交新增/活跃用户统计数据；
	 *
	 */
	private class StatUserTask implements Runnable {
		private StatNewUser user;

		public StatUserTask(StatNewUser user) {
			log.info("==========>>统计新增/活跃用户："+JSON.toJSONString(user));
			this.user = user;
		}

		public void run() {
			StatNewUser gnUser = statNewUserService.findStatNewUser(user);

			if (gnUser == null) {
			    try{
				statNewUserService.save(user);
				log.info("==========>>保存新用户："+JSON.toJSONString(user));
				}catch(Exception ex){
				    log.error("保存新增用户异常", ex);
				}
			} else {
			    // 已经是游戏用户，如果注册时间不在当天，则记录活跃
			    if (DateUtil.beforeToday(gnUser.getCreateDate())) {
				log.info("======["+user.getUid()+"]==["+user.getImei()+"]==>>活跃用户："+user.getImei());
				StatActiveUser auser = new StatActiveUser();
				auser.setCreateDate(new Date());
				auser.setCreateTime(new Date());
				auser.setGameId(user.getGameId());
				auser.setImei(user.getImei());
				auser.setModel(user.getModel());
				auser.setUdid(user.getUdid());
				auser.setUid(user.getUid().intValue());
				auser.setCid(user.getCid());
				statActiveUserService.save(auser);
			    }
			}
			}
		}

	public void saveUserStat(StatNewUser user) {
	    statUserPool.execute(new StatUserTask(user));
	}





	/**
	 * 统计线程，用于异步提交新增/活跃设备统计数据；
	 *
	 */
	private class StatClientTask implements Runnable {
		private StatNewClient client;

		public StatClientTask(StatNewClient client) {
			log.info("==========>>统计新增/活跃设备："+JSON.toJSONString(client));
			this.client = client;
		}

		public void run() {
		        StatNewClient newclient = statNewClientService.findStatNewClient(client);

			if (newclient == null) {
			    try{
				statNewClientService.save(client);
				log.info("==========>>保存新设备："+JSON.toJSONString(client));
				}catch(Exception ex){
				    log.error("保存新增设备异常", ex);
				}
			} else {
			    //  设备已记录，如果注册时间不在当天，则记录活跃设备
			    if (DateUtil.beforeToday(newclient.getCreateDate())) {
				StatActiveClient activeClient = new StatActiveClient();
				activeClient.setCreateDate(new Date());
				activeClient.setCreateTime(new Date());
				activeClient.setGameId(client.getGameId());
				activeClient.setImei(client.getImei());
				activeClient.setModel(client.getModel());
				activeClient.setCid(client.getCid());
				activeClient.setMac(client.getMac());
				statActiveClientService.save(activeClient);
			    }
			}
			}
		}


	public void saveClientStat(StatNewClient client) {
	    statClientPool.execute(new StatClientTask(client));
	}



	/**
	 * 保存用户积分线程
	 * @author van
	 *
	 */
	public void saveUserPoint(int uid,float money,int type) {
	    statUserPointPool.execute(new PointHandler(uid,money,type));
	}

	private class PointHandler implements Runnable{
		private int uid ;
		private float money;
		private int type;
		public PointHandler(int uid,float money,int type){
			this.uid = uid;
			this.money = money;
			this.type = type;
		}

		public void run() {
			try{
				//增加一笔充值记录,转换成相应的积分
				//查询用户vip等级
				PjUserVip userVip = userVipService.findUserVip(uid);
				log.info("userVip ===> "+ userVip);
				int vipLvl = 0;
				if(userVip != null ){
				    vipLvl = userVip.getVipLvl();
				}else{
				    vipLvl =0;//默认vip等级
				}

				PjUserVipConfig cfg = userVipService.findUserVipConfig(vipLvl);
				if(cfg != null){
					float pointRate = cfg.getPointRate();//积分比率
					PjUserVipGrowthRecord vipGrowth = new PjUserVipGrowthRecord();
					vipGrowth.setUid(uid);
					vipGrowth.setType(type);
					vipGrowth.setVipFraction(money);
					vipGrowth.setPoints(money * pointRate);
					//转换成积分,保存交易记录
					takeRecord(vipGrowth);
				}

				if(userVip != null){
					//更新积分
					userVip.setPayMoney(money);
					userVip.setUid(uid);
					int v = (int) (money * cfg.getPointRate());
					userVip.setPoints(v);
					//设置vip等级
					int upgrade = upgrade(userVip.getVipFraction() + money);
					userVip.setVipLvl(upgrade);
					userVip.setVipFraction( money);
					userVipService.updateUserVip(userVip);
					log.info("开始更新用户积分=>"+userVip);
				}else {
					//新增积分
					PjUserVip u = new PjUserVip();
					u.setPayMoney(money);
					u.setUid(uid);
					PjMemberUser user = userService.findUser(uid);
					u.setUserName(user.getUserName());
					int v = (int) (money * cfg.getPointRate());
					u.setPoints(v);
					u.setVipFraction(money);
					//设置vip等级
					int upgrade = upgrade(money);
					u.setVipLvl(upgrade);
					userVipService.insertUserVip(u);
					log.info("开始插入用户积分=>"+u);
				}
			}catch (Exception e){
			    log.error("统计用户vip积分异常",e);
			}


		}

		//vip升级
		private int upgrade(double v){
			List<PjUserVipConfig> list = userVipService.findUserVipConfigs();
			for(int i = list.size()-1; i > 0 ; i--){
				 if(list.get(i-1).getVipFraction() == v){
					 return  i - 1;
				 }
				 if(list.get(i-1).getVipFraction() < v && v < list.get(i).getVipFraction()){
					 return list.get(i).getVipLvl();
				 }
			}
			return  0;
		}


		private void takeRecord(PjUserVipGrowthRecord vipGrowth){
			log.info("开始将一笔交易转变成积分记录进行保存=>"+vipGrowth);
			userVipService.insertUserGrowth(vipGrowth);
		}


	}






}
