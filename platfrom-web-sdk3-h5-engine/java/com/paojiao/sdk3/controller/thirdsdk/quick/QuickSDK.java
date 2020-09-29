package com.paojiao.sdk3.controller.thirdsdk.quick;

import java.io.ByteArrayInputStream;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.dom4j.Document;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;

import com.alibaba.fastjson.JSONObject;
import com.jfinal.aop.Aop;
import com.jfinal.kit.JsonKit;
import com.paojiao.sdk3.common.util.EncryptUtils;
import com.paojiao.sdk3.common.util.PjMap;
import com.paojiao.sdk3.controller.pay.PayStatus;
import com.paojiao.sdk3.controller.thirdsdk.HttpAgent;
import com.paojiao.sdk3.controller.thirdsdk.HttpFutureCallback;
import com.paojiao.sdk3.controller.thirdsdk.ISDKVerifyListener;
import com.paojiao.sdk3.controller.thirdsdk.ItfSdk;
import com.paojiao.sdk3.controller.thirdsdk.SDKVerifyResult;
import com.paojiao.sdk3.model.PjCpGame;
import com.paojiao.sdk3.model.PjThirdSdkChannel;
import com.paojiao.sdk3.model.PjThirdSdkChannelGame;
import com.paojiao.sdk3.model.PjThirdSdkOrder;
import com.paojiao.sdk3.service.PjThirdSdkChannelGameService;
import com.paojiao.sdk3.service.PjThirdSdkOrderService;

/**
 * @Description:QuickSDK（上海倚智接入quick）
 * @author tqy
 * @date 2020年5月7日
 */
public class QuickSDK implements ItfSdk {

	private static final Logger log = Logger.getLogger(QuickSDK.class);

	private PjThirdSdkOrderService orderService = Aop.get(PjThirdSdkOrderService.class);

	private PjThirdSdkChannelGameService channelGameService = Aop.get(PjThirdSdkChannelGameService.class);


	/**
	 * SDK用户登录验证接口
	 */
	@Override
	public void verify(PjThirdSdkChannel sdkChannel, PjThirdSdkChannelGame channelGame, PjCpGame game, String sdkToken,
			ISDKVerifyListener callback) {
		log.info("QuickSDK verify客户端返回sdkToken: "+sdkToken);
		if (StringUtils.isBlank(sdkToken)) {
			log.info("QuickSDK-客户端登录返回为空");
			callback.onFailed("QuickSDK verify failed. " + "QuickSDK客户端登录返回为空");
			return;
		}
		try {
			JSONObject obj = JSONObject.parseObject(sdkToken);
			if (StringUtils.isBlank(obj.getString("token"))) {
				log.info("QuickSD-verify: token is null");
				callback.onFailed("QuickSDK-verify: token is null.");
				return;
			}
			if (StringUtils.isBlank(obj.getString("uid"))) {
				log.info("QuickSDK-verify: uid is null");
				callback.onFailed("QuickSDK-verify: uid is null.");
				return;
			}
			if (StringUtils.isBlank(obj.getString("username"))) {
				log.info("QuickSDK-username is null");
				callback.onFailed("QuickSDK-verify: username is null.");
				return;
			}
			String token = obj.getString("token");
			String uid = obj.getString("uid");
			String username = obj.getString("username");
			Map<String, String> params = new HashMap<String, String>();
			params.put("token", token);//游戏客户端从SDK客户端中获取的token值,原样传递无需解密,此值长度范围小于512,CP需预留足够长度
			params.put("uid", uid);//从客户端接口获取到的渠道原始uid,无需任何加工如拼接渠道ID等
			params.put("product_code", sdkChannel.getVkey());//Quick后台查看游戏信息里可获取此值
			//params.put("channel_code", "");//选传；传入此值将校验uid和token是否与channel_code一致,若游戏运营过程有发生玩家渠道间帐号转移,应确保此值正确
			String url = sdkChannel.getAuthUrl();

			//验证登录
			HttpAgent.getInstance().get(url, params, new HttpFutureCallback() {
				@Override
				public void completed(String result) {
					if (StringUtils.isBlank(result)) {
						callback.onFailed("QuickSDK-verify: result is null.");
						return;
					}
					log.info("QuickSDK-verify: result: " + result);//返回结果为纯字符串：1为成功，其他均为失败
					if ("1".equals(result)) {
						callback.onSuccess(new SDKVerifyResult(true, uid, username, null));
						return;
					}
				}

				@Override
				public void failed(String err) {
					callback.onFailed(sdkChannel.getSdkCode() + " verify failed. " + err);
				}

			});
		} catch (Exception e) {
			log.error("QuickSDK-verify: verify error!", e);
		}

	}

