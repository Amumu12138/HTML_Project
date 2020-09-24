package com.infox.h5.mapper;

import java.util.Map;

import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Record;

public class ApiMapper {

	public Record findGameByGameId(Object gameId) {
		String sql = "select appID as gameId,appkey as appKey,name as gameName, payCallbackDebug as mainUrl ,payTXCallback as shUrl, IFNULL(userId,1) as userId  from pj_third_game where appID = ?";
		return Db.use("sdk").findFirst(sql,gameId);
	}

	public Record findSdkTokenBycpToken(String token) {
		String sql ="SELECT * FROM infox_h5_token WHERE cp_token = ? ";
		return Db.use("sdk").findFirst(sql,token);
	}


	public void insertH5Token(Record record) {
		Db.use("sdk").save("infox_h5_token", record);	
	}

	public void updateCpToken(String token, String cp_token) {
		String sql = "UPDATE infox_h5_token SET cp_token = ? WHERE sdk_token = ?";
		 Db.use("sdk").update(sql,cp_token,token);
	}

	public Record findSdkUserByPaojiaoId(String userID) {
		String sql = "SELECT * FROM pj_third_sdk_user WHERE paojiaoId = ? ORDER BY id LIMIT 1";
		return Db.use("sdk").findFirst(sql,userID);
	}

	public void insertH5Token(String token, String cp_token) {
		String sql = "INSERT INTO infox_h5_token (sdk_token,cp_token) VALUES (?,?) ON DUPLICATE KEY UPDATE sdk_token = ? , cp_token = ?";
		Db.use("sdk").update(sql,token,cp_token,token,cp_token);
	}

	public Record getIosGameInfo(Map<String, Object> params) {
		String sql = "SELECT * FROM infox_h5_game WHERE gameId = ?";
		return Db.use("sdk").findFirst(sql,params.get("gameId"));
	}

	public Record findEdition(Object gameId, Object edition) {
		String sql = "SELECT * FROM pj_third_sdk.`infox_h5_ios_edition` WHERE gameId = ? AND edition = ?";
		return Db.use("sdk").findFirst(sql,gameId,edition);
	}

	public String findProductIdByParams(Map<String, Object> params) {
		String sql = "SELECT projectId FROM pj_third_sdk.`infox_h5_ios_project` WHERE gameId = ? AND money = ? ";
		try {
			return Db.use("sdk").findFirst(sql,params.get("gameId"),params.get("money")).getStr("projectId");
		}catch(NullPointerException e) {
			return "";
		}
		
	}
	public void insertDevice(Record record){
		Db.use("uc_center").save("stat_new_client", record);
	}
	
	
}
