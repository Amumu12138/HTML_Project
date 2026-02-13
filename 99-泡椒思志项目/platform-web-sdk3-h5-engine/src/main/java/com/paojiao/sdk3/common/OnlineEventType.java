package com.paojiao.sdk3.common;


public enum OnlineEventType {
    EVENT_OVERTIME(1, "在线超时,弹窗覆盖无法游戏"),
	EVENT_SIGN_OUT(2, "强制退出游戏");


	public int id;
	public String type;

	private OnlineEventType(int id, String type) {
		this.id = id;
		this.type = type;
	}


	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}


}
