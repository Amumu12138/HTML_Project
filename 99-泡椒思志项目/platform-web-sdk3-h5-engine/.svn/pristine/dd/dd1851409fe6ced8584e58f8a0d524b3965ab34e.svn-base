package com.paojiao.sdk3.model.pojo;

import java.util.Date;
import java.util.Map;

import com.paojiao.sdk3.common.util.BeanToMapUtil;

/**
 * 登录用户实体，用于记录已经登录的用户信息
 * 
 * @author Van
 *
 */
public class PlayerEntity {
	protected Integer id;
	private String udid;// 用户的设备唯一识别码
	private String userName;
	private String niceName;
	private String password;
	private String salt;
	private String avatar;
	private String mobile;
	private String email;
	private Date updateTime;
	private Date createdTime;
	private int status;
	private int pjSilver;
	private Boolean autoLogin;
	private String bindType;
	private String bindId;
	private Integer refId;//绑定账号.值为uid

	public PlayerEntity() {
		super();
	}

	public PlayerEntity(Integer id, String userName, String niceName,
			String password, String mobile ,String salt) {
		super();
		this.id = id;
		this.salt = salt;
		this.userName = userName;
		this.niceName = niceName;
		this.password = password;
		this.mobile = mobile;
	}
	

	public PlayerEntity(Integer id, String udid, String userName,
			String niceName, String password, String salt, String mobile,
			Date createdTime, int status, int pjSilver, Boolean autoLogin) {
		super();
		this.id = id;
		this.udid = udid;
		this.userName = userName;
		this.niceName = niceName;
		this.password = password;
		this.salt = salt;
		this.mobile = mobile;
		this.createdTime = createdTime;
		this.status = status;
		this.pjSilver = pjSilver;
		this.autoLogin = autoLogin;
	}

	public Boolean getAbutoLogin() {
		return autoLogin;
	}

	public void setAutoLogin(Boolean autoLogin) {
		this.autoLogin = autoLogin;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getNickName() {
		return niceName;
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

	public String getSalt() {
		return salt;
	}

	public void setSalt(String salt) {
		this.salt = salt;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Date getCreatedTime() {
		return createdTime;
	}

	public void setCreatedTime(Date createdTime) {
		this.createdTime = createdTime;
	}

	public Date getUpdateTime() {
		return updateTime;
	}

	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}

	
	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	public int getPjSilver() {
		return pjSilver;
	}

	public void setPjSilver(int pjSilver) {
		this.pjSilver = pjSilver;
	}

	public Boolean getAutoLogin() {
		return autoLogin;
	}

	public String getBindType() {
		return bindType;
	}

	public void setBindType(String bindType) {
		this.bindType = bindType;
	}

	public String getBindId() {
		return bindId;
	}

	public void setBindId(String bindId) {
		this.bindId = bindId;
	}

	/**
	 * 将Map转换成登录实体；
	 * 
	 * @param map
	 * @return
	 */
	public Map<String, Object> loginEntity2Map() {
		try {
			return BeanToMapUtil.convertBean(this);
		} catch (Exception e) {
			return null;
		}

	}

	public Integer getRefId() {
		return refId;
	}

	public void setRefId(Integer refId) {
		this.refId = refId;
	}

	@Override
	public String toString() {
		return "PlayerEntity{" +
				"id=" + id +
				", udid='" + udid + '\'' +
				", userName='" + userName + '\'' +
				", niceName='" + niceName + '\'' +
				", password='" + password + '\'' +
				", salt='" + salt + '\'' +
				", avatar='" + avatar + '\'' +
				", mobile='" + mobile + '\'' +
				", email='" + email + '\'' +
				", updateTime=" + updateTime +
				", createdTime=" + createdTime +
				", status=" + status +
				", pjSilver=" + pjSilver +
				", autoLogin=" + autoLogin +
				", bindType='" + bindType + '\'' +
				", bindId='" + bindId + '\'' +
				", refId=" + refId +
				'}';
	}
}
