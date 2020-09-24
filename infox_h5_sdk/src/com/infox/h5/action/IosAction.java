package com.infox.h5.action;

import java.util.HashMap;
import java.util.Map;
import com.infox.h5.core.IosApi;
import com.infox.h5.service.ApiService;
import com.infox.h5.service.impl.ApiServiceImpl;
import com.infox.h5.utils.JsonUtils;
import com.infox.h5.utils.ParamsUtils;
import com.jfinal.core.Controller;
import com.jfinal.plugin.activerecord.Record;
import org.apache.log4j.Logger;
import sun.rmi.runtime.Log;

public class IosAction extends Controller {
	public static final Logger log = Logger.getLogger(IosAction.class);
	private static IosApi iosApi = new IosApi();
	private static ApiServiceImpl apiService = new ApiServiceImpl();

	/**
	 * 初始化悬浮窗
	 */
	public void openGame() {
		Map<String, Object> params = ParamsUtils.getParams(super.getParaMap());
		super.renderJson(iosApi.openGame(params));
	}

	/**
	 * 一键注册
	 */
	public void random() {
		Map<String, Object> params = ParamsUtils.getParams(super.getParaMap());
		super.renderJson(iosApi.random(params));

	}

	/**
	 * 账号密码注册
	 */
	public void reg() {
		Map<String, Object> params = ParamsUtils.getParams(super.getParaMap());
		super.renderJson(iosApi.reg(params));
	}

	/**
	 * 发送短信到手机
	 */
	public void sendUserInfo() {
		Map<String, Object> params = ParamsUtils.getParams(super.getParaMap());
		super.renderJson(iosApi.sendUserInfo(params));
	}

	/**
	 * 获取游戏信息
	 */
	public void getGameInfo() {
		Map<String, Object> params = ParamsUtils.getParams(super.getParaMap());
		super.renderJson(iosApi.getGameInfo(params));
		//获取手机型号，如果没有获取到手机型号则访问无效
	/*	String model  = params.get("model").toString();
		if (null == model || model ==""){
			super.redirect("https://h5.infoxgame.com/404.html");
		}else{

		}*/
	}

	/**
	 * 登录
	 */
	public void login() {
		Map<String, Object> params = ParamsUtils.getParams(super.getParaMap());
		super.renderJson(iosApi.login(params));
	}

	/**
	 * token登录
	 */
	public void userToken() {
		Map<String, Object> params = ParamsUtils.getParams(super.getParaMap());
		super.renderJson(iosApi.getToken(params));
	}

	/**
	 * 创建订单
	 */
	public void getOrder() {
		Map<String, Object> params = ParamsUtils.getParams(super.getParaMap());
		super.renderJson(iosApi.getOrderUrl(params));
	}


	/**
	 * 查询是否允许访问
	 */
	public void getIsUrlCorrect() {
		Map<String, Object> params = ParamsUtils.getParams(super.getParaMap());
		Record record = apiService.findEdition(params.get("gameId"),params.get("edition"));
		Map<String,Object> resultParams = new HashMap<String,Object>();
		if (null == record ){
			resultParams.put("state",1);
		}else if (record.get("state").toString().equals("1") && params.get("model").equals("")){
			resultParams.put("state",1);
		}else{
			resultParams.put("state",0);
		}
		super.renderJson(JsonUtils.objectToJson(resultParams));
	}

	/**
	 * 记录设备号
	 */
	public void saveDevice(){
		Map<String, Object> params = ParamsUtils.getParams(super.getParaMap());
		log.info("进入此方法,参数为"+params.toString());
		apiService.saveStatNewClient(params);
		super.renderJson();
	}


}
