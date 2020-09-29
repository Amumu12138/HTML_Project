/*
 * Copyright (C) 2006-2017 深圳泡椒思志信息技术有限公司.

 * 未经允许，允许将代码透露给第三方机构或个人
 * --------------------------------------------------------------------
 * ProjectName: infox_game_merge_sdk

 * FileName: HttpAgents.java

 * Created: [2017年11月1日 下午5:10:27] by 156

 * Description:
 * --------------------------------------------------------------------*/

package com.paojiao.sdk3.controller.thirdsdk;


import com.alibaba.fastjson.JSONObject;
import org.apache.commons.io.IOUtils;
import org.apache.http.Header;
import org.apache.http.HttpEntity;
import org.apache.http.NameValuePair;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.message.BasicHeader;
import org.apache.http.message.BasicNameValuePair;
import org.apache.log4j.Logger;

import java.io.*;
import java.net.SocketException;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;
import java.nio.charset.Charset;
import java.util.*;


/**
 * Description:
 * 
 * @author 156
 * @version 1.0
 * 
 *          <pre>
 * Modification History:
 * Date         Author      Version     Description
 * ------------------------------------------------------------------
 * 2017年11月1日    156       1.0        1.0 Version
 *          </pre>
 */

public class HttpAgents {

	private static Logger log = Logger.getLogger(HttpAgents.class);

	public static String get(String url) {
		return get(url, null, null, "utf-8");
	}

	public static String get(String url, Map<String, String> params) {

		return get(url, null, params, "utf-8");
	}

	public static String get(String url, Map<String, String> params, String encoding) {

		return get(url, null, params, encoding);
	}

	public static String get(String url, Map<String, String> headers, Map<String, String> params) {
		return get(url, headers, params, "utf-8");
	}

	public static void get(String url, Map<String, String> params, HttpFutureCallback callback) {

		String result = get(url, null, params, "utf-8");
		if (result == null || "".equals(result)) {
			callback.failed(url + ":FAIL");
		} else {
			callback.completed(result);
		}
	}

	public static void get(String url, Map<String, String> headers, Map<String, String> params, HttpFutureCallback callback) {

		String result = get(url, headers, params, "utf-8");
		if (result == null || "".equals(result)) {
			callback.failed(url + ":FAIL");
		} else {
			callback.completed(result);
		}
	}

	public static String get(String url, Map<String, String> headers, Map<String, String> params, String encoding) {

		CloseableHttpClient httpClient = HttpPooling.getHttpPooling().getHttpClient();
		String fullUrl = url;
		String urlParams = parseGetParams(params, encoding);

		if (urlParams != null) {
			if (url.contains("?")) {
				fullUrl = url + "&" + urlParams;
			} else {
				fullUrl = url + "?" + urlParams;
			}
		}
		//log.info("HttpAgents fullUrl:" + fullUrl.trim());
		HttpGet getReq = new HttpGet(fullUrl.trim());

		if (headers == null) {
			headers = new HashMap<String, String>();
			headers.put("Content-Type", "application/json");
		}
		getReq.setHeaders(parseHeaders(headers));
		CloseableHttpResponse response = null;
		String str = null;
		try {
			if (httpClient == null) {
				log.info("HttpAgents httpClient is null");
			}
			try {
				response = httpClient.execute(getReq);
				if (response == null) {
					log.info("HttpAgents response is null");
				}
				if (response.getStatusLine().getStatusCode() != 200) {
					log.info("连接失败，状态码：————————————————————————"+response.getStatusLine().getStatusCode());
					getReq.abort();
					return null;
				}

			} catch (SocketException e) {
				log.error("请求异常SocketException", e);
				getReq.abort();
				return null;
			}
			InputStream in = response.getEntity().getContent();
			str = IOUtils.toString(in);
			in.close();

		} catch (ClientProtocolException e) {
			log.error("请求异常ClientProtocolException", e);
			getReq.abort();
			e.printStackTrace();
		} catch (IOException e) {
			log.error("请求异常IOException", e);
			getReq.abort();
			e.printStackTrace();

		} finally {
			try {
				if (response != null) {
					response.close();
				}
			} catch (IOException e) {
				e.printStackTrace();
			}
		}

		return str;
	}

	public static String post(String url, Map<String, String> params) {
		UrlEncodedFormEntity entity = getPairList(params);
		return post(url, null, entity, "UTF-8");
	}

	public static String post(String url,Map<String, String> headers,Map<String, String> params, String encoding) {

		UrlEncodedFormEntity entity = getPairList(params);
		return post(url, headers, entity, encoding);
	}

	public static String post(String url,Map<String, String> headers,Map<String, String> params) {

		UrlEncodedFormEntity entity = getPairList(params);
		return post(url, headers, entity, "UTF-8");
	}


	public static void post(String url, Map<String, String> params, HttpFutureCallback callback) {
		UrlEncodedFormEntity entity = getPairList(params);
		String result = "";
		try {
			result = post(url, null, entity, "UTF-8");
		} catch (Exception e) {
			log.error("post请求失败！url："+url+", 请求参数："+ JSONObject.toJSON(params), e);
		}
		if (result == null || "".equals(result)) {
			callback.failed(url + ":FAIL");
		} else {
			callback.completed(result);
		}

	}

	public static void post_str(String url, String params, HttpFutureCallback callback) {
		StringEntity entity = new StringEntity(params, "UTF-8");
		Map<String, String> headers = new HashMap<String, String>();
		headers.put("Content-Type", "application/json");
		String result = post(url, headers, entity, "UTF-8");
		if (result == null || "".equals(result)) {
			callback.failed(url + ":FAIL");
		} else {
			callback.completed(result);
		}

	}

