package com.paojiao.sdk3.common.util.report;


public enum SysType {
	ANDROID("安卓", 1),
	IOS("IOS", 2),
	H5("H5", 3);

	/**名字**/
	public String name;
	/**代码**/
	public Integer code;

	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Integer getCode() {
		return code;
	}
	public void setCode(Integer code) {
		this.code = code;
	}
	private SysType(String name, Integer code) {
		this.name = name;
		this.code = code;
	}

	public static SysType getById(int code) {
		SysType type = null;
		SysType[] list = SysType.values();
		for (SysType g : list) {
			if (g.code == code) {
				type = g;
			}
		}
		return type;
	}

}
