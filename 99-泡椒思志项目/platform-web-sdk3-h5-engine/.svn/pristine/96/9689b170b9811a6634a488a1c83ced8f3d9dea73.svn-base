package com.paojiao.sdk3.common.mongo.manager;


import com.mongodb.*;
import com.paojiao.sdk3.common.PjConstants;
import com.paojiao.sdk3.common.util.DateUtil;
import com.paojiao.sdk3.model.pojo.SdkOnlineUserDataEntity;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * 在线用户数据
 */
public class SdkOnlineUserManager {

	private Log log = LogFactory.getLog(SdkOnlineUserManager.class);


	/** 表信息 */
	private static final String COLLECTION_NAME = "SdkOnlineUserData";

	private static  String connectionString = PjConstants.MONGODB_ONLINEUSER_URI;


	private static final String UID = "userId";
	private static final String GAMEID = "gameId";
	private static final String CID = "cid";
	private static final String ADDDATE = "addDate";
	private static final String ADDTIME = "addTime";


	private static DBCollection collection;

	/** 应用的单例 */
	private static SdkOnlineUserManager sessionManager;


	private SdkOnlineUserManager() {
		// 初始化集合
		collection = getCollection(COLLECTION_NAME);

	}



	/**
	 * 静态方法，获取会话管理实例；
	 *
	 * @return
	 */
	public static SdkOnlineUserManager inst() {
		if (sessionManager == null) {
			sessionManager = new SdkOnlineUserManager();
		}
		return sessionManager;
	}


	public DBCollection getCollection() {
		return collection;
	}
	public void addSession(SdkOnlineUserDataEntity session) {
		BasicDBObject s = new BasicDBObject();
		s.put(UID, session.getUserId());
		s.put(GAMEID, session.getGameId());
		s.put(CID, session.getCid());
		s.put(ADDDATE, session.getAddDate());
		s.put(ADDTIME, session.getAddTime());
		collection.save(s);
	}


	public DBCollection getCollection(String collectionName) {
		try {
			MongoClientURI uri = new MongoClientURI(connectionString);
			MongoClient mongoClient = new MongoClient(uri);
			DB database = mongoClient.getDB(uri.getDatabase());
			DBCollection collection = database.getCollection(collectionName);
			return collection;
		}catch (Exception e){
			log.error("获取mongodb连接异常",e);
		}
		return null;
	}


	/**
	 *  统计用户当天在线记录数
	 * @param gameId 游戏id
	 * @param userId 用户id
	 * @return
	 */
	public int countUserStat(Integer gameId, Integer userId, Date date) {
		try {
			DBObject query = new BasicDBObject();
			query = new BasicDBObject();
			query.put("gameId", gameId);
			query.put("userId", userId);

			DBObject queryTime = new BasicDBObject();
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

			String statDate = DateUtil.getFormatTime(date,"yyyy-MM-dd");

			Date startDate = sdf.parse(statDate+" 00:00:00");
			Date endDate = sdf.parse(statDate+" 23:59:59");;

			queryTime.put("$gte", startDate);
			queryTime.put("$lte", endDate);
			query.put("addTime", queryTime);

			Long num = SdkOnlineUserManager.inst().getCollection().count(query);
			return num.intValue();
		}catch (Exception e){
			log.error("用户在线记录查询异常",e);
		}

		return 0;
	}

	public static void main(String[] args) throws ParseException {
		Date date = new Date();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

		String statDate = DateUtil.getFormatTime(date,"yyyy-MM-dd");

		Date startDate = sdf.parse(statDate+" 00:00:00");
		Date endDate = sdf.parse(statDate+" 23:59:59");;
		System.out.println(startDate);
		System.out.println(endDate);
	}

}