	public static void post_str_hearder(String url, String params, Map<String, String> headers, HttpFutureCallback callback) {
		StringEntity entity = new StringEntity(params, "UTF-8");
		headers.put("Content-Type", "application/json");
		String result = post(url, headers, entity, "UTF-8");
		if (result == null || "".equals(result)) {
			callback.failed(url + ":FAIL");
		} else {
			callback.completed(result);
		}

	}


	/**
	 * 
	 * Description: post JSON 格式发送
	 * @param
	 * @return String
	 * @throws
	 * @Author 156
	 * Create Date: 2020年06月15日 下午2:21:27
	 */
	public static String post(String url,Map<String, String> headers,String json){
		return post(url, headers, new StringEntity(json, Charset.forName("UTF-8")), "UTF-8");
	}


	public static String post(String url, Map<String, String> headers, HttpEntity entity, String encoding) {

		HttpPost httpPost = new HttpPost(url);
		CloseableHttpResponse response = null;
		httpPost.setHeaders(parseHeaders(headers));
		CloseableHttpClient httpClient = HttpPooling.getHttpPooling().getHttpClient();
		httpPost.setEntity(entity);
		String str =null;
		try {

			try {
				response = httpClient.execute(httpPost);
				if (response.getStatusLine().getStatusCode() != 200) {
					log.info("请求失败，状态码："+response.getStatusLine().getStatusCode());
					httpPost.abort();
					return null;
				}

			} catch (SocketException e) {
				httpPost.abort();
				return null;
			}

			InputStream in = response.getEntity().getContent();
			str = IOUtils.toString(in);
			in.close();

		} catch (ClientProtocolException e) {
			e.printStackTrace();
			httpPost.abort();
		} catch (IOException e) {
			e.printStackTrace();
			httpPost.abort();
		} finally {
			try {
				if (response != null) {
					response.close();
				}
				if (httpClient != null) {
					// httpClient.close();
				}
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return str;
	}

	public static UrlEncodedFormEntity getPairList(Map<String, String> params) {

		List<NameValuePair> pairs = new ArrayList<NameValuePair>();
		if (params != null) {

			for (String key : params.keySet()) {
				pairs.add(new BasicNameValuePair(key, params.get(key)));
			}
		}

		return new UrlEncodedFormEntity(pairs, Charset.forName("UTF-8"));

	}

	// 解析请求头
	private static Header[] parseHeaders(Map<String, String> headers) {
		if (null == headers || headers.isEmpty()) {
			return getDefaultHeaders();
		}

		Header[] hs = new BasicHeader[headers.size()];
		int i = 0;
		for (String key : headers.keySet()) {
			hs[i] = new BasicHeader(key, headers.get(key));
			i++;
		}

		return hs;
	}

	// 获取默认的请求头
	private static Header[] getDefaultHeaders() {
		Header[] hs = new BasicHeader[2];
		hs[0] = new BasicHeader("Content-Type", "application/x-www-form-urlencoded");
		hs[1] = new BasicHeader("User-Agent",
				"Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/33.0.1750.146 Safari/537.36");
		return hs;
	}

	private static String parseGetParams(Map<String, String> data, String encoding) {
		if (data == null || data.size() <= 0) {
			return null;
		}

		StringBuilder result = new StringBuilder();

		Iterator<String> keyItor = data.keySet().iterator();
		while (keyItor.hasNext()) {
			String key = keyItor.next();
			String val = data.get(key);

			try {
				result.append(key).append("=").append(URLEncoder.encode(val, encoding).replace("+", "%2B")).append("&");
			} catch (UnsupportedEncodingException e) {
				e.printStackTrace();
			}
		}

		return result.deleteCharAt(result.length() - 1).toString();

	}

	/**
	 * post请求url后跟拼接参数
	 * 
	 */
	public static String sendPost(String url, String param, HttpFutureCallback callback) {
		PrintWriter out = null;
		BufferedReader in = null;
		String result = "";
		try {
			URL realUrl = new URL(url);
			//打开链接之前忽略https所有证书
            if("https".equalsIgnoreCase(realUrl.getProtocol())){
                SslUtils.ignoreSsl();
            }
			// 打开和URL之间的连接
			URLConnection conn = realUrl.openConnection();
			// 设置通用的请求属性
			conn.setRequestProperty("accept", "*/*");
			conn.setRequestProperty("connection", "Keep-Alive");
			conn.setRequestProperty("user-agent",
					"Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1;SV1)");
			// conn.setRequestProperty("Content-Type","application/x-www-form-urlencoded;charset=utf-8");
			// 发送POST请求必须设置如下两行
			conn.setDoOutput(true);
			conn.setDoInput(true);
			// 获取URLConnection对象对应的输出流
			out = new PrintWriter(conn.getOutputStream());
			// 发送请求参数
			out.print(param);
			// flush输出流的缓冲
			out.flush();
			// 定义BufferedReader输入流来读取URL的响应
			in = new BufferedReader(new InputStreamReader(
					conn.getInputStream(), "utf-8"));
			String line;
			while ((line = in.readLine()) != null) {
				result += line;
			}
			if (result == null || "".equals(result)) {
				callback.failed(url + ":FAIL");
			} else {
				callback.completed(result);
			}
		} catch (Exception e) {
			log.error("发送 POST 请求出现异常", e);
		}
		// 使用finally块来关闭输出流、输入流
		finally {
			try {
				if (out != null) {
					out.close();
				}
				if (in != null) {
					in.close();
				}
			} catch (IOException ex) {
				log.error("IOException异常", ex);
			}
		}
		return result;
	}

}
