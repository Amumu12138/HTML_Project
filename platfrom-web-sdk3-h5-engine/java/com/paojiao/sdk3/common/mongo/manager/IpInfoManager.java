package com.paojiao.sdk3.common.mongo.manager;


import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;
import com.paojiao.sdk3.common.PjConstants;
import com.paojiao.sdk3.common.mongo.MongoCollection;
import com.paojiao.sdk3.common.mongo.util.BeanAndDBObjectUtil;
import com.paojiao.sdk3.model.pojo.IpInfoEntity;
import org.apache.log4j.Logger;

/**
 * 用户ip信息管理
 * @author zhouzhenyi
 * @date 2017年5月5日
 */
public class IpInfoManager {


	public static final Logger log = Logger.getLogger(IpInfoManager.class);


       private static final String COLLECTION_NAME = "ipInfo";

       private static MongoCollection collection;

	/** 应用的单例 */
	private static IpInfoManager ipinfoManager;

	private IpInfoManager() {
		// 初始化集合
		collection = new MongoCollection(COLLECTION_NAME,PjConstants.HOST_LOGIN_SESSION);

	}

	/**
	 * 静态方法，获取会话管理实例；
	 *
	 * @return
	 */
	public static IpInfoManager inst() {
		if (ipinfoManager == null) {
		    ipinfoManager = new IpInfoManager();
		}
		return ipinfoManager;
	}


	public IpInfoEntity findByIp(String ip) {
	    try{
		DBObject query = new BasicDBObject();
		query.put("ip", ip);
		DBObject object = collection.findOne(query);
		if(object != null){
		    return BeanAndDBObjectUtil.dbObject2Bean(object,new IpInfoEntity());
		}
	   } catch (Exception e) {
		log.error("查询用户ip异常",e);
	   }
	    return null;

	}



}
