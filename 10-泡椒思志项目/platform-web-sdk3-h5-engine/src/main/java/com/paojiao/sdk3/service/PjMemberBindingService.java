package com.paojiao.sdk3.service;

import java.util.Date;

import com.paojiao.sdk3.common.DS;

import com.paojiao.sdk3.common.mongo.manager.LoginSessionManager;
import com.paojiao.sdk3.common.util.SignUtil;
import com.paojiao.sdk3.common.util.TokenGenerator;
import com.paojiao.sdk3.controller.thirdsdk.SDKVerifyResult;
import com.paojiao.sdk3.model.PjMemberBinding;
import com.paojiao.sdk3.model.PjMemberUser;
import com.paojiao.sdk3.model.PjThirdSdkChannel;
import com.paojiao.sdk3.model.pojo.LoginEntity;

public class PjMemberBindingService {


	/**
	 * 根据用户ID绑定信息
	 *
	 * @param userID
	 * @return
	 */
	public PjMemberBinding getBindingUser(String userID) {
		String sql = "select * from pj_member_binding where userId=? limit 1 ";
		PjMemberBinding m = PjMemberBinding.dao.use(DS.ucSlave).findFirst(sql,userID);
		return m;
	}


	public PjMemberBinding getBindingUser(String userID,
										  PjThirdSdkChannel sdkChannel, String bindType) {
		// bindType='sdk3'表示第三方sdk用户,pjios表示IOS正版

		String sql = "select * from pj_member_binding where bindType=? and bindId=? and sdkChannelId=? limit 1 ";
		PjMemberBinding m = PjMemberBinding.dao.use("ucMaster").findFirst(sql,
				bindType, userID, sdkChannel.getId());
		return m;
	}

	/**
	 * 查询H5SDK用户角色
	 * @param userID
	 * @param sdkChannelId
	 * @return
	 */
	public PjMemberBinding getBindingUser(String userID,String sdkChannelId) {
		String sql = "select * from pj_member_binding where bindType='h5sdk3' and bindId=? and sdkChannelId=? limit 1 ";
		PjMemberBinding m = PjMemberBinding.dao.use("ucMaster").findFirst(sql,
				userID, sdkChannelId);
		return m;
	}


	public PjMemberBinding bindUser(PjMemberUser user, SDKVerifyResult sdkUser,
			PjThirdSdkChannel sdkChannel, int status, String sdkVersion,
			String bindType) {
		PjMemberBinding bindUser = new PjMemberBinding();
		try {
			bindUser.setBindType(bindType);
			bindUser.setBindId(sdkUser.getUserID());
			bindUser.setUserId(user.getId());
			bindUser.setStatus(status);
			bindUser.setAddTime(new Date());
			bindUser.setSdkUserName(sdkUser.getUserName());
			bindUser.setSdkChannelId(sdkChannel.getId());
			bindUser.setSdkVersion(sdkVersion);
			bindUser.setUdid(SignUtil.md5(user.getUdid()));
			bindUser.use(DS.ucMaster).save();
			return bindUser;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	/**
	 * 将第三方绑定用户实体转换为登录对象。 完成登录，并返回登录实体
	 *
	 * @return
	 */
	public LoginEntity updateLoginEntity(PjMemberBinding user, String appVersion) {
		LoginEntity session = new LoginEntity();
		session.setUid(user.getUserId());
		session.setUdid(user.getUdid());
		session.setActiveTime(new Date());
		session.setCreateTime(new Date());
		session.setToken(TokenGenerator.generateToken(user.getBindId()));
		session.setNiceName(user.getSdkUserName());
		session.setUserName(user.getSdkUserName());
		session.setSuid(user.getBindId());
		session.setAppVersion(appVersion);
		LoginSessionManager loginSessionManager = LoginSessionManager.inst();
		loginSessionManager.addSession(session);
		return session;
	}
}
