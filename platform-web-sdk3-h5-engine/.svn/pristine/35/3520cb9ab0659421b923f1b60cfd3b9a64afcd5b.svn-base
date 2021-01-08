package com.paojiao.sdk3.service;


import com.jfinal.kit.JsonKit;
import com.paojiao.sdk3.common.DS;
import com.paojiao.sdk3.model.StatActiveClient;
import org.apache.log4j.Logger;

public class StatActiveClientService {
	public static final Logger log = Logger
			.getLogger(StatActiveClientService.class);

	/**
	 * 保存用户活跃记录(游戏活跃用户是指非当日游戏注册用户的登录记录，每日只记录第一次登录记录)
	 *
	 * @param user
	 * @return
	 */
	public StatActiveClient save(StatActiveClient user) {
		StatActiveClient statActiveClient = null;
		try{

        String  sql = "select * from stat_active_client where imei=? and gameId=? and date(createDate)=curdate() limit 1";

		String imei = user.getImei();

		 statActiveClient = user.use(DS.sdkSlave).findFirst(sql,imei,user.getGameId());

		if(statActiveClient == null){
		    try{
			user.use(DS.sdkMaster).save();
		    }catch(Exception ex){
		    }
			log.info("==========>>保存活跃设备："+JsonKit.toJson(user));
		}else{
			user = statActiveClient;
		}


	   }catch(Exception ex){
		   log.error("保存活跃设备异常["+JsonKit.toJson(user)+"]", ex);
		}

		return user;

	}

}
