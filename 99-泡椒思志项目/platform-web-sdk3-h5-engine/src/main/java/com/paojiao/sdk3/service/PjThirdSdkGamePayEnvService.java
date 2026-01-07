package com.paojiao.sdk3.service;


import com.jfinal.kit.JsonKit;
import com.jfinal.kit.StrKit;
import com.paojiao.sdk3.common.DS;
import com.paojiao.sdk3.model.PjThirdSdkGamePayEnv;
import org.apache.log4j.Logger;

public class PjThirdSdkGamePayEnvService {

    public static final Logger log = Logger.getLogger(PjThirdSdkGamePayEnvService.class);

	public  PjThirdSdkGamePayEnv createGamePayEnv(PjThirdSdkGamePayEnv gamePayEnv){

		String version =  gamePayEnv.getVersion();
		Integer  sdkChannelGameId = gamePayEnv.getSdkChannelGameId();

		PjThirdSdkGamePayEnv env = getSdkGamePayEnv(sdkChannelGameId,version);

		if (env == null) {
			gamePayEnv.use("sdkMaster").save();
			log.info("=========>>当前游戏支付环境不存在，自动生成==>>"+JsonKit.toJson(gamePayEnv));
			return gamePayEnv;
		}else{
			log.info("=========>>当前游戏支付环境已存在，返回==>>"+JsonKit.toJson(env));
			return env;
		}
	}



	public  PjThirdSdkGamePayEnv getSdkGamePayEnv(int channelGameId,String appVersion){
		if(StrKit.isBlank(appVersion)){
			return null;
		}
		String sql = "select *  from pj_third_sdk_game_pay_env where sdkChannelGameid=? and version =? limit 1";
		return PjThirdSdkGamePayEnv.dao.use("sdkMaster").findFirst(sql,channelGameId,appVersion);
	}

}