	/**
	 * SDK订单回调接口
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Override
	public void orderCallBack(PjMap<String, String> params, HttpServletRequest request, ISDKVerifyListener callback) {
		log.info("QuickSDK-orderCallBack:" + JsonKit.toJson(params));
		//处理成功回写SUCCESS
		SDKVerifyResult vs = new SDKVerifyResult();	
		String sign = request.getParameter("sign");
		if(StringUtils.isEmpty(sign)) {
			log.info("QuickSDK-orderCallBack:sign参数为空！");
			vs.setReturnMsg("FAIL");
			callback.onSuccess(vs);
			return;
		}
		String md5Sign = request.getParameter("md5Sign");
		if(StringUtils.isEmpty(md5Sign)) {
			log.info("QuickSDK-orderCallBack:md5Sign参数为空！");
			vs.setReturnMsg("FAIL");
			callback.onSuccess(vs);
			return;
		}
		String nt_data = request.getParameter("nt_data");
		if(StringUtils.isEmpty(nt_data)) {
			log.info("QuickSDK-orderCallBack:nt_data参数为空！");
			vs.setReturnMsg("FAIL");
			callback.onSuccess(vs);
			return;
		}
		try {
			PjThirdSdkChannelGame channelGame = channelGameService.findGameById(params.getToInt("channelGameId"));
			if (channelGame == null) {
				log.info("QuickSDK-orderCallBack: PjThirdSdkChannelGame is null.");
				vs.setReturnMsg("FAIL");
				callback.onSuccess(vs);
				return;
			}
			//计算md5(nt_data+sign+md5key)得到值是否与收到的md5Sign保持一致,若一致则签名通过
			String newMd5Sign = EncryptUtils.md5(nt_data+sign+channelGame.getSignKey());
			if (!newMd5Sign.equals(md5Sign)) {//验签
				log.info("QuickSDK-orderCallBack: 验签失败, {md5Sign: " + md5Sign + ", newMd5Sign: " + newMd5Sign+"}");
				vs.setReturnMsg("FAIL");
				callback.onSuccess(vs);
				return;
			}
			//参数解密
			String decode = QuickSDKUtil.decode(nt_data, channelGame.getPayKey());//Callback_Key放到这个字段里面，Callback_Key是nt_data的解密参数
			if (StringUtils.isBlank(decode)) {//
				log.info("QuickSDK-orderCallBack: 解密失败，获取参数null");
				vs.setReturnMsg("FAIL");
				callback.onSuccess(vs);
				return;
			}
			log.info("QuickSDK-orderCallBack: decode="+decode);
			//1.创建Reader对象
			SAXReader reader = new SAXReader();
			//2.加载xml
			Document document = reader.read(new ByteArrayInputStream(decode.getBytes("UTF-8")));
			//3.获取根节点
			Element rootElement = document.getRootElement();
			List<Element> eles = rootElement.elements();
			Element el = eles.get(0);
			Iterator iterator = el.elementIterator();
			String order_no = "";//渠道订单号
			String game_order = "";//我们的订单号
			String amount = "";//金额
			while (iterator.hasNext()){
				Element stu = (Element) iterator.next();
				if ("order_no".equals(stu.getName())) {//订单号
					order_no = stu.getStringValue();
				}
				if ("game_order".equals(stu.getName())) {//订单号
					game_order = stu.getStringValue();
				}
				if ("amount".equals(stu.getName())) {//金额
					amount = stu.getStringValue();
				}
			}
			if (StringUtils.isBlank(game_order)) {
				log.error("QuickSDK-orderCallBack: order is null");
				vs.setReturnMsg("FAIL");
				callback.onSuccess(vs);
				return;
			}
			PjThirdSdkOrder iod = orderService.findOrderByOrderNo(game_order);
			if (iod == null) {
				log.error("QuickSDK-orderCallBack: order not found,orderNo:[" + game_order + "]");
				vs.setReturnMsg("FAIL");
				callback.onSuccess(vs);
				return;
			} else if (iod.getStatus() == PayStatus.PAY_SUCCESS.id) {// 已完成支付
				log.error("QuickSDK-orderCallBack: 重复回调,orderNo:[" + game_order + "]");
				vs.setReturnMsg("SUCCESS");
				callback.onSuccess(vs);
				return;
			}
			//真实收款金额
			Double money = Double.valueOf(amount);
			//实际收款金额不一致
			if (iod.getMoney() != money.floatValue()) {
				log.error("QuickSDK-orderCallBack: 收款金额与订单金额不符,orderNo:[" + game_order + "],订单金额："
						+ iod.getMoney() + ",实际收款金额：" + amount);
				// 更新订单金额
				iod.setMoney(money.floatValue());
				orderService.updateOrder(iod);
			}
			log.info("+++++++++QuickSDK-orderCallBack，完成支付....");
			orderService.finishOrderAndCallbackCp(game_order, order_no);
			vs.setReturnMsg("SUCCESS");
			callback.onSuccess(vs);
		} catch (Exception e) {
			log.error("QuickSDK-orderCallBack: 充值回调异常！params:[" + JsonKit.toJson(params) + "]", e);
			vs.setReturnMsg("FAIL");
			callback.onSuccess(vs);
			return;
		}

	}

	/**
	 * 获取订单接口
	 */
	@Override
	public void getOrderNo(PjThirdSdkChannel sdkChannel, PjThirdSdkChannelGame channelGame, PjThirdSdkOrder order,
			PjMap<String, String> params, ISDKVerifyListener callback) {
		// TODO Auto-generated method stub

	}

