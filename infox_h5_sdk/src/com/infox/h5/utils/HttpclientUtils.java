package com.infox.h5.utils;

import java.io.IOException;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.security.cert.CertificateException;
import java.security.cert.X509Certificate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import org.apache.http.HttpEntity;
import org.apache.http.NameValuePair;
import org.apache.http.client.HttpRequestRetryHandler;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.config.Registry;
import org.apache.http.config.RegistryBuilder;
import org.apache.http.conn.socket.ConnectionSocketFactory;
import org.apache.http.conn.socket.PlainConnectionSocketFactory;
import org.apache.http.conn.ssl.NoopHostnameVerifier;
import org.apache.http.conn.ssl.SSLConnectionSocketFactory;
import org.apache.http.conn.ssl.TrustStrategy;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.impl.conn.PoolingHttpClientConnectionManager;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.ssl.SSLContextBuilder;
import org.apache.http.util.EntityUtils;
import org.apache.log4j.Logger;


import javax.net.ssl.HostnameVerifier;
import javax.net.ssl.SSLContext;


/**
 * Description:
 * @author 156
 * @version 1.0
 * <pre>
 * Modification History:
 * Date         Author      Version     Description
------------------------------------------------------------------
 * 2017年6月21日    156       1.0        1.0 Version
 * </pre>
 */

public class HttpclientUtils {
	
	public static final Logger log = Logger.getLogger(HttpclientUtils.class);

	private int connectTimeout = 5000; // 5s
	private int socketTimeout = 5000; // 5s

	private static HttpclientUtils instance;

	private CloseableHttpClient httpClient;
	private HttpclientUtils() {

	}

	public static HttpclientUtils getInstance() {
		if (instance == null) {
			instance = new HttpclientUtils();

		}
		return instance;
	}
	public static HttpclientUtils newInstance() {
		return new HttpclientUtils();
	}
	public  String HttpGet(String url ,Map<String,Object> paramMap,Map<String,String> resposeMap , Map<String,String> requestMap ){
		if (this.httpClient == null){
			init();
		}
		if(paramMap!=null && paramMap.size()>0){
			String params = "";
			for(Map.Entry<String, Object> entry:paramMap.entrySet()){
				params +="&"+entry.getKey()+"="+entry.getValue();
			}
			params = params.substring(1);
			url+="?"+params;
		}
		log.info("请求url:====>" + url);
		url = url.replaceAll(" ", "%20");
		HttpGet httpGet = new HttpGet(url);
		if(requestMap!=null && requestMap.size()>0){
			for(Map.Entry<String, String> entry:requestMap.entrySet()){
				httpGet.setHeader(entry.getKey(),entry.getValue());
			}
		}
		
		
		CloseableHttpClient client = HttpClients.createDefault();
		CloseableHttpResponse response = null;
		try {
			
			response = client.execute(httpGet);
			if(resposeMap!=null && resposeMap.size()>0){
				for(Map.Entry<String, String> entry:resposeMap.entrySet()){
					response.setHeader(entry.getKey(),entry.getValue());
				}
			}
			
			String str = EntityUtils.toString(response.getEntity(), "utf-8");
			return str;
		} catch (Exception e) {
			e.printStackTrace();
			return "";
		} finally {
			if (response != null) {
				try {
					response.close();
				} catch (IOException e) {
					e.printStackTrace();
					return "";
				}
			}
			if (client != null) {
				try {
					client.close();
				} catch (IOException e) {
					e.printStackTrace();
					return "";
				}
			}
		}
	}
	public  String HttpPost(String url ,Map<String,Object> paramMap,Map<String,String> resposeMap , Map<String,String> requestMap ){

		if (this.httpClient == null) {
			init();
		}
	 	HttpPost httpPost = new HttpPost(url);
	 	List<NameValuePair> params = new ArrayList<NameValuePair>();
	 	if(paramMap!=null){
	 		for(Map.Entry<String, Object> entry : paramMap.entrySet()){
	 			params.add(new BasicNameValuePair(entry.getKey(), entry.getValue().toString()));
	 		}
	 	}
		CloseableHttpClient client = null;
		CloseableHttpResponse response = null;
		try {
			if(requestMap!=null){
			for(Map.Entry<String, String> entry:requestMap.entrySet()){
				httpPost.setHeader(entry.getKey(),entry.getValue());
			}
			}

			client = HttpClients.createDefault();
			
			httpPost.setEntity(new UrlEncodedFormEntity(params,
					"utf-8"));
			
			
			response = client.execute(httpPost);

			if(resposeMap!=null){
			for(Map.Entry<String, String> entry:resposeMap.entrySet()){
				response.setHeader(entry.getKey(),entry.getValue());
			}
			}

			try {

					HttpEntity httpEntity = response.getEntity();
					if(httpEntity!=null){
						String str = EntityUtils.toString(httpEntity, "utf-8");
						return str;
					}else {
						return "";
					}
				}catch (Exception e) {
					e.printStackTrace();
					return "";
				}finally {  
					response.close();  
				}
		} catch (Exception e) {
				e.printStackTrace();
				return "";
		}finally {
			if(client!=null){
				try {
					client.close();
				} catch (IOException e) {
					e.printStackTrace();
					return "";
				}
			}
		}
	}





	// 初始化， 创建httpclient实例 ~~~~~
	private void init() {

		RequestConfig requestConfig = RequestConfig.custom()
				.setConnectTimeout(connectTimeout)
				.setSocketTimeout(socketTimeout).setExpectContinueEnabled(true)
				.build();

		/*HttpRequestRetryHandler retryHandler = new HttpRequestRetryHandler() {
			@Override
			public boolean retryRequest(IOException e, int retryNum,
										HttpContext httpContext) {

				if (retryNum >= 3) {
					return false;
				}

				if (e instanceof org.apache.http.NoHttpResponseException
						|| e instanceof org.apache.http.client.ClientProtocolException) {

					return true;
				}

				return false;
			}
		};*/

		try {
			SSLContext sslContext = new SSLContextBuilder().loadTrustMaterial(
					null, new TrustStrategy() {
						// 信任所有
						@Override
						public boolean isTrusted(X509Certificate[] chain,
												 String authType) throws CertificateException {
							return true;
						}
					}).build();

			HostnameVerifier hostnameVerifier = NoopHostnameVerifier.INSTANCE;
			SSLConnectionSocketFactory sslFactory = new SSLConnectionSocketFactory(
					sslContext, hostnameVerifier);

			Registry<ConnectionSocketFactory> socketFactoryRegistry = RegistryBuilder
					.<ConnectionSocketFactory> create()
					.register("http",
							PlainConnectionSocketFactory.getSocketFactory())
					.register("https", sslFactory).build();

			PoolingHttpClientConnectionManager connMgr = new PoolingHttpClientConnectionManager(
					socketFactoryRegistry);

			HttpClientBuilder builder = HttpClients.custom()
					.setDefaultRequestConfig(requestConfig)
					.setSslcontext(sslContext).setConnectionManager(connMgr);
					//.setRetryHandler(retryHandler);

			this.httpClient = builder.build();

		} catch (Exception e) {
			e.printStackTrace();
		}

	}

}
