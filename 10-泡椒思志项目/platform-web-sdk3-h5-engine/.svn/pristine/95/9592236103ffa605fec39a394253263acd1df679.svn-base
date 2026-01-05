package com.paojiao.sdk3.common.util;

import java.net.InetAddress;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;


public class IpUtils {
	
	
	private static final String DEFAULT_ADDR_NAME="椒友";

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		String where = getCityAddressOfIp("192.168.1.185");
		System.out.println("#####" + where);
		System.out.println(formatCity(where));
		
		// TODO Auto-generated method stub
		InetAddress ia=null;
		try {
			ia=ia.getLocalHost();
			
			String localname=ia.getHostName();
			String localip=ia.getHostAddress();
			System.out.println("本机名称是："+ localname);
			System.out.println("本机的ip是 ："+localip);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public static String getIp() {
		InetAddress ia=null;
		String localip = "";
		try {
			ia=ia.getLocalHost();
			
			String localname=ia.getHostName();
			localip = ia.getHostAddress();
		//	System.out.println("本机名称是："+ localname);
		//	System.out.println("本机的ip是 ："+localip);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return localip;
	}

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

        if (ip !=  null && ip.contains(",")) {
			ip=ip.split(",")[0];
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

}
