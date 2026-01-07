package com.paojiao.sdk3.common.util;

import java.util.ArrayList;
import java.util.List;

import com.paojiao.sdk3.model.PjThirdSdkChannel;

public class SdkChannelUtil {
	/**
	 * 判断sdk渠道游戏是否有测试版本
	 * 
	 * @return
	 */
	public static boolean hasTest(PjThirdSdkChannel channel) {
		List<String> hasTestChannel = new ArrayList<String>();
		hasTestChannel.add("appstore");
		hasTestChannel.add("qqsdk");
		for (String sdkCode : hasTestChannel) {
			if (sdkCode.contains(channel.getSdkCode())) {
				return true;
			}
		}
		return false;
	}
}
