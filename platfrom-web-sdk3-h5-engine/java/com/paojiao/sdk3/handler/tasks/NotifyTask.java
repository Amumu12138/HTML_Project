package com.paojiao.sdk3.handler.tasks;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.ProtocolException;
import java.net.URL;
import java.text.MessageFormat;
import java.util.HashMap;
import java.util.Map;
import java.util.TimerTask;

import com.jfinal.aop.Aop;
import com.paojiao.sdk3.common.DS;
import com.paojiao.sdk3.service.PjCpGameService;

import com.jfinal.kit.JsonKit;
import com.jfinal.kit.StrKit;
import com.paojiao.sdk3.common.util.SignUtil;
import com.paojiao.sdk3.handler.StatHandler;
import com.paojiao.sdk3.model.PjConsumeByVirtualCoin;
import com.paojiao.sdk3.model.PjCpGame;
import com.paojiao.sdk3.model.PjThirdSdkOrder;
import com.paojiao.sdk3.service.PjThirdSdkChannelService;
import com.paojiao.sdk3.service.PjThirdSdkOrderService;
import org.apache.log4j.Logger;

/**
 * 付款成功通知，支付成功时，会调用此任务通知到CP商为用户发货；
 *
 * @author van
 * @version 1.0
 */
public class NotifyTask extends TimerTask {

	private PjThirdSdkOrder order;
	private PjConsumeByVirtualCoin consume;
	private PjCpGame game;
	private int sendCount = 0;
	private static Logger log = Logger.getLogger(NotifyTask.class);

	private PjThirdSdkOrderService orderService = Aop.get(PjThirdSdkOrderService.class);
	private  PjCpGameService gameService = Aop.get(PjCpGameService.class);
	private StatHandler statHandler = Aop.get(StatHandler.class);



	/**
	 * 新版本通知构造
	 *
	 * @param order
	 */
	public NotifyTask(PjThirdSdkOrder order,PjConsumeByVirtualCoin consume) {
		super();
		this.order = order;
		this.game = gameService.findGameById(order.getGameId());
		this.consume = consume;
		// log.info("NotifyTask[" + JsonKit.toJson(game) + "]");
		if (game == null) {
			log.error("Game not found,gameId=" + order.getGameId());
		}
	}

	/**
	 * 新版本的通知发送，简化接入流程
	 */
	private String runTask() {
		log.info("TimerTask runTask:starting!!!!!!!!");
		// 组装通知信息
		Map<String, String> notifyMap = payNotify();
		String params;
		try {
			params = mapToUrlNotEncode(notifyMap);
			return postReturnString(params);
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		return null;
	}

	@SuppressWarnings("static-access")
	private Map<String, String> payNotify() {
		// 组装通知信息
		Map<String, String> notifyMap = new HashMap<String, String>();
		notifyMap.put("uid", order.getUid() + "");
		notifyMap.put("orderNo", order.getOrderNumber());
		notifyMap.put("price", order.getMoney() + "");
		notifyMap.put("roleId", order.getRoleId());
		notifyMap.put("gameId", order.getGameId() + "");
		notifyMap.put("serverId", order.getServerId());
		notifyMap.put("finishedTime", order.getFinishedTime().getTime() + "");
		notifyMap.put("cpOrderNo", order.getCpOrderNumber());
		notifyMap.put("ext", order.getExt());

		// 进行签名
		SignUtil su = new SignUtil();
		String sign = su.generateSign(notifyMap, game.getServerSecret());// 使用服务器端
		log.info("preSign:[" + su.md5before + "],key:["
				+ game.getServerSecret() + "],sign:" + sign);
		// 把签名加入参数，带给合作方
		notifyMap.put("sign", sign);


		return notifyMap;
	}



	/**
	 * 将Map中的数据组装成url
	 *
	 * @param params
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	public String mapToUrlNotEncode(Map<String, String> params)
			throws UnsupportedEncodingException {
		StringBuilder sb = new StringBuilder();
		boolean isFirst = true;
		for (String key : params.keySet()) {
			String value = params.get(key);
			if (isFirst) {
				sb.append(key + "=" + value);
				isFirst = false;
			} else {
				if (value != null) {
					sb.append("&" + key + "=" + value);
				} else {
					sb.append("&" + key + "=");
				}
			}
		}
		return sb.toString();
	}

	/**
	 * POST数据并返回结果
	 *
	 * @param params
	 * @return
	 */
	private String postReturnString(String params) {

		HttpURLConnection conn = null;

		try {
			if (StrKit.isBlank(game.getNotifyUrl())) {
				log.error("Cp NotifyUrl is blank,gameId[" + game.getId() + "]");
				if(game.getId() == 10){
				  return "success";
				}else{
				  return "error";
				}
			}

			String invokeUrl = game.getNotifyUrl() + "?";
			URL serverUrl = new URL(invokeUrl);
			conn = (HttpURLConnection) serverUrl.openConnection();
			conn.setRequestMethod("POST");
			conn.setDoOutput(true);
			conn.connect();
			conn.getOutputStream().write(params.getBytes("utf-8"));
			log.info("++++++++++++++通知参数：" + params);
			log.info("++++++++++++++完整的URL：" + conn.getURL().toString()
					+ params);
			InputStream is = conn.getInputStream();
			BufferedReader in = new BufferedReader(new InputStreamReader(is));
			StringBuffer buffer = new StringBuffer();
			String line = "";
			while ((line = in.readLine()) != null) {
				buffer.append(line);
			}
			return buffer.toString();
		} catch (ProtocolException e1) {
			e1.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if (conn != null) {
				conn.disconnect();
			}

		}

		return null;
	}

	@Override
	public void run() {
		if (sendCount >= 10) {
			log.info(
					"++++++通知10次仍然未收到响应：orderNumber:"+order.getOrderNumber()+",cpOrderNo:"+order.getCpOrderNumber());
			order.setStatus(2);
			orderService.updateOrder(order);
			this.cancel();
		}
		sendCount += 1;
		log.info("--------------game:[" + JsonKit.toJson(game) + "]");
		log.info("++++++++++++++order["+order.getOrderNumber()+"][第" + sendCount + "次]发送通知到游戏合作方："
				+ game.getNotifyUrl());
		String responseData = null;
		responseData = runTask();
		log.info("++++++++++++++order["+order.getOrderNumber()+"][第" + sendCount + "次]合作方返回数据：" + responseData);

		/** 回写成功时，继续完成订单 */
		if ("success".equalsIgnoreCase(responseData)) {
			order.setStatus(1);
			orderService.updateOrder(order);

			//发货成功。 生成虚拟币消费记录      （虚拟币消费不计算用户积分）
			if (consume.getPjsilvers() > 0 || consume.getTickets() > 0) {
			        log.info("==========>>生成虚拟币消费记录"+JsonKit.toJson(consume));
			        try{
				consume.use(DS.sdkMaster).save();
			        }catch(Exception ex){
					log.error("生成虚拟币消费记录异常",ex);
				}
			}else{

			    //是泡椒sdk
			    try{
			   // PjThirdSdkChannel sdkChannel =  CacheUtil.getSdkChannel(order.getSdkChannelId());
			   // if(sdkChannel.getItfImplClass().equalsIgnoreCase(PjConstants.PJSDK_ITF_IMPL_CLASS)){
				log.info("==========>>统计用户vip积分"+JsonKit.toJson(order));
				statHandler.saveUserPoint(order.getUid(), order.getMoney(), 2);
			    //}
			    }catch(Exception ex){
				log.error("统计用户vip积分异常",ex);
			    }

			}


			this.cancel();
		}
	}

}
