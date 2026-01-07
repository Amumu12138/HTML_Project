package com.infox.h5.service.impl;

import java.util.Date;
import java.util.Map;

import com.infox.h5.core.SdkApiAbstract;
import com.infox.h5.core.ServiceConfig;
import com.infox.h5.mapper.ApiMapper;
import com.infox.h5.service.ApiService;
import com.infox.h5.utils.HttpclientUtils;
import com.jfinal.plugin.activerecord.Record;
import org.apache.commons.lang.time.DateUtils;
import org.apache.log4j.Logger;

public class ApiServiceImpl implements ApiService{
	public static final Logger log = Logger.getLogger(ApiServiceImpl.class);
	private static ApiMapper apiMapper = new ApiMapper();

	@Override
	public Record findGameByGameId(Object gameId) {
		return apiMapper.findGameByGameId(gameId);
	}

	@Override
	public String login(Map<String, Object> params) {
		String send = HttpclientUtils.getInstance().HttpGet(ServiceConfig.uchost +"user/login.do", params, null, null);
		return send;
	}

	@Override
	public String getToken(Map<String, Object> params) {
		String send = null;
		String url = "";
		if(params.get("isTest") == null || !params.get("isTest").toString().equals("true")) {
			url = ServiceConfig.sdkhost;
		}else{
			url = ServiceConfig.cssdkhost;
		}
		log.info("请求路径为："+url+"api/getToken.html");
		send = HttpclientUtils.getInstance().HttpPost(url +"api/getToken.html", params, null, null);
		return send;
	}

	@Override
	public String verificationToken(String token) {
		Record record = apiMapper.findSdkTokenBycpToken(token);
		if(record == null) {//初始化
			Record record1 = new Record();
			record1.set("sdk_token", token);
			apiMapper.insertH5Token(record1);
			return token;
		}else {
			return record.getStr("sdk_token");
		}
		
	}

	@Override
	public void insertH5Token(String token, String cp_token) {
		apiMapper.insertH5Token(token,cp_token);
	}


	@Override
	public Record findSdkUserByPaojiaoId(String userID) {
		return apiMapper.findSdkUserByPaojiaoId(userID);
	}

	@Override
	public Record getIosGameInfo(Map<String, Object> params) {
		return apiMapper.getIosGameInfo(params);
	}

	@Override
	public Record findEdition(Object gameId,Object edition) {
		Record iosEdition = apiMapper.findEdition(gameId,edition);
		return iosEdition;
	}

	@Override
	public boolean isIosGame(Record game) {
		Integer[] array = new Integer[] {10876755,10876696,10876677,10876676};
		boolean b = false;
		for (Integer i : array) {
			if(i.equals(game.getInt("gameId"))) {
				b = true;
				break;
			}
		}
		if(game.getStr("gameName").contains("IOS") && !b) {
			return true;
		}
		return false;
	}

	@Override
	public String iosToken(Map<String, Object> params) {
		String send = HttpclientUtils.getInstance().HttpGet(ServiceConfig.uchost +"user/token.html", params, null, null);
		return send;
	}

	@Override
	public String findProductIdByParams(Map<String, Object> params) {
		return apiMapper.findProductIdByParams(params);
	}

	@Override
	public String getOrder(Map<String, Object> params) {
		return  HttpclientUtils.getInstance().HttpPost(ServiceConfig.uchost +"uc/pay/getUcIOSOrder.do", params, null, null);
	}

	@Override
	public void saveStatNewClient(Map<String,Object> paramMap) {
		log.info("-------------ip为："+paramMap.get("ip").toString());
		String isIp= paramMap.get("ip").toString().substring(0,2);
		//不为美国IP不加入记录中
		if (isIp.equals("17")){
			paramMap.put("createDate",new Date());
			paramMap.put("createTime",new Date());
			paramMap.put("lastLoginTime",new Date());
			Record record = new Record();
			record.setColumns(paramMap);
			apiMapper.insertDevice(record);
		}
	}

}
