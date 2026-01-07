package com.infox.h5.service;

import java.util.Map;

import com.jfinal.plugin.activerecord.Record;

public interface ApiService {

	Record findGameByGameId(Object object);

	String login(Map<String, Object> params);

	String getToken(Map<String, Object> params);

	String verificationToken(String token);

	Record findSdkUserByPaojiaoId(String userID);

	void insertH5Token(String token, String cp_token);

	Record getIosGameInfo(Map<String, Object> params);

	Record findEdition(Object gameId, Object edition);

	boolean isIosGame(Record game);

	String iosToken(Map<String, Object> params);

	String findProductIdByParams(Map<String, Object> params);

	String getOrder(Map<String, Object> params);

	//新增设备号
	void saveStatNewClient(Map<String,Object> paramMap);
}
