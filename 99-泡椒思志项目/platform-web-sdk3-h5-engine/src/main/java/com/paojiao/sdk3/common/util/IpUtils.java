package com.paojiao.sdk3.common.util;

import com.paojiao.sdk3.controller.thirdsdk.HttpAgent;
import org.apache.commons.lang.StringUtils;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;


public class IpUtils {
	
	
	private static final String DEFAULT_ADDR_NAME="椒友";

	/**
	 * @param args
	 */
	/*public static void main(String[] args) {
		String where = getCityAddressOfIp("61.141.65.75");
		System.out.println("#####" + where);
		System.out.println(formatCity(where));
	}*/

	public static String getAddressOfIp(String ip) {
		try {
			String url="http://whois.pconline.com.cn/ip.jsp?ip=" + ip;
			String str =HttpUrlUtil.readStringFromUrl(url);

			
			System.out.println("======="+ip+"对应："+str);
			
			int index=str.indexOf(" ");
			
			if(index!=-1){
				return str.substring(0,index)+" 椒友";
			}
			return str+" 椒友";
		} catch (Exception e) {
			return DEFAULT_ADDR_NAME;
		}
	}
	
	public static String getCityAddressOfIp(String ip) {
		try {
			String url="http://whois.pconline.com.cn/ip.jsp?ip=" + ip;
			String str =HttpUrlUtil.readStringFromUrl(url);
			
//			System.out.println("++=ip对应："+str);
			
			int index=str.indexOf(" ");
			
			if(index!=-1){
				return formatCity(str.substring(0,index));
			}
			return str;
		} catch (Exception e) {
			return null;
		}
	}
	private static String formatCity(String address){
		String city = null;
		int sindex=address.indexOf("省");
		if(sindex!=-1 && sindex<address.length()-1){
			city = address.substring(sindex+1);
			int cindex=city.indexOf("市");
			if(cindex!=-1 && cindex<city.length()){
				city = city.substring(0,cindex);
			}
			return city;
		}
		return address;
	}
	
	
	public static final String getClientIp(HttpServletRequest request) {

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
		return ip;

	}
	
	
	public static String getCityAddressOfIp(HttpServletRequest request) {
		String ip = getClientIp(request);
		String address = "椒友";
		if(StringUtils.isNotBlank(ip)){
			address = getCityAddressOfIp(ip);
		}
		
		return address;
	}

	public static void main(String[] args) {
		String url = "https://sdk2.paojiao.cn/sdk/sdkConfig";
		Map<String,String> map = new HashMap<>();
		map.put("gameId","3058");
		map.put("channel","11");
		map.put("sdkVersion","2.0.0");
		map.put("token","6ODIVB5sKdsBKEHjZO48yuHowz7HFP1c");
		map.put("appVersion","1.0.0");
		/*map.put("idfa","");
		map.put("udid","");
		map.put("imei","");
		map.put("mac","");
		map.put("tBrand","");
		map.put("channelGameId","");*/
		String result = HttpAgent.newInstance().post(url,map);
		System.out.println(result);
	}

}
