package com.paojiao.sdk3.common.util.email;

import com.jfinal.kit.JsonKit;
import com.paojiao.sdk3.common.PjConstants;
import com.paojiao.sdk3.common.util.email.StatHandler;
import org.apache.log4j.Logger;

import java.util.HashSet;
import java.util.Map;
import java.util.Set;

/**
 * 工具类
 * @author zhouzhenyi
 * @date 2017年2月9日
 */
public class PjSdkUtil {

	public static final Logger log = Logger.getLogger(PjSdkUtil.class);

	private static StatHandler statHandler = new StatHandler();




	/**
	 * 根据sdk实现类，判断是否属于泡椒sdk
	 * @param implClass
	 * @return
	 */
	public static boolean  isPjSdk(String implClass){
        if(PjConstants.PJSDK_ITF_IMPL_CLASS.equals(implClass)){
        	return true;
        }
		return false;
	}


	/**
	 * 发送苹果审核通知邮件
	 * @param report
	 */
	public static void sendReviewEmail(String ip,Map<String,Object> report){
		try {
				Set<String> mailTo = new HashSet<String>();
				mailTo.add("tangqiuyan@paojiao.cn");
				mailTo.add("zhouzhenyi@paojiao.cn");
				mailTo.add("liunengfu@paojiao.cn");
				mailTo.add("maoyating@paojiao.cn");
				mailTo.add("zhangjinhao@paojiao.cn");
				mailTo.add("chenmo@paojiao.cn");
				//mailTo.add("jiangkun@paojiao.cn");

				//异步发送邮件
				statHandler.sendReviewEmail("苹果审核提醒", mailTo, JsonKit.toJson(report));
		}catch (Exception e){
			log.error("发送苹果审核通知邮件异常",e);
		}
	}


}
