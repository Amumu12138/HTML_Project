package com.paojiao.sdk3.controller;

import java.net.URLDecoder;
import java.util.HashMap;
import java.util.Map;

import com.jfinal.kit.JsonKit;
import org.apache.log4j.Logger;
import com.jfinal.core.ActionException;
import com.jfinal.core.Controller;
import com.jfinal.render.RenderManager;
import com.paojiao.sdk3.common.StatusType;
import com.paojiao.sdk3.common.util.PjMap;
import com.paojiao.sdk3.common.util.UrlEncoderUtils;
import org.omg.PortableInterceptor.INACTIVE;

/**
 * 所有controller的父类，基类，实现一些基础方法，初始化基础变量
 *
 * @author Administrator
 *
 */
public class BaseController extends Controller {
	public static final String SUCCESS = "success";

	public static final String FAIL = "fail";

	public static final Logger log = Logger.getLogger(BaseController.class);


	private static final RenderManager renderManager = RenderManager.me();

	protected static String buildUrlPara(Map<String, String> params) {
		String result = "";
		int i = 0;
		String sand = "";
		for (String s : params.keySet()) {
			if (s.equals("sign"))
				continue;
			if (i > 0)
				sand = "&";
			result = result + sand + s + "=" + params.get(s);
			i++;
		}
		return result;
	}

	protected PjMap<String, String> getParaMap1() {
		Map<String, String[]> params = getParaMap();
		PjMap<String, String> re = new PjMap<String, String>();
		for (Map.Entry<String, String[]> entry : params.entrySet()) {
			String[] val = entry.getValue();
			StringBuffer sval = new StringBuffer();
			for (String i : val) {
				sval.append(i).append(",");
			}
			String strval = sval.toString();
			if (strval.endsWith(","))
				strval = strval.substring(0, strval.length() - 1);
			if (UrlEncoderUtils.hasUrlEncoded(strval)) {
				try {
					strval = URLDecoder.decode(strval, "UTF-8");
				} catch (Exception e) {
					log.error("URLDecoder.decode to utf-8 error:" + strval);
				}
			}
			re.put(entry.getKey(), strval);
		}
		return re;
	}

	/**
	 * 返回成功提示。
	 *
	 * @param msg
	 * @return
	 */
	public String success(String msg) {
		Map<String, Object> res = new HashMap<String, Object>();
		res.put("msg", msg);
		res.put("code", 1);
		return JsonKit.toJson(res);
	}

	/**
	 * 返回成功提示。
	 *
	 * @param msg
	 * @return
	 */
	public String success(String msg, Object data) {

		Map<String, Object> res = new HashMap<String, Object>();
		res.put("msg", msg);
		res.put("code", 1);
		res.put("data", data);

		return JsonKit.toJson(res);
	}

	/**
	 * 返回错误提示
	 *
	 * @param msg
	 * @return
	 */
	public String failure(String msg) {
		Map<String, Object> res = new HashMap<String, Object>();
		res.put("msg", msg);
		res.put("code", 0);
		return JsonKit.toJson(res);
	}

	/**
	 * 返回错误提示
	 *
	 * @param msg
	 * @return
	 */
	public String failure(String msg, int code) {
		Map<String, Object> res = new HashMap<String, Object>();
		res.put("msg", msg);
		res.put("code", code);
		return JsonKit.toJson(res);
	}

	/**
	 * 返回成功提示。
	 *
	 * @return
	 */
	public String success(Object data) {
		Map<String, Object> res = new HashMap<String, Object>();
		res.put("data", data);
		return JsonKit.toJson(res);
	}
	/**
	 * 返回成功提示。
	 *
	 * @return
	 */
	public void success(String msg,String resCode,String url) {
		Map<String, Object> res = new HashMap<String, Object>();
		res.put("msg", msg);
		res.put("resCode", resCode);
		res.put("url", url);
		this.renderJson(res);
	}

	/**
	 * 返回成功提示。
	 *
	 * @param msg
	 * @return
	 */
	public String stateSuccess(String msg) {
		Map<String, Object> res = new HashMap<String, Object>();
		res.put("msg", msg);
		res.put("code", 1);
		return JsonKit.toJson(res);
	}

