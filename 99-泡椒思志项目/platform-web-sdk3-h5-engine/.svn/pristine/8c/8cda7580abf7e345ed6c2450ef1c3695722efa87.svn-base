package com.paojiao.sdk3.controller.pay;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.jfinal.aop.Inject;
import com.jfinal.kit.HttpKit;
import com.jfinal.kit.JsonKit;
import com.jfinal.kit.StrKit;
import com.paojiao.sdk3.controller.BaseController;
import com.paojiao.sdk3.controller.pay.config.PayConfig;
import com.paojiao.sdk3.controller.pay.util.PaySignUtil;
import com.paojiao.sdk3.model.PjThirdSdkOrder;
import com.paojiao.sdk3.service.PjThirdSdkOrderService;

import java.util.HashMap;
import java.util.Map;

/**
 * 泡椒支付异步回调
 */
public class PaoJiaoPayCallbackController extends BaseController {

	@Inject
	private PjThirdSdkOrderService orderService;

	/**
	 * 游戏支付回调
	 */
	public void payCallBack() {
		Map<String, Object> param = new HashMap<String, Object>();

		try {
			String res = HttpKit.readData(getRequest());
			log.info("=======>>收到泡椒支付中心异步回调:" + res);

			if (StrKit.isBlank(res)) {
				this.renderText("param error");
				return;
			}

			JSONObject obj = JSON.parseObject(res);

			int gameId = obj.getInteger("gameId");
			int uid = obj.getInteger("uid");
			String orderNumber = obj.getString("orderNumber");
			int payConfigId = obj.getInteger("payConfigId");
			String busOrder = obj.getString("busOrder");
			float price = obj.getFloatValue("price");
			String finishedTime = obj.getString("finishedTime");
			String sign = obj.getString("sign");

			param.put("uid", uid);// 用户uid
			param.put("orderNumber", orderNumber);// 第三方订单号
			param.put("busOrder", busOrder);// 融合sdk订单号
			param.put("gameId", gameId);// 游戏id
			param.put("price", price);// 商品价格
			param.put("payConfigId", payConfigId);// 支付方式id
			param.put("finishedTime", finishedTime);// 支付完成时间

			boolean isValid = PaySignUtil.verifySign(param, sign,PayConfig.api_pay_key);

			if (!isValid) {// 签名验证失败
				log.error("==========>>"+busOrder+":签名验证失败");
				this.renderText("invalid sign");
				return;
			}

			PjThirdSdkOrder iod = orderService.findOrderByOrderNo(busOrder);
			if (iod == null) {// 订单不存在
				log.error("==========>>"+busOrder+":订单不存在");
				this.renderText("busOrder not found");
				return;
			}

			if (iod.getStatus() == PayStatus.PAY_SUCCESS.id) {// 订单已经完成支付
				log.error("==========>>"+busOrder+":订单已经支付完成");
				this.renderText("success");
				return;
			}

			if (iod.getMoney() != price) {// // 实际收款金额不一致，更新金额为实际收款
				log.error("+++++++++游戏支付回调，订单金额与实际支付金额不符，订单号[" + busOrder
						+ "],订单金额:[" + iod.getMoney() + "]，实际支付金额：" + price);
				iod.setMoney(price);
				orderService.updateOrder(iod);
			}

			log.info("+++++++++游戏支付[" + busOrder + "]，完成支付....");
			orderService.finishOrderAndCallbackCp(busOrder, orderNumber);
			this.renderText("success");
			return;

		} catch (Exception e) {
			log.error("=======>>泡椒支付中心回调异常:",e);
			log.error(JsonKit.toJson(param),e);
			this.renderText("exception");
		}
	}

	/**
	 * 泡椒支付同步回调
	 */
	public void paySyncCallBack() {

		String orderNumber = getPara("orderNumber");

		log.info("=======>>收到泡椒支付中心同步回调:" + orderNumber);


		PjThirdSdkOrder iod = orderService.findOrderByOrderNo(orderNumber);

		if (iod.getStatus() == PayStatus.PAY_SUCCESS.id) {
			super.paySuccess();
			return;
		}

		// 等待结果
		super.payWaitResult();
		return;

	}



	}
