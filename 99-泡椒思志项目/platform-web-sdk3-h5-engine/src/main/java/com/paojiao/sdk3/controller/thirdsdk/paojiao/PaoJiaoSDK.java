package com.paojiao.sdk3.controller.thirdsdk.paojiao;

import com.alibaba.fastjson.JSON;
import com.jfinal.aop.Aop;
import com.jfinal.kit.JsonKit;
import com.jfinal.kit.StrKit;
import com.paojiao.sdk3.common.util.PjMap;
import com.paojiao.sdk3.common.util.SignUtil;
import com.paojiao.sdk3.controller.pay.PayStatus;
import com.paojiao.sdk3.controller.thirdsdk.*;
import com.paojiao.sdk3.model.PjCpGame;
import com.paojiao.sdk3.model.PjThirdSdkChannel;
import com.paojiao.sdk3.model.PjThirdSdkChannelGame;
import com.paojiao.sdk3.model.PjThirdSdkOrder;
import com.paojiao.sdk3.service.PjThirdSdkChannelGameService;
import com.paojiao.sdk3.service.PjThirdSdkChannelService;
import com.paojiao.sdk3.service.PjThirdSdkOrderService;
import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;

import javax.servlet.http.HttpServletRequest;
import java.util.*;

/**
 * 泡椒SDK author:wsy date:2015-10-13
 */
public class PaoJiaoSDK implements ItfSdk {
	private static final Logger log = Logger.getLogger(PaoJiaoSDK.class);

	private  PjThirdSdkOrderService orderService = Aop.get(PjThirdSdkOrderService.class);
	private  PjThirdSdkChannelGameService channelGameService = Aop.get(PjThirdSdkChannelGameService.class);
	private  PjThirdSdkChannelService channelService = Aop.get(PjThirdSdkChannelService.class);


	@Override
	public void verify(final PjThirdSdkChannel sdkChannel,
			final PjThirdSdkChannelGame channelGame, final PjCpGame game,
			final String sdkToken, final ISDKVerifyListener callback) {
		try {
			log.info("PaoJiaoSDK  客户端登录返回:" + sdkToken);
			if (StringUtils.isEmpty(sdkToken)) {
				log.info("PaoJiaoSDK 客户端登录返回为空");
				callback.onFailed(" verify failed. " + "PaoJiaoSDK 客户端登录返回为空");
				return;
			}
			Map<String, String> params = new HashMap<String, String>();
			params.put("appId", channelGame.getGameId() + "");

			params.put("token", sdkToken);

			String url = sdkChannel.getAuthUrl();

			HttpAgent.getInstance().get(url, params, new HttpFutureCallback() {
				@Override
				public void completed(String result) {

					try {
						PaoJiaoAuthInfo res = JSON.parseObject(result,
								PaoJiaoAuthInfo.class);

						if (res != null && res.getData() != null
								&& res.getCode() == 1) {

							callback.onSuccess(new SDKVerifyResult(true, res.getData().getUid(),res.getData().getUserName(), res.getData().getNiceName(),res.getData().getRealNameAuthStatus()));
							return;

						}

					} catch (Exception e) {
						e.printStackTrace();
					}

					callback.onFailed(sdkChannel.getSdkCode()
							+ " verify failed. the post result is " + result);
				}

				@Override
				public void failed(String e) {
					callback.onFailed(sdkChannel.getSdkCode()
							+ " verify failed. " + e);
				}

			});

		} catch (Exception e) {
			e.printStackTrace();
			callback.onFailed(sdkChannel.getSdkCode()
					+ " verify execute failed. the exception is "
					+ e.getMessage());
		}
	}

	@Override
	public void orderCallBack(PjMap<String, String> params,HttpServletRequest request,
			ISDKVerifyListener callback) {
		log.info("PaojiaoSdk orderCallBack:" + JsonKit.toJson(params));
		SDKVerifyResult vs = new SDKVerifyResult();
		try {
			PjThirdSdkChannelGame channelGame = channelGameService.findGameById(params.getToInt("channelGameId"));


			PjThirdSdkChannel channel =channelService.findChannelById(channelGame.getSdkChannelId());
				String sign = params.get("sign");
				try {
					params.put("gamekey", channelGame.getSdkAppKey());
					String md5before = sortParam(params);
					if (StrKit.isBlank(sign)
							|| !SignUtil.isSignOK(md5before, sign)) {
						log.error("Invalid sign\noriginal string:" + md5before
								+ "\nyour sign:" + sign);
						vs.setReturnMsg("fail");
						callback.onSuccess(vs);
						return;
					}
					String cporder = params.get("cporder");
					PjThirdSdkOrder iod = orderService
							.findOrderByOrderNo(cporder);
					if (iod == null) {
						log.error("ERROR:orer not found,orderNo:[" + cporder
								+ "]");
					} else if (iod.getStatus() == PayStatus.PAY_SUCCESS.id) {// 已完成支付
						log.error("重复回调,orderNo:[" + cporder + "]");
						vs.setReturnMsg("success");
						callback.onSuccess(vs);
						return;
					}

					// 真实收款
					Double amount = Double.valueOf(params.get("money"));
					// 实际收款金额不一致
					if (iod.getMoney() != amount.floatValue()) {
						log.error("收款金额与订单金额不符,orderNo:[" + cporder + "],订单金额："
								+ iod.getMoney() + ",实际收款金额：" + amount);
						// 更新订单金额
						iod.setMoney(amount.floatValue());
						orderService.updateOrder(iod);
					}
					log.info("+++++++++Moxia，完成支付....");
					orderService.finishOrderAndCallbackCp(cporder,
							params.get("order"));

				} catch (Exception e) {
					log.error("Moxia orderCallBack error:" + e.getMessage());
					vs.setReturnMsg("fail");
					callback.onSuccess(vs);
					return;
				}
				vs.setReturnMsg("success");
				callback.onSuccess(vs);
		} catch (Exception e) {
			vs.setReturnMsg("fail");
			callback.onSuccess(vs);
			log.error("Paojiao充值回调请求异常！params:[" + JsonKit.toJson(params) + "]");
			e.printStackTrace();
		}
	}

	/**
	 * 对请求参数按照一定的规则排序，默认使用Collections.sort
	 *
	 * @param params
	 *            请求中获取的键值
	 * @return
	 */
	private static String sortParam(Map<String, String> params) {
		// 去掉清源签名未用到的参数
		params.remove("channelGameId");
		params.remove("ip2");
		StringBuffer content = new StringBuffer();
		// 按照key做排序
		List<String> keys = new ArrayList<String>(params.keySet());
		Collections.sort(keys);
		for (int i = 0; i < keys.size(); i++) {
			String key = (String) keys.get(i);
			// sign参数不参与加密
			if ("sign".equals(key) || key.startsWith("ip")
					|| "channelGameId".equals(key)) {
				continue;
			}
			String value = (String) params.get(key);
			content.append("&").append(key).append("=").append(value);
		}

		return content.toString().substring(1);
	}

	@Override
	public void getOrderNo(PjThirdSdkChannel sdkChannel,
			PjThirdSdkChannelGame channelGame, PjThirdSdkOrder order,
			PjMap<String, String> params, ISDKVerifyListener callback) {
		// TODO Auto-generated method stub
	}
}