	/**
	 * 返回成功提示。
	 *
	 * @param msg
	 * @return
	 */
	public String stateSuccess(String msg, Object data) {

		String methodName = Thread.currentThread().getStackTrace()[2]
				.getMethodName();

		Map<String, Object> res = new HashMap<String, Object>();
		res.put("msg", msg);
		res.put("code", 1);
		res.put("data", data);
		if (null != methodName && !methodName.equals("checkGameUpdate")) {
			log.info("success:" + res.toString());
		}
		return JsonKit.toJson(res);
	}

	/**
	 * 返回错误提示
	 *
	 * @param msg
	 * @return
	 */
	public String stateFailure(String msg) {
		Map<String, Object> res = new HashMap<String, Object>();
		res.put("msg", msg);
		res.put("code", 0);
		return JsonKit.toJson(res);
	}

	/**
	 * 返回错误提示
	 *
	 * @return
	 */
	public String stateFailure(StatusType state) {
		Map<String, Object> res = new HashMap<String, Object>();
		res.put("msg", state.msg);
		res.put("code", state.id);

		log.info("fail:" + res.toString());
		return JsonKit.toJson(res);
	}

	public String resultJson(int result) {
		Map<String, Integer> res = new HashMap<String, Integer>();
		res.put("result", result);
		return JsonKit.toJson(res);
	}

	/**
	 * 返回成功提示。
	 *
	 * @param msg
	 * @return
	 */
	public void requestSuccess(String msg, Object data) {
		Map<String, Object> res = new HashMap<String, Object>();
		res.put("msg", msg);
		res.put("code", 1);
		res.put("data", data);
		this.renderJson(res);
	}


	/**
	 * 返回成功提示。
	 *
	 * @param msg
	 * @return
	 */
	public void requestSuccess(String msg, Integer code ,Object data) {
		Map<String, Object> res = new HashMap<String, Object>();
		res.put("msg", msg);
		res.put("code", code);
		res.put("data", data);
		this.renderJson(res);
	}


	/**
	 * 错误
	 *
	 * @return
	 */
	public void requestFailure(StatusType state) {
		Map<String, Object> res = new HashMap<String, Object>();
		res.put("msg", state.msg);
		res.put("code", state.id);
		this.renderJson(res);
	}
	public void requestFailure(String msg) {
		Map<String, Object> res = new HashMap<String, Object>();
		res.put("msg", msg);
		res.put("code", 0);
		this.renderJson(res);
	}

	public String requestFailure(StatusType state, Object data) {
		Map<String, Object> res = new HashMap<String, Object>();
		res.put("msg", state.msg);
		res.put("code", state.id);
		res.put("data", data);
		log.error("Error:[" + JsonKit.toJson(res) + "]");
		return JsonKit.toJson(res);
	}



	public Float getParaToFloat(String pname) {
		return toFloat(getPara(pname), 0f);
	}

	private Float toFloat(String value, Float defaultValue) {
		try {
			if (value == null || "".equals(value.trim()))
				return defaultValue;
			value = value.trim();
			return Float.parseFloat(value);
		} catch (Exception e) {
			throw new ActionException(404, renderManager.getRenderFactory()
					.getErrorRender(404), "Can not parse the parameter \""
					+ value + "\" to Long value.");
		}
	}


	public String getClientIp() {

		String ip = getRequest().getHeader("x-forwarded-for");
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = getRequest().getHeader("Proxy-Client-IP");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = getRequest().getHeader("WL-Proxy-Client-IP");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = getRequest().getHeader("HTTP_CLIENT_IP");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = getRequest().getHeader("HTTP_X_FORWARDED_FOR");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = getRequest().getRemoteAddr();
		}

		if (ip != null && ip.contains(",")) {
			ip = ip.split(",")[0];
		}
		return ip;

	}

	public String getFullURL() {
		String url = getRequest().getScheme() + "://"; // 请求协议 http 或 https
		url += getRequest().getHeader("host"); // 请求服务器
		url += getRequest().getRequestURI(); // 工程名
		if (getRequest().getQueryString() != null) // 判断请求参数是否为空
			url += "?" + getRequest().getQueryString(); // 参数
		return url;
	}


	public void paySuccess() {
		this.render("/paySuccess.html");
	}


	public void payWaitResult() {
		this.render("/waitResult.html");
	}


}