	/*@SuppressWarnings({ "unchecked", "rawtypes" })
	public static void main(String[] args)  {
		try {
			String decode = "<!--?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\"?--><quicksdk_message><message><is_test>0</is_test><channel>8888</channel><channel_uid>231845</channel_uid><game_order>123456789</game_order><order_no>12520160612114220441168433</order_no><pay_time>2016-06-12 11:42:20</pay_time><amount>1.00</amount><status>0</status><extras_params>{1}_{2}</extras_params></message></quicksdk_message>";
			//1.创建Reader对象
			SAXReader reader = new SAXReader();
			//2.加载xml
			Document document = reader.read(new ByteArrayInputStream(decode.getBytes("UTF-8")));
			//3.获取根节点
			Element rootElement = document.getRootElement();
			List<Element> eles = rootElement.elements();
			Element el = eles.get(0);
			Iterator iterator = el.elementIterator();
			String order_no = "";//渠道订单号
			String game_order = "";//我们的订单号
			String amount = "";//金额
			while (iterator.hasNext()){
				Element stu = (Element) iterator.next();
				System.out.println("节点名: " + stu.getName()+", 节点值：" + stu.getStringValue());
				if ("order_no".equals(stu.getName())) {//渠道订单号
					order_no = stu.getStringValue();
					System.out.println("order_no: "+order_no);
				}
				if ("game_order".equals(stu.getName())) {//订单号
					game_order = stu.getStringValue();
					System.out.println("game_order: "+game_order);
				}
				if ("amount".equals(stu.getName())) {//金额
					amount = stu.getStringValue();
					System.out.println("amount: "+amount);
				}
			}
		} catch (Exception e) {
			log.error("error", e);
		}
	}*/

}
