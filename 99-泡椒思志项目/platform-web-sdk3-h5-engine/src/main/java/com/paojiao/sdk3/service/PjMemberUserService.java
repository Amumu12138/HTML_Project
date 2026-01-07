package com.paojiao.sdk3.service;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.jfinal.aop.Inject;
import com.paojiao.sdk3.common.DS;
import com.paojiao.sdk3.common.mongo.manager.LoginSessionManager;
import com.paojiao.sdk3.common.util.TokenGenerator;
import com.paojiao.sdk3.model.PjThirdSdkChannelGame;
import com.paojiao.sdk3.model.pojo.LoginEntity;
import org.apache.commons.lang.RandomStringUtils;

import com.paojiao.sdk3.common.util.SignUtil;
import com.paojiao.sdk3.model.PjMemberBinding;
import com.paojiao.sdk3.model.PjMemberUser;

public class PjMemberUserService {

	@Inject
	private PjThirdSdkChannelGameService channelGameService;

	/**
	 * * 随机产生一个用户.T3开头的用户名表示第三方SDK用户 保存到平台新用户和游戏新用户表
	 */
	public PjMemberUser random(String udid) {
		udid=SignUtil.md5(udid);
		PjMemberUser user = new PjMemberUser();
		user.setUserName("H5T3_" + RandomStringUtils.randomNumeric(9));
		String salt = RandomStringUtils.randomAlphabetic(6);
		user.setSalt(salt);
		user.setCreatedTime(new Date());
		user.setStatus(1);
		user.setPjSilver(0);
		user.setUdid(udid);
		user.setPassword(SignUtil.md5(SignUtil.md5("r"
				+ RandomStringUtils.randomNumeric(6))
				+ salt));
		user.use(DS.ucMaster).save();
		return user;

	}

	public PjMemberUser findUser(Object idValue) {
		return PjMemberUser.dao.use(DS.ucSlave).findById(idValue);
	}


	public Map<String,String> findByBinding(Integer flag,String bindType, String bindId, String nickname, String headimgurl, String udid, String channel,int channelGameId) {
		String sql = "select *from pj_member_binding where bindType=? and bindId=? LIMIT 1";
		PjMemberBinding bind = PjMemberBinding.dao.use(DS.ucSlave).findFirst(sql,bindType,bindId);
        Map<String,String> retMap = null;
		String token ="";
		if(bind != null){

			sql = "select *from pj_member_user where id = ? LIMIT 1";
			PjMemberUser user = PjMemberUser.dao.use(DS.ucSlave).findFirst(sql,bind.getUserId());
			if(user != null){
				// 有绑定过，利用绑定的数据登录
				// 更新LoginSession
				LoginEntity session = LoginSessionManager.inst().findByUsername(user.getUserName());
				token = LoginSessionManager.inst().updateSession(session);
				retMap = new HashMap<String,String>();
				retMap.put("uid",user.getId()+"");
				retMap.put("token",token);
                return retMap;
			}
		}else{
			if (flag != 1){
				// 没有绑定，创建一个用户，并绑定当前QQ
				PjMemberUser bindUser = generateUserAndBind(bindType, bindId, nickname, headimgurl,udid,channel,channelGameId);
				token = LoginSessionManager.inst().addSession(user2LoginEntity(bindUser));
				retMap = new HashMap<String,String>();
				retMap.put("uid",bindUser.getId()+"");
				retMap.put("token",token);
				return retMap;
			}

		}

		return null;
	}


	private PjMemberUser generateUserAndBind(String bindType, String bindId,String nickname,String headimgurl,String udid,String channel,int channelGameId){

		//生成用户
        PjMemberUser user  = new PjMemberUser();
		String userName="J"+RandomStringUtils.randomNumeric(9);
		user.setNiceName(userName);
		user.setAvatar(headimgurl);
		user.setPlatform(5);
		user.setCreatedTime(new Date());
		user.setStatus(1);
		user.setPjSilver(0);
		user.setUdid(udid);
		user.setCid(channel);
		user.setUserName(userName);
		String salt = RandomStringUtils.randomAlphabetic(6);
		user.setSalt(salt);
		/** 密码加密*/
		String password = SignUtil.md5(SignUtil.md5("r"+ RandomStringUtils.randomNumeric(6))+ salt);
		user.setPassword(password);
		user.use(DS.ucMaster).save();

		//生成绑定
		PjMemberBinding bind = new PjMemberBinding();
		bind.setBindId(bindId);
		bind.setBindType(bindType);
		bind.setSdkUserName(user.getUserName());
		bind.setUserId(user.getId());
		bind.setAddTime(new Date());
        PjThirdSdkChannelGame channelGame = channelGameService.findGameById(channelGameId);
        if (channelGame != null) {
			bind.setSdkChannelId(channelGame.getSdkChannelId());
		}
		bind.use(DS.ucMaster).save();
		return user;

	}


	public LoginEntity user2LoginEntity(PjMemberUser user){
		LoginEntity session=new LoginEntity();
		session.setUid(user.getId());
		session.setUdid(user.getUdid());
		session.setUserName(user.getUserName());
		session.setNiceName(user.getNiceName());
		session.setActiveTime(new Date());
		session.setCreateTime(new Date());
		session.setAvatar(user.getAvatar());
		session.setMobile(user.getMobile());
		session.setToken(TokenGenerator.generateToken(user.getUserName()));
		session.setRefId((user.getRefId() == null) ? 0 :user.getRefId());
		return session;
	}

}
