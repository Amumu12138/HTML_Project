package com.paojiao.sdk3.service;


import com.jfinal.kit.JsonKit;
import com.paojiao.sdk3.common.DS;
import com.paojiao.sdk3.model.StatActiveUser;
import org.apache.log4j.Logger;

public class StatActiveUserService {
	public static final Logger log = Logger
			.getLogger(StatActiveUserService.class);

	/**
	 * 保存用户活跃记录(游戏活跃用户是指非当日游戏注册用户的登录记录，每日只记录第一次登录记录)
	 *
	 * @param user
	 * @return
	 */
	public StatActiveUser save(StatActiveUser user) {

		String sql = "select * from stat_active_user where uid=? and gameId=? and date(createTime)=curdate() limit 1";
		StatActiveUser u = user.use(DS.sdkSlave).findFirst(sql, user.getUid(),user.getGameId());

		if(u !=null){
			log.info("用户活跃当天活跃记录已存在:"+JsonKit.toJson(user));
			return u;
		}else{
			try {
				user.use(DS.sdkMaster).save();
				log.info("保存用户活跃记录:"+JsonKit.toJson(user));
			} catch (Exception e) {
				log.error("保存用户活跃记录异常",e);
				log.error("save error:[" + JsonKit.toJson(user) + "]");
			}

		}
		return user;
	}

}
