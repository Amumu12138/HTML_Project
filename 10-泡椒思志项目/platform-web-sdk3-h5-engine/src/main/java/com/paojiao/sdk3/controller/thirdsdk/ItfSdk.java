/*
 * Copyright (C) 2006-2016 深圳泡椒思志信息技术有限公司.

 * 未经允许，允许将代码透露给第三方机构或个人
 * --------------------------------------------------------------------
 * ProjectName: pj-third-sdk

 * FileName: ISDKScript.java

 * Created: [2016年1月7日 下午3:27:36] by wsy

 * Description:
 * --------------------------------------------------------------------*/

package com.paojiao.sdk3.controller.thirdsdk;

import javax.servlet.http.HttpServletRequest;

import com.paojiao.sdk3.common.util.PjMap;
import com.paojiao.sdk3.model.PjCpGame;
import com.paojiao.sdk3.model.PjThirdSdkChannel;
import com.paojiao.sdk3.model.PjThirdSdkChannelGame;
import com.paojiao.sdk3.model.PjThirdSdkOrder;

/**
 * SDK用户登录及订单接口 Description:
 * 
 * @author wsy
 * @version 1.0
 * 
 *          <pre>
 * Modification History:
 * Date         Author      Version     Description
 * ------------------------------------------------------------------
 * 2016年1月7日    wsy       1.0        1.0 Version
 * </pre>
 */
public interface ItfSdk {

	/**
	 * 
	 * Description:SDK用户登录验证接口
	 * 
	 * @param
	 * @return void
	 * @throws
	 * @Author wsy Create Date: 2016年1月7日 下午3:31:00
	 */
	public void verify(PjThirdSdkChannel sdkChannel,
			PjThirdSdkChannelGame channelGame, PjCpGame game, String sdkToken,
			ISDKVerifyListener callback);

	/**
	 * 
	 * Description:SDK订单回调接口
	 * 
	 * @param
	 * @return void
	 * @throws
	 * @Author wsy Create Date: 2016年1月7日 下午3:31:53
	 */
	public void orderCallBack(PjMap<String, String> params,HttpServletRequest request,
			ISDKVerifyListener callback);

	/**
	 * 服务器单
	 * 
	 * @param channelGame
	 * 
	 * @param order
	 * 
	 * @return
	 */
	public void getOrderNo(PjThirdSdkChannel sdkChannel,
			PjThirdSdkChannelGame channelGame, PjThirdSdkOrder order,
			PjMap<String, String> params, ISDKVerifyListener callback);

}
