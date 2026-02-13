package com.infox.h5.core;

import java.util.Map;

import org.apache.commons.lang.StringUtils;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.infox.h5.utils.EncryptUtils;
import com.infox.h5.utils.ResultMsg;
import com.infox.h5.utils.SignUtil;
import com.jfinal.plugin.activerecord.Record;

public class IosApi extends SdkApiAbstract{
	
	@Deprecated
	@Override
	public String getOrderID(Map<String, Object> params) {
		return null;
	}

	@Override
	public String getOrderUrl(Map<String, Object> params) {
		
		try {
			String productId = apiService.findProductIdByParams(params);
			params.put("productID", productId);
			Record game = apiService.findGameByGameId(params.get("gameId"));
			String sign = SignUtil.getSignStr(params) + game.getStr("appKey");
			sign = EncryptUtils.md5(sign);
			params.put("sign", sign);
			String send = apiService.getOrder(params);
			log.info("ios支付send返回：" + send);
			JsonParser json = new JsonParser();
			JsonObject js = json.parse(send).getAsJsonObject();
			if(js.get("code").getAsString().equals("1")) {
				js.addProperty("productID", productId);
				log.info("ios支付返回：" + js.toString());
				return js.toString();
			}else {
				log.info("ios支付返回：" + send);
				return send;
			}
			
		}catch(Exception e) {
			e.printStackTrace();
			return ResultMsg.fail("获取订单信息失败");
		}
	}
	
	public String login(Map<String, Object> params) {
		return apiService.login(params);	
	}
	
	@Override
	public String getToken(Map<String, Object> params) {
		return apiService.iosToken(params);
	}
	@Deprecated
	@Override
	public String getCptoKen(Map<String, Object> params) {
		// TODO Auto-generated method stub
		return null;
	}
	@Deprecated
	@Override
	public String getIosGameInfo(Map<String, Object> params) {
		// TODO Auto-generated method stub
		return null;
	}
	@Deprecated
	@Override
	public String paySign(Map<String, Object> params, String key) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String getOrderNo(Map<String, Object> params) {
		// TODO Auto-generated method stub
		return null;
	}

}
