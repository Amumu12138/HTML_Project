package com.paojiao.sdk3.controller.thirdsdk;

import com.alibaba.fastjson.JSONObject;

import java.util.HashMap;
import java.util.Map;

/**
 * SDK 验证结果
 */
public class SDKVerifyResult {

	private boolean success;

	private String userID;

	private String userName;

	private String nickName;

	private String extension;
	private String returnMsg;
	private Object result;

	private Integer realNameAuthStatus;//0:未实名认证 1:已经实名认证



	public Object getResult() {
		return result;
	}

	public void setResult(Object result) {
		this.result = result;
	}

	public String getReturnMsg() {
		return returnMsg;
	}

	public void setReturnMsg(String returnMsg) {
		this.returnMsg = returnMsg;
	}

	public SDKVerifyResult() {

	}

	public SDKVerifyResult(boolean suc, String userID, String userName,
			String nickName) {
		this.success = suc;
		this.userID = userID;
		this.userName = userName;
		this.nickName = nickName;
		this.extension = "";
	}



	public SDKVerifyResult(boolean suc, String userID, String userName,
			String nickName, String ext) {
		this.success = suc;
		this.userID = userID;
		this.userName = userName;
		this.nickName = nickName;
		this.extension = ext;
	}


	public SDKVerifyResult(boolean suc, String userID, String userName,
						   String nickName,Integer realNameAuthStatus) {
		this.success = suc;
		this.userID = userID;
		this.userName = userName;
		this.nickName = nickName;
		this.extension = "";
		this.realNameAuthStatus = realNameAuthStatus;
	}

	public SDKVerifyResult(boolean suc) {
		this.success = suc;
	}

	public boolean isSuccess() {
		return success;
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}

	public String getUserID() {
		return userID;
	}

	public void setUserID(String userID) {
		this.userID = userID;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getNickName() {
		return nickName;
	}

	public void setNickName(String nickName) {
		this.nickName = nickName;
	}

	public String getExtension() {
		return extension;
	}

	public void setExtension(String extension) {
		this.extension = extension;
	}

	public Integer getRealNameAuthStatus() {
		return realNameAuthStatus;
	}

	public void setRealNameAuthStatus(Integer realNameAuthStatus) {
		this.realNameAuthStatus = realNameAuthStatus;
	}
	public String resultJson(int result){
		Map<String,Integer> res = new HashMap<String,Integer>();
		res.put("result", result);
		return JSONObject.toJSONString(res);
	}
}
