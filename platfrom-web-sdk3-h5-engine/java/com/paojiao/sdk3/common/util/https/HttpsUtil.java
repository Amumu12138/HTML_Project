package com.paojiao.sdk3.common.util.https;

import org.apache.commons.httpclient.DefaultHttpMethodRetryHandler;
import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.HttpStatus;
import org.apache.commons.httpclient.NameValuePair;
import org.apache.commons.httpclient.methods.PostMethod;
import org.apache.commons.httpclient.params.HttpMethodParams;
import org.apache.commons.httpclient.protocol.Protocol;

import javax.net.ssl.*;
import javax.servlet.http.HttpServletRequest;
import java.util.Iterator;
import java.util.Map;


public class HttpsUtil {

    // 编码方式
    private static final String CONTENT_CHARSET = "UTF-8";

    // 连接超时时间
    private static final int CONNECTION_TIMEOUT = 10000;

    // 读数据超时时间
    private static final int READ_DATA_TIMEOUT = 10000;

    /**
     * 发送POST请求
     *
     * @param url 请求URL地址
     * @param params 请求参数
     * @return 服务器响应的请求结果
     */
    public static String post(String url, Map params, HttpServletRequest request){

        try
        {

        if (url.startsWith("https"))
        {
            Protocol httpsProtocol = new Protocol("https",
                    new MySecureProtocolSocketFactory(), 443);
            Protocol.registerProtocol("https", httpsProtocol);
        }

        HttpClient httpClient = new HttpClient();
        PostMethod postMethod = new PostMethod(url);


        // 设置请求参数
        if (params != null && !params.isEmpty())
        {
            NameValuePair[] data = new NameValuePair[params.size()];

            Iterator iter = params.entrySet().iterator();
            int i=0;
            while (iter.hasNext())
            {
                Map.Entry entry = (Map.Entry) iter.next();
                data[i] = new NameValuePair(entry.getKey()+"",entry.getValue()+"");
                ++i;
            }

            postMethod.setRequestBody(data);
        }


        if (request != null) {
            postMethod.setRequestHeader("x-forwarded-for", getClientIp(request));
            postMethod.setRequestHeader("User-Agent", request.getHeader("User-Agent"));
        }

        // 设置建立连接超时时间
        httpClient.getHttpConnectionManager().getParams().setConnectionTimeout(CONNECTION_TIMEOUT);

        // 设置读数据超时时间
        httpClient.getHttpConnectionManager().getParams().setSoTimeout(READ_DATA_TIMEOUT);

        // 设置编码
        postMethod.getParams().setParameter(HttpMethodParams.HTTP_CONTENT_CHARSET,
                CONTENT_CHARSET);

        //使用系统提供的默认的恢复策略
        postMethod.getParams().setParameter(HttpMethodParams.RETRY_HANDLER,
                new DefaultHttpMethodRetryHandler());

            try
            {
                int statusCode = httpClient.executeMethod(postMethod);

                if (statusCode == HttpStatus.SC_OK)
                {
                    //读取内容
                    byte[] responseBody = postMethod.getResponseBody();
                    return new String(responseBody, CONTENT_CHARSET);
                }
            }
            finally
            {
                //释放链接
                postMethod.releaseConnection();
            }
        }
        catch (Exception e)
        {
            e.printStackTrace();
        }

        return null;
    }




    private static final String getClientIp(HttpServletRequest request) {

        String ip = request.getHeader("x-forwarded-for");
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("Proxy-Client-IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("WL-Proxy-Client-IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("HTTP_CLIENT_IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("HTTP_X_FORWARDED_FOR");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getRemoteAddr();
        }

        if (ip !=  null && ip.contains(",")) {
            ip=ip.split(",")[0];
        }
        return ip;
    }


    public static void ignoreSSL(){

        try {

            SSLContext sslcontext = SSLContext.getInstance("SSL");

            sslcontext.init(null, new TrustManager[]{new MyX509TrustManager()}, new java.security.SecureRandom());
            HostnameVerifier ignoreHostnameVerifier = new HostnameVerifier() {
                public boolean verify(String s, SSLSession sslsession) {
                    return true;
                }
            };

            HttpsURLConnection.setDefaultHostnameVerifier(ignoreHostnameVerifier);
            HttpsURLConnection.setDefaultSSLSocketFactory(sslcontext.getSocketFactory());
        }catch (Exception e){
            e.printStackTrace();
        }

    }


}
