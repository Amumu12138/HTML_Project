package com.infox.h5.core;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.infox.h5.utils.EncryptUtils;
import com.infox.h5.utils.HttpclientUtils;
import com.infox.h5.utils.JsonUtils;
import com.infox.h5.utils.RSAUtils;
import com.jfinal.plugin.activerecord.Record;
/**
 * 安卓api
 * @author 156
 *
 */
public class AndApi extends SdkApiAbstract{
	private static String prikey = "MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAO0m9rBaOFCEj4ncScPeC+6H63XMHhs4xb08lR2TbthAPKIZV3jZB0cuh91M3XJcpdhlHUGbLhbWlmG5xKgN1Lt8Z+QoebfNEyyKM06I9YeDSykwRyEjhhOUgLjeIVV3NI8T/awhl+tb/0yyld+5aoXJKxOx/pzqolzoDRs0omEzAgMBAAECgYBGzwt5PHb0E6CIGS4tPW9ymULEuV2D4z+ncR9U5WCDUSrJe6eSfbqellYazYiRTPh31DkYDa2FRC1CoKUHSJnrjeNR2TMw0WUBFvNcqYe2qOJZg3iOhyUDhIChhQiWWC9VrzAvqSU6tuyKGMy5rAWbfTneEnL7NHsTgRRDC+0JAQJBAPlRGW6T4TnRBtbOpRcMU+jdCyJAK3zwuRO13alhexDLq105D1osg2uP1d3+XvTQudwCGo1qRfBSp/W72fynz5kCQQDzgmLyxGzO1rugtJNMLQTqsRGg8ZUoUPmsEVGbmnHwRzd2OGHWbT1JuIEEb+ivrZV3PfeEObv7fDAT6qIhyiarAkAcd4ka2iG+U0KfpkqtXgf6r7qEt6T/iBDp0js0CuBdY5P2efxpxGlhD7RQu6ml9Gs0Vr0nZnoD3bw1z7QtKBAJAkBiqBjesqZCxs0NtxtWaYbsbwDta/M6elQtWnbtzA0NhEz8IKvC7E9AZvgejBiB1JoRzZFSiPGYWiBAcXduqTAxAkEAqG24ePhjesKoF1Us2ViqgJC7zDd96v+LI5eausw3TfKjO4jj5oMoQiyc+hZFxHYlkyZRfA6XEraF1Rdgngf65w==";
	@Override
	public String getOrderID(Map<String, Object> params) {
		Record game = apiService.findGameByGameId(params.get("appID"));//查游戏
        String sign = paySign(params, game.getStr("appKey"));
        params.put("sign", sign);
        String send = "";
        if(params.get("isTest").toString().equals("true")) {
        	send = HttpclientUtils.getInstance().HttpPost(ServiceConfig.cssdkhost+"/pay/getOrderID.html", params, null, null);
        }else {
        	send = HttpclientUtils.getInstance().HttpPost(ServiceConfig.sdkhost+"/pay/getOrderID.html", params, null, null);
        }
        log.info("-----getOrderID result: " + send);
		return send;
	}
	
	@Override
	public String getOrderNo(Map<String, Object> params) {
		/*Record game = apiService.findGameByGameId(params.get("appID"));//查游戏
        String sign = paySign(params, game.getStr("appKey"));
        params.put("sign", sign);*/
		log.info("-----getOrderNo params: " + params.toString());
        String send = "";
        if(params.get("isTest").toString().equals("true")) {
        	send = HttpclientUtils.getInstance().HttpPost(ServiceConfig.cssdkhost+"/pay/getOrderNo.html", params, null, null);
        }else {
        	send = HttpclientUtils.getInstance().HttpPost(ServiceConfig.sdkhost+"/pay/getOrderNo.html", params, null, null);
        }
        log.info("-----getOrderNo result: " + send);
		return send;
	}

	@Override
	public String getOrderUrl(Map<String, Object> params) {
        String sign = paySign(params, params.remove("appKey").toString());
        params.put("sign", sign);
		String send = HttpclientUtils.getInstance().HttpPost(ServiceConfig.sdkhost+"/pay/getOrderUrl.html", params, null, null);
		send = send.replaceAll("http:", "https:");
		return send;	
	}

