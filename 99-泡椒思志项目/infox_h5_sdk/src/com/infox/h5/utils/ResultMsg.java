package com.infox.h5.utils;

public class ResultMsg {
	private int code;
	private String msg;
	private Object data;
	
	private ResultMsg() {};
	private ResultMsg(int code,String msg,Object data) {
		this.code = code;
		this.msg = msg;
		this.data = data;
	}
	
	public static String success() {
		return success(1,"",null);
	}
	
	public static String success(Object data) {
		return success(1,"",data);
	}
	
	public static String success(String msg) {
		return success(1,msg,null);
	}
	public static String success(int code,String msg) {
		return success(code,msg,null);
	}
	
	public static String success(int code,String msg,Object data) {
		ResultMsg resultMsg = new ResultMsg(code, msg, data);
		return JsonUtils.objectToJson(resultMsg);
	}
	
	public static String fail() {
		return fail("操作失败");
	}
	
	public static String fail(String msg) {
		ResultMsg resultMsg = new ResultMsg(0, msg, null);
		return JsonUtils.objectToJson(resultMsg);
	}
	
	public int getCode() {
		return code;
	}
	public void setCode(int code) {
		this.code = code;
	}
	public String getMsg() {
		return msg;
	}
	public void setMsg(String msg) {
		this.msg = msg;
	}
	public Object getData() {
		return data;
	}
	public void setData(Object data) {
		this.data = data;
	}
	
}
