package com.paojiao.sdk3.service;

import com.paojiao.sdk3.common.DS;
import com.paojiao.sdk3.common.PjConstants;
import com.paojiao.sdk3.model.StatNewUser;
import org.apache.log4j.Logger;

public class StatNewUserService {

	public static final Logger log = Logger.getLogger(StatNewUserService.class);



	public StatNewUser findStatNewUser(StatNewUser user) {
		String sql ="select * from stat_new_user where uid= ? and gameId=?   limit 1";
		StatNewUser newuser = user.use(DS.sdkMaster).findFirst(sql, user.getUid(),user.getGameId());
		return newuser;
	}

	public StatNewUser findStatNewUser(int uid,int gameId) {
		String sql ="select * from stat_new_user where uid= ? and  gameId=?  limit 1";
		StatNewUser newuser = StatNewUser.dao.use(DS.sdkMaster).findFirst(sql, uid,gameId);
		return newuser;
	}


	public StatNewUser findStatNewUserByUid(Integer uid) {
		String sql ="select * from stat_new_user where uid= ? limit 1";
		StatNewUser newuser = StatNewUser.dao.use(DS.sdkMaster).findFirst(sql, uid);
		return newuser;
	}

	public StatNewUser save(StatNewUser user) {
		return user.use(DS.sdkMaster).save() == true ? user : null;

	}


}



