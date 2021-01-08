package com.paojiao.sdk3.common.util;

import org.apache.log4j.Logger;

import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.SocketTimeoutException;
import java.net.URL;
import java.util.Map;


public class HttpUrlUtil {

	private static Logger log = Logger.getLogger(HttpUrlUtil.class);

	/**
	 * 简单地获取url的响应参数.
	 * @param httpUrl
	 * @return
	 * @throws IOException
	 * @throws SocketTimeoutException
	 */
	public static int getResponseCode(String httpUrl) throws IOException,SocketTimeoutException  {

		HttpURLConnection conn=null;

		try{

	        URL url = new URL(httpUrl);//获取到路径
	        conn = (HttpURLConnection) url.openConnection();
	        conn.setRequestMethod("GET");
	        //10秒超时
	        conn.setConnectTimeout(10 * 1000);
	        //别超过10秒。
	        return conn.getResponseCode();

		}finally{
			conn.disconnect();
		}
    }



	/**
	 * 获取服务器响应代码
	 * @param httpUrl
	 * @param params
	 * @return
	 * @throws IOException
	 * @throws SocketTimeoutException
	 */
	public static int getResponseCode(String httpUrl,Map<String,Object> params) throws IOException,SocketTimeoutException  {


		HttpURLConnection conn=null;

		try{

			//拼合参数
			StringBuffer sb = new StringBuffer("?a=1");
			for (String key : params.keySet()) {

				try{
					sb.append("&" + key + "=" + params.get(key).toString());
				}catch(Exception ex){
					continue;
				}
			}

			// 组合参数
			String paramedUrl = httpUrl + sb.toString();

			URL url = new URL(paramedUrl);
			conn = (HttpURLConnection) url.openConnection();
			conn.setRequestMethod("POST");
			// 10秒超时
			conn.setConnectTimeout(30 * 1000);
			int code = conn.getResponseCode();
			log.error("current response code is:"+code);
			conn.disconnect();
			return code;

		}finally{

			conn.disconnect();
		}
    }

	public static byte [] readByteFromUrl(String urlAddr) {

		try{
		 	URL url = new URL(urlAddr);//获取到路径
	        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
	        conn.setRequestMethod("GET");// 这里是不能乱写的，详看API方法
	        conn.setConnectTimeout(10 * 1000);

	        if (conn.getResponseCode() == 200) {
	            InputStream inputStream = conn.getInputStream();
	            byte[] data = readStream(inputStream);
	            return data;
	        }
		}catch(Exception ex){

		}

       return null;

    }

	// 读取的方法
    public static byte[] readStream(InputStream inStream) throws IOException  {
        ByteArrayOutputStream outstream = new ByteArrayOutputStream();
        byte[] buffer = new byte[1024]; // 用数据装
        int len = -1;
        while ((len = inStream.read(buffer)) != -1) {
            outstream.write(buffer, 0, len);
        }
        outstream.close();
        inStream.close();

        String content=new String(outstream.toByteArray(),0,outstream.toByteArray().length,"utf-8");
        return content.getBytes();
    }


    /**
     * 从URL中读取数据；
     * @param urlAddr
     * @return
     */
    public static String readStringFromUrl(String url) {
    	return readStringFromUrl(url,"GBK");
    }

    /**
     * 从URL中读取数据;
     * @param url
     * @return
     */
    public static String readString(String url) {
		return readStringFromUrl(url,"UTF-8");
    }


    /**
     * 公共方法，从URL读取响应数据
     * @param url
     * @param charSet
     * @return
     */
    public static String readStringFromUrl(String url,String charSet){

    	return readStringFromUrl(url,charSet,"GET");
    }

    /**
     * 公共方法，从URL读取响应数据
     * @param url
     * @param charSet
     * @return
     */
    public static String readStringFromUrl(String url,String charSet,String method){


    		try{

    			URL _url = new URL(url);//获取到路径
      	        HttpURLConnection conn = (HttpURLConnection) _url.openConnection();
      	        conn.setRequestMethod(method);//以POST方式提交
      	        conn.setConnectTimeout(10 * 1000);//10秒超时
      	        conn.setUseCaches(false);//禁用缓存

      	        if (conn.getResponseCode() == 200) {

    				//得到读取的内容(流)
    				InputStreamReader in=new InputStreamReader(conn.getInputStream(),charSet);
    				//为输出创建BufferedReader
    				BufferedReader buffer = new BufferedReader(in);
    				String line = null;
    				StringBuffer sb=new StringBuffer();
    				//使用循环来读取获得的数据
    				while (((line = buffer.readLine()) != null)){
    					//以行的方式读取
    					sb.append(line);
    				}
    				//关闭读取器
    				in.close();
    				//关闭连接
    				conn.disconnect();
    				//返回读取的字符串
    				return sb.toString();
      	        }

    		}catch(MalformedURLException e ){

    		}catch(IOException e){

    		}

    		return "";


    }




    public static String post(){


    	return "";
    }

    public static void main(String[] args) {

    	System.out.println(readStringFromUrl("http://58.215.179.88/game/youxia/conf.json","UTF-8"));
	}

}
