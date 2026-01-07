/*
 * Copyright (C) 2006-2017 深圳泡椒思志信息技术有限公司.

 * 未经允许，允许将代码透露给第三方机构或个人
 * --------------------------------------------------------------------
 * ProjectName: infox_game_merge_sdk

 * FileName: HttpAgents.java

 * Created: [2017年11月1日 下午4:45:22] by 156

 * Description:
 * --------------------------------------------------------------------*/

package com.paojiao.sdk3.controller.thirdsdk;

import org.apache.http.client.HttpRequestRetryHandler;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.config.Registry;
import org.apache.http.config.RegistryBuilder;
import org.apache.http.conn.socket.ConnectionSocketFactory;
import org.apache.http.conn.socket.PlainConnectionSocketFactory;
import org.apache.http.conn.ssl.NoopHostnameVerifier;
import org.apache.http.conn.ssl.SSLConnectionSocketFactory;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.impl.conn.PoolingHttpClientConnectionManager;
import org.apache.http.protocol.HttpContext;
import org.apache.http.ssl.SSLContextBuilder;
import org.apache.http.ssl.TrustStrategy;

import javax.net.ssl.HostnameVerifier;
import javax.net.ssl.SSLContext;
import java.io.IOException;
import java.security.KeyManagementException;
import java.security.KeyStoreException;
import java.security.NoSuchAlgorithmException;
import java.security.cert.CertificateException;
import java.security.cert.X509Certificate;

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
 * </pre>
 */

public class HttpPooling {

	private static PoolingHttpClientConnectionManager clientConnectionManager = null;
	private static CloseableHttpClient httpClient;
	private static HttpPooling httpPooling;
	
	static{
		init();
	}
	
	private HttpPooling(){
		
	}
	
	public static HttpPooling getHttpPooling(){
		if(httpPooling == null){
			httpPooling = new HttpPooling();
		}
		return httpPooling;
	}

	public  void close() {
		clientConnectionManager.close();
	}
	
	public static  void init(){
		
		
		
		SSLContext sslContext = null;
		try {
			sslContext = new SSLContextBuilder().loadTrustMaterial(
					null, new TrustStrategy() {
						// 信任所有
						@Override
						public boolean isTrusted(X509Certificate[] chain,
								String authType) throws CertificateException {
							return true;
						}
					}).build();
		} catch (KeyManagementException e1) {
			e1.printStackTrace();
		} catch (NoSuchAlgorithmException e1) {
			e1.printStackTrace();
		} catch (KeyStoreException e1) {
			e1.printStackTrace();
		}

		HostnameVerifier hostnameVerifier = NoopHostnameVerifier.INSTANCE;
		SSLConnectionSocketFactory sslFactory = new SSLConnectionSocketFactory(
				sslContext, hostnameVerifier);

		Registry<ConnectionSocketFactory> socketFactoryRegistry = RegistryBuilder
				.<ConnectionSocketFactory> create()
				.register("http",
						PlainConnectionSocketFactory.getSocketFactory())
				.register("https", sslFactory).build();
		
		clientConnectionManager = new PoolingHttpClientConnectionManager(socketFactoryRegistry);
		clientConnectionManager.setMaxTotal(200);
		clientConnectionManager.setDefaultMaxPerRoute(20);
		
		
		
		
		
	}
	
	public CloseableHttpClient createHttpClient() {
		
		
		RequestConfig requestConfig = RequestConfig.custom()
		        .setConnectTimeout(60000).setConnectionRequestTimeout(60000)    
		        .setSocketTimeout(60000).build();
		
		
		HttpRequestRetryHandler retryHandler = new HttpRequestRetryHandler() {
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
		};
		
		httpClient = HttpClients.custom().setConnectionManager(clientConnectionManager).setDefaultRequestConfig(requestConfig).setRetryHandler(retryHandler).build();
		return httpClient;

	}
	
	public CloseableHttpClient getHttpClient() {
		if(httpClient == null) {
			return createHttpClient();
		}else {
			return httpClient;
		}
	}

}
