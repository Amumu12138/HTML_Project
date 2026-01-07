package com.paojiao.sdk3.common;

import com.paojiao.sdk3.common.conf.SdkConfig;

public class PjConstants {

	public static SdkConfig sconfig;
	// 泡椒sdk接口签名key
	public static final String SDK_SIGN_KEY = "mduSfA5TgCe8xxpAqxsIFpPeWWRqCVH4";

	//泡椒h5sdk
	public static final String SDK_CODE_PJH5 = "pjh5sdk";

	//第三方h5sdk
	public static final String SDK_CODE_H5_SDK3 = "h5sdk3";

	//泡椒sdk实现类
	public static final String PJSDK_ITF_IMPL_CLASS = "com.paojiao.sdk3.controller.thirdsdk.paojiao.PaoJiaoSDK";

	//泡椒微信公众号二维码 APPID APPKEY 请求接口
	public static final String SDK_PJ_PUB_APPID = "10002";
	public static final String SDK_PJ_PUB_APPKEY = "ys0hFybEFo0ZamMlpFojCfiCXpFTKQGg";
	public static final String SDK_PJ_PUB_URL = "https://member.paojiao.cn/thirdapi/getQrCodeInfo";

	//默认CID
	public static final String DEFAULT_CID = "pj001";

	//mongodb
	public static final String  HOST_LOGIN_SESSION="loginSession";
	public static final String  HOST_IPINFO="ipInfo";


	public static String  MONGODB_ONLINEUSER_URI = null;


}
