package com.paojiao.sdk3.service;


import com.jfinal.kit.JsonKit;
import com.paojiao.sdk3.common.DS;
import com.paojiao.sdk3.model.PjThirdSdkChannelGame;
import com.paojiao.sdk3.model.StatActiveUser;
import com.paojiao.sdk3.model.StatGameRole;
import com.paojiao.sdk3.model.base.BaseStatGameRole;
import org.apache.log4j.Logger;

public class StatGameRoleService {
	public static final Logger log = Logger .getLogger(StatGameRoleService.class);

	/**
	 * 根据游戏ID和用户ID查询出角色信息
	 * @param
	 * @return
	 */
	public BaseStatGameRole getStatGmaeRoleInfo(String gameId,String userId) {
		String sql = "SELECT * FROM stat_game_role WHERE gameId = ? and uid = ? ORDER BY id desc LIMIT 1 ;";
		return StatGameRole.dao.use(DS.sdkMaster).findFirst(sql,gameId,userId);
	}

}