	@Override
	public String getToken(Map<String, Object> params) {
		
		log.info("getToken======params===>" + params);
		String send = null,token=null;
		JsonParser json = new JsonParser();
		Integer realNameAuthStatus = 0;
		try {
			if(params.get("extension") == null || StringUtils.isBlank(params.get("extension").toString())) { //账号密码登录
				send = apiService.login(params); //登录
				log.info("登录返回：" + send);
				JsonObject data = json.parse(send).getAsJsonObject();
				token = data.get("data").getAsJsonObject().get("token").getAsString();//登录成功返回token
				log.info("登录成功返回token========>" + token);
			}else {
				token = params.get("extension").toString();//自动登录token
				token = apiService.verificationToken(token);//查是否有映射token;
				if(null !=token){
					realNameAuthStatus = Integer.parseInt(params.get("realNameAuthStatus").toString());						//有token情况下证明已实名认证
				}

			}
			params.remove("sign");//删除页面产生sign
			log.info("映射token========>" + token);
			Record game = apiService.findGameByGameId(params.get("appID"));//查游戏
			StringBuffer sb = new StringBuffer();
			sb.append("appID=").append(params.get("appID")).append("channelID=").append(params.get("channelID"))
			.append("extension=").append(token).append(game.getStr("appKey"));
			String sign = EncryptUtils.md5(sb.toString()); //md5
			params.put("sign", sign);
			params.put("extension", token);
			if(game.getStr("gameName").contains("IOS")) {
				params.put("h5Type", "i");
			}else {
				params.put("h5Type", "a");
			}

			if (null != send){
				//先验证用户中心是否有实名认证
				 realNameAuthStatus = json.parse(send).getAsJsonObject().get("data").getAsJsonObject().get("realNameAuthStatus").getAsInt();
			}
			send = apiService.getToken(params);//验证token
			log.info("验证token" + send);
			String cp_token = json.parse(send).getAsJsonObject().get("data").getAsJsonObject().get("token").getAsString();
			apiService.insertH5Token(token,cp_token);
			JsonObject js = json.parse(send).getAsJsonObject();
			if(js.get("state").getAsString().equals("1")) {
				if (realNameAuthStatus > 0 ){
					JsonObject data = js.getAsJsonObject("data");
					data.remove("realNameAuthStatus");
					data.addProperty("realNameAuthStatus",realNameAuthStatus);
				}
				js.addProperty("ucToken", token);
				log.info("js===========>" + js.toString());
				return js.toString();
			}else {
				return send;
			}
		}catch(Exception e) {
			e.printStackTrace();
			return send;
		}
	}

	@Override
	public String getCptoKen(Map<String, Object> params) {
		
		log.info("getCpToken======params===>" + params);
		String send;
		JsonParser json = new JsonParser();
		try {
			Record game = apiService.findGameByGameId(params.get("appID"));
			StringBuffer sb = new StringBuffer();
			sb.append("appID=").append(params.get("appID")).append("channelID=").append(params.get("channelID"))
			.append("extension=").append(params.get("extension")).append(game.getStr("appKey"));
			String sign = EncryptUtils.md5(sb.toString()); //md5
			params.put("sign", sign);
			//params.put("extension", URLEncoder.encode(params.get("extension").toString(),"utf-8"));
			log.info("H5SDK【getToken】请求参数为："+params);
			send = apiService.getToken(params);//验证token
			log.info("H5SDK【getToken】返回参数为："+send);
			log.info("验证token" + send);
			JsonObject data = json.parse(send).getAsJsonObject().get("data").getAsJsonObject();
			log.info("-------data---------：" + data.toString());
			String userID = data.get("userID").getAsString();
			String paojiaoId = data.get("suid").getAsString();
			String token = data.get("token").getAsString();
			String openRealNameAuth = data.get("openRealNameAuth").getAsString();
			String realNameAuthStatus = data.get("realNameAuthStatus").getAsString();
			String extension =data.get("extension").getAsString();
			Map<String,Object> p = new HashMap<String,Object>();
			p.put("paojiaoId", paojiaoId);
			p.put("userID", userID);
			p.put("sdkUserID",  data.get("sdkUserID").getAsString());
			p.put("token", token);
			p.put("gameUrl",game.getStr("mainUrl"));
			p.put("type",game.get("userId"));
			p.put("openRealNameAuth",openRealNameAuth);
			p.put("realNameAuthStatus",realNameAuthStatus);
			if (StringUtils.isNotEmpty(extension)){
				p.put("extension",extension);
			}
			log.info("getToken =========》" + send);
			log.info("getCpToken =========》" + p);
			return JsonUtils.objectToJson(p);
			
		}catch(Exception e) {
			e.printStackTrace();
			return "{\"msg\":\"系统错误\",\"code\":0}" ; 
		}
		
	}
	
	@Override
	@Deprecated
	public String getIosGameInfo(Map<String, Object> params) {
		log.info("getCpToken======params===>" + params);
		Record iosGameInfo = apiService.getIosGameInfo(params);
		return JsonUtils.objectToJson(iosGameInfo.getColumns());
	}

	@Override
	public String paySign(Map<String, Object> params, String key) {
		
		StringBuilder sb = new StringBuilder();
        int money = 0;
        try {money = Integer.parseInt(params.get("money").toString());}catch(Exception e){}
        sb.append("userID=").append(params.get("userID")).append("&")
        .append("productName=").append(params.get("productName")).append("&")
        .append("productDesc=").append(params.get("productDesc")).append("&")
        .append("money=").append(money*100).append("&")
        .append("roleID=").append(params.get("roleID")).append("&")
        .append("roleName=").append(params.get("roleName")).append("&")
        .append("serverID=").append(params.get("serverID")).append("&")
        .append("serverName=").append(params.get("serverName")).append("&")
        .append("extension=").append(params.get("extension"))
        .append(key);
        log.info("融合下单sign：" + sb.toString());
        String encoded,sign = "";
		try {
			encoded = URLEncoder.encode(sb.toString(), "UTF-8");
			sign = RSAUtils.sign(encoded,prikey, "utf-8");
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		return sign;
	}

}
