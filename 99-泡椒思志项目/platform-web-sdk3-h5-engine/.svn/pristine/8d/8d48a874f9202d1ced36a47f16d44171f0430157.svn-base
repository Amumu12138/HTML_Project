package com.paojiao.sdk3.model.pojo;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.jfinal.kit.JsonKit;
import com.jfinal.kit.StrKit;

/**
 * 登录用户实体，用于记录已经登录的用户信息
 *
 * @author Van
 *
 */
public class LoginEntity extends BaseEntity {

	private static final long serialVersionUID = 1L;
	private String token;
	private int uid;// 泡椒网用户id
	private String udid;// 用户的设备唯一识别码
	private String userName;
	private String niceName;
	private String avatar;
	private String mobile;
	private Date activeTime;
	private Date createTime;
	private Date regTime;
	private String password;
	private int refId;
	private String suid;//sdk方返回的用户id
	private String appVersion;

	private Integer openRealNameAuth;//是否打开实名认证界面
	private Integer realNameAuthStatus;

	public String getAppVersion() {
		return appVersion;
	}

	public void setAppVersion(String appVersion) {
		this.appVersion = appVersion;
	}

	public String getSuid() {
		return suid;
	}

	public void setSuid(String suid) {
		this.suid = suid;
	}

	public String getNickName() {
		return niceName;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getNiceName() {
		return niceName;
	}

	public void setNiceName(String niceName) {
		this.niceName = niceName;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public Date getActiveTime() {
		return activeTime;
	}

	public void setActiveTime(Date activeTime) {
		this.activeTime = activeTime;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	public String getAvatar() {
		return avatar;
	}

	public void setAvatar(String avatar) {
		this.avatar = avatar;
	}

	public String getUdid() {
		return udid;
	}

	public void setUdid(String udid) {
		this.udid = udid;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public int getRefId() {
		return refId;
	}

	public void setRefId(int refId) {
		this.refId = refId;
	}


	public int getUid() {
		return uid;
	}

	public void setUid(int uid) {
		this.uid = uid;
	}


	public Date getRegTime() {
		return regTime;
	}

	public void setRegTime(Date regTime) {
		this.regTime = regTime;
	}

	/**
	 * 判断是否为空
	 *
	 * @return
	 */
	public boolean isEmpty() {
		return StrKit.isBlank(token) || StrKit.isBlank(userName);
	}

	@Override
	public String toString() {
		return JsonKit.toJson(this);
	}

	public Integer getOpenRealNameAuth() {
		return openRealNameAuth;
	}

	public void setOpenRealNameAuth(Integer openRealNameAuth) {
		this.openRealNameAuth = openRealNameAuth;
	}

	public Integer getRealNameAuthStatus() {
		return realNameAuthStatus;
	}

	public void setRealNameAuthStatus(Integer realNameAuthStatus) {
		this.realNameAuthStatus = realNameAuthStatus;
	}
}
