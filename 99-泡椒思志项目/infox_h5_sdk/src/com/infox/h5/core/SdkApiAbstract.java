package com.infox.h5.core;

import java.util.Map;
import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.infox.h5.service.ApiService;
import com.infox.h5.service.impl.ApiServiceImpl;
import com.infox.h5.utils.EncryptUtils;
import com.infox.h5.utils.HttpclientUtils;
import com.infox.h5.utils.ResultMsg;
import com.infox.h5.utils.SignUtil;
import com.jfinal.plugin.activerecord.Record;

public abstract class SdkApiAbstract implements SdkApi{
	public static final Logger log = Logger.getLogger(SdkApiAbstract.class);
	public ApiService apiService = new ApiServiceImpl();
	
	/**
	 * 发送短信到手机
	 */
	@Override
	public String sendUserInfo(Map<String, Object> params) {
		try {
			String send = HttpclientUtils.getInstance().HttpGet(ServiceConfig.uchost +"sms/sendUserInfo.do", params, null, null);
			return send;
		}catch(Exception e) {
			e.printStackTrace();
			return ResultMsg.fail("短信发送失败");
			
		}
	}
	/**
	 * 获取游戏信息
	 */
	@Override
	public String getGameInfo(Map<String, Object> params){
		
		log.info("游戏信息初始化:"+params);
		try {
			params.remove("sign");//删除sign;
			String signStr=SignUtil.getSignStr(params);//排序
			Record game = apiService.findGameByGameId(params.get("gameId"));
			String sign = EncryptUtils.md5(signStr+game.getStr("appKey"));//验签
			params.put("sign", sign);
			String send = HttpclientUtils.getInstance().HttpGet(ServiceConfig.uchost + "//sdk/gameUpdate.do", params, null, null); //发送
			log.info("游戏信息初始化 send:"+send);
			JsonParser json = new JsonParser();
			JsonObject data = json.parse(send).getAsJsonObject();
			String code = data.get("code").getAsString();
			if(code.equals("1")) {//初始化游戏成功
				if(params.get("edition") != null && StringUtils.isNotBlank(params.get("edition").toString())){//IOS提审服地址
					Record iosEdition = apiService.findEdition(game.get("gameId"),params.get("edition"));
					if(iosEdition != null && iosEdition.getInt("state") == 0) {
						
						if(iosEdition.getInt("shield") == 1) {//全民主公CP屏蔽
							game.set("mainUrl", game.getStr("shUrl")+iosEdition.getInt("id"));
						}else {
							game.set("mainUrl", game.getStr("shUrl"));
						}
						game.set("cs", 0);
					}else {
						game.set("cs", 1);
					}
				}else {
					game.set("cs", 1);
				}
				
				return ResultMsg.success(game.getColumns());
			}else {
				return send;
			}
		}catch(Exception e) {
			e.printStackTrace();
			return ResultMsg.fail("游戏信息初始化失败");
		}
	}
		
	/**
	 * 初始化悬浮窗
	 */
	@Override
	public String openGame(Map<String, Object> params) {
		try {
			String send = HttpclientUtils.getInstance().HttpGet(ServiceConfig.uchost +"sdk/openFloat.do", params, null, null);
			return send;
		}catch(Exception e) {
			e.printStackTrace();
			return ResultMsg.fail("悬浮窗初始化失败");
		}
	}
	
	/**
	 * 一键注册
	 */
	@Override
	public String random(Map<String, Object> params) {
		try {
			String send = HttpclientUtils.getInstance().HttpGet(ServiceConfig.uchost +"user/random.do", params, null, null);
			log.info("一键注册返回======》" + send);
			return send;
		}catch(Exception e) {
			e.printStackTrace();
			return ResultMsg.fail("一键注册失败");
		}
	}
	
	/**
	 * 账号密码注册
	 */
	@Override
	public String reg(Map<String, Object> params) {
		try {
			String send = HttpclientUtils.getInstance().HttpGet(ServiceConfig.uchost +"user/reg.do", params, null, null);
			return send;
		}catch(Exception e) {
			e.printStackTrace();
			return ResultMsg.fail("账号密码注册失败");
		}
	}

}
