package com.paojiao.sdk3.common.mongo.manager;

import com.alibaba.fastjson.JSON;
import com.jfinal.kit.StrKit;
import com.paojiao.sdk3.common.PjConstants;
import com.paojiao.sdk3.common.mongo.MongoCollection;
import com.paojiao.sdk3.common.util.https.HttpsUtil;
import com.paojiao.sdk3.model.pojo.LoginEntity;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import java.util.*;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;

/**
 * MongoDB Session管理主函数。
 *
 * @author Van
 * @date 2013-09-06
 *
 */
public class LoginSessionManager {

	private Log logger = LogFactory.getLog(LoginSessionManager.class);
	/** 表信息 */
	private static final String COLLECTION_NAME = "loginSession";
	private static final String ACTIVE_TIME_KEY = "activeTime";
	private static final String CREATED_TIME_KEY = "createdTime";
	private static final String USERNAME_KEY = "userName";
	private static final String TOKEN_KEY = "token";
	private static final String NICENAME_KEY = "niceName";
	private static final String MOBILE = "mobile";
	private static final String AVATAR = "avatar";
	private static final String UID = "uid";
	private static final String UDID = "udid";
	private static MongoCollection collection;

	/** 应用的单例 */
	private static LoginSessionManager sessionManager;

	/** 线程池，用于处理后端更新会话的的逻辑 */
	private static ThreadPoolExecutor updatePool = new ThreadPoolExecutor(10,
			50, 10 * 60, TimeUnit.SECONDS, new LinkedBlockingQueue<Runnable>());

	private LoginSessionManager() {
		// 初始化集合
		collection = new MongoCollection(COLLECTION_NAME,
				PjConstants.HOST_LOGIN_SESSION);
	}

	/**
	 * 静态方法，获取会话管理实例；
	 *
	 * @return
	 */
	public static LoginSessionManager inst() {
		if (sessionManager == null) {
			sessionManager = new LoginSessionManager();
		}

		return sessionManager;
	}

	/**
	 * 往MongoDB里面添加一个会话；如果已经存在某个用户的话，只更新活跃时间和基本信息，返回已有的token不变；否则插入一条新的数据；
	 *
	 * @param session
	 *            会话实体.
	 * @return token 用户在MongoDB里面的唯一标识.
	 */
	public String addSession(LoginEntity session) {

		// 查询会话是否已经存在
		com.pjmongodb.BasicDBObject query = new com.pjmongodb.BasicDBObject();
		query.put(UID, session.getUid());
		com.pjmongodb.DBObject o = collection.findOne(query);

		boolean isNew = true;
		if (o != null) {// 将token替换成老的
			session.setToken((String) o.get(TOKEN_KEY));
			isNew = false;
		}

		com.pjmongodb.BasicDBObject s = new com.pjmongodb.BasicDBObject();
		s.put(UID, session.getUid());
		s.put(UDID, session.getUdid());
		s.put(TOKEN_KEY, session.getToken());
		s.put(USERNAME_KEY, session.getUserName());
		s.put(NICENAME_KEY, session.getNiceName());
		s.put(CREATED_TIME_KEY, session.getCreateTime());
		s.put(ACTIVE_TIME_KEY, session.getActiveTime());
		s.put(MOBILE, session.getMobile());
		s.put(AVATAR, session.getAvatar());
		s.put("suid", session.getSuid());
		s.put("appVersion", session.getAppVersion());
		if (isNew) {
			logger.info("add session :\t" + session.getToken());
			collection.save(s);
		} else {
			logger.info("update session :\t" + session.getToken());
			collection.update(query, s);
		}

		return session.getToken();
	}

	/**
	 * 更新会话里面的信息，用于用户修改基本资料时，同步修改会话值； 注意：非空即改，不修改的字段留空即可；
	 *
	 * @param userId
	 *            用户ID，修改依据
	 * @param userName
	 *            更新用户名，很少用到用，于用户第一次修改资料；
	 * @param niceName
	 *            更新昵称
	 * @param mobile
	 *            更新手机
	 * @param avatar
	 *            更新头像
	 * @param udid
	 *            更新识别号
	 */
	public void refreshSession(int userId, String userName, String niceName,
			String mobile, String avatar, String udid) {
		com.pjmongodb.BasicDBObject query = new com.pjmongodb.BasicDBObject();
		query.put(UID, userId);
		com.pjmongodb.DBObject s = collection.findOne(query);

		if (StrKit.notBlank(userName)) {
			s.put(USERNAME_KEY, userName);
		}
		if (StrKit.notBlank(niceName)) {
			s.put(NICENAME_KEY, niceName);
		}
		if (StrKit.notBlank(mobile)) {
			s.put(MOBILE, mobile);
		}
		if (StrKit.notBlank(avatar)) {
			s.put(AVATAR, avatar);
		}
		if (StrKit.notBlank(udid)) {
			s.put(UDID, udid);
		}
		System.out.println("+++++++++++++++refresh mongo:" + s.toString());
		collection.update(query, s);
	}

	/**
	 * 往MongoDB里面添加一个会话；如果已经存在某个用户的话，只更新活跃时间和基本信息，返回已有的token不变；否则插入一条新的数据；
	 *
	 * @param session
	 *            会话实体.
	 * @return token 用户在MongoDB里面的唯一标识.
	 */
	public String updateSession(LoginEntity session) {

		// 查询会话是否已经存在
		com.pjmongodb.BasicDBObject query = new com.pjmongodb.BasicDBObject();
		query.put(UID, session.getUid());
		com.pjmongodb.DBObject o = collection.findOne(query);

		boolean isNew = true;
		if (o != null) {// 将token替换成老的
			session.setToken((String) o.get(TOKEN_KEY));
			isNew = false;
		}

		com.pjmongodb.BasicDBObject s = new com.pjmongodb.BasicDBObject();
		s.put(UID, session.getUid());
		s.put(UDID, session.getUdid());
		s.put(TOKEN_KEY, session.getToken());
		s.put(USERNAME_KEY, session.getUserName());
		s.put(NICENAME_KEY, session.getNiceName());
		s.put(CREATED_TIME_KEY, session.getCreateTime());
		s.put(ACTIVE_TIME_KEY, session.getActiveTime());
		s.put(MOBILE, session.getMobile());
		s.put(AVATAR, session.getAvatar());

		if (isNew) {
			// logger.info("add session :\t" + session.getToken());
			collection.save(s);
		} else {
			// logger.info("update session :\t" + session.getToken());
			collection.update(query, s);
		}
		return session.getToken();
	}

	/**
	 * 通过token获取Session
	 *
	 * @param token
	 * @return
	 */
	public LoginEntity findByToken(String token) {
		return findByToken(token, false);
	}

	public Integer findUidByToken(String token) {
		com.pjmongodb.BasicDBObject query = new com.pjmongodb.BasicDBObject();
		query.put(TOKEN_KEY, token);
		com.pjmongodb.DBObject object = collection.findOne(query);
		Object uid = object.get(UID);
		if (uid == null) {
			return null;
		}
		return (Integer) uid;
	}

	/**
	 * 通过token获取Session
	 *
	 * @param token
	 * @return
	 */
	public LoginEntity findByToken(String token, boolean master) {
		com.pjmongodb.BasicDBObject query = new com.pjmongodb.BasicDBObject();
		query.put(TOKEN_KEY, token);
		com.pjmongodb.DBObject object = collection.findOne(query);
		return dbObject2Session(object, true);

	}
	/**
	 * 通过uid获取Session
	 *
	 * @param uid
	 * @return
	 */
	public LoginEntity findByToken(int uid, boolean master) {
		com.pjmongodb.BasicDBObject query = new com.pjmongodb.BasicDBObject();
		query.put(UID, uid);
		com.pjmongodb.DBObject object = collection.findOne(query);
		return dbObject2Session(object, true);

	}

	/**
	 * 通过用户名获取 Session
	 *
	 * @param username
	 * @return
	 */
	public LoginEntity findByUsername(String username) {
		com.pjmongodb.BasicDBObject query = new com.pjmongodb.BasicDBObject();
		query.put(USERNAME_KEY, username);
		com.pjmongodb.DBObject object = collection.findOne(query);
		return dbObject2Session(object, true);
	}

	/**
	 * 根据手机识别号，获取帐户列表；
	 *
	 * @param udid
	 * @return
	 */
	public List<LoginEntity> findByUdid(final String udid) {
		com.pjmongodb.BasicDBObject query = new com.pjmongodb.BasicDBObject();
		query.put(UDID, udid);

		com.pjmongodb.BasicDBObject sort = new com.pjmongodb.BasicDBObject();
		sort.put(ACTIVE_TIME_KEY, -1);
		com.pjmongodb.DBCursor cursor = collection.find(query).sort(sort).limit(5);
		Iterator<com.pjmongodb.DBObject> iterator = cursor.iterator();
		List<LoginEntity> sessions = new ArrayList<LoginEntity>();

		while (iterator.hasNext()) {
			com.pjmongodb.DBObject object = iterator.next();
			if (object != null) {
				sessions.add(dbObject2Session(object, false));
			}

		}

		return sessions;
	}

	/**
	 * 将MongoDB查询到的对象转换成登录实体；
	 *
	 * @param object
	 * @param updateTime
	 * @return
	 */
	private LoginEntity dbObject2Session(com.pjmongodb.DBObject object, boolean updateTime) {
		if (object == null) {
			return null;
		}
		LoginEntity session = new LoginEntity();
		session.setCreateTime((Date) object.get(CREATED_TIME_KEY));
		session.setActiveTime((Date) object.get(ACTIVE_TIME_KEY));
		session.setUserName((String) object.get(USERNAME_KEY));
		session.setToken((String) object.get(TOKEN_KEY));
		session.setNiceName((String) object.get(NICENAME_KEY));
		session.setUid((Integer) object.get(UID));
		session.setMobile((String) object.get(MOBILE));
		session.setAvatar((String) object.get(AVATAR));
		session.setUdid((String) object.get(UDID));
		if (updateTime) {// 查询的时候是否同时更新活跃时间
			// System.out.println("++++++++++++++更新活跃时间++++++");
			updatePool.execute(new UpdateActiveTimeTask(session.getToken(),
					session.getActiveTime()));

		}
		return session;
	}

	/**
	 * 将会话从MongoDB中移除；
	 *
	 * @param token
	 *            识别字符串
	 */
	public void removeSession(String token) {
		com.pjmongodb.BasicDBObject q = new com.pjmongodb.BasicDBObject();
		q.append(TOKEN_KEY, token);
		collection.remove(q);
	}

	/**
	 * 移除会话 Description:
	 *
	 * @param
	 * @return void
	 * @throws
	 * @Author Van Create Date: 2016年4月15日 下午5:32:18
	 */
	public void removeSession(int uid) {
		com.pjmongodb.BasicDBObject q = new com.pjmongodb.BasicDBObject();
		q.append(UID, uid);
		collection.remove(q);
	}

	/**
	 * 将会话从MongoDB中移除；
	 *
	 * @param userName
	 *            用户名
	 */
	public void removeByUserName(String userName) {
		com.pjmongodb.BasicDBObject q = new com.pjmongodb.BasicDBObject();
		q.append(USERNAME_KEY, userName);
		collection.remove(q);
	}

	/**
	 * 更新某个字段的值；
	 *
	 * @param token
	 *            识别码
	 * @param name
	 *            字段名
	 * @param value
	 *            值
	 */
	public void saveAttribute(String token, String name, Object value) {
		com.pjmongodb.BasicDBObject q = new com.pjmongodb.BasicDBObject();
		q.append(TOKEN_KEY, token);
		com.pjmongodb.BasicDBObject o = new com.pjmongodb.BasicDBObject();
		com.pjmongodb.BasicDBObject f = new com.pjmongodb.BasicDBObject();
		f.append(name, value);
		o.append("$set", f);
		collection.update(q, o);
	}

	/**
	 * 移除某个字段的值；
	 *
	 * @param token
	 *            识别码
	 * @param name
	 *            字段名
	 */
	public void removeAttribute(String token, String name) {
		com.pjmongodb.BasicDBObject q = new com.pjmongodb.BasicDBObject();
		q.append(TOKEN_KEY, token);
		com.pjmongodb.BasicDBObject o = new com.pjmongodb.BasicDBObject();
		com.pjmongodb.BasicDBObject f = new com.pjmongodb.BasicDBObject();
		f.append(name, 1);
		o.append("$unset", f);
		collection.update(q, o);
	}

	/**
	 * 更新用户关联的设备识别码（安卓机器唯一码）
	 *
	 * @param uid
	 * @param udid
	 */
	public void updateUdid(int uid, String udid) {
		com.pjmongodb.BasicDBObject query = new com.pjmongodb.BasicDBObject();
		query.put(UID, uid);
		com.pjmongodb.DBObject s = collection.findOne(query);
		s.put(UDID, udid);
		collection.update(query, s);
	}

	/**
	 * 更新用户活跃时间；
	 *
	 * @author van
	 *
	 */
	private class UpdateActiveTimeTask implements Runnable {

		private final String token;
		private final Date activeTime;

		public UpdateActiveTimeTask(String token, Date activeTime) {
			this.token = token;
			this.activeTime = activeTime;
		}

		@Override
		public void run() {

			try {

				if (activeTime != null) {
					// 时间差
					long diff = new Date().getTime() - activeTime.getTime();
					// 相差秒数
					long min = diff / 1000 / 60;
					// 如果活跃时间在1分钟更新一次
					if (min < 30) {
						return;
					}
				}

				logger.info("++++++++++ update activetime :\t" + token);
				LoginSessionManager.inst().saveAttribute(token,
						ACTIVE_TIME_KEY, new Date());
			} catch (Exception e) {
				logger.error("++++++++++ update activetime failure :\t" + token);
			}

		}
	}

	/**
	 * 通过用户名获取 Session
	 *
	 * @return
	 */
	public List<LoginEntity> findByDate(Date startTime, Date endTime) {
		com.pjmongodb.BasicDBObject query = new com.pjmongodb.BasicDBObject();
		com.pjmongodb.BasicDBObject gt = new com.pjmongodb.BasicDBObject();
		gt.put("$gt", startTime);
		query.put(ACTIVE_TIME_KEY, gt);

		com.pjmongodb.BasicDBObject lt = new com.pjmongodb.BasicDBObject();
		lt.put("$lt", endTime);
		query.put(ACTIVE_TIME_KEY, lt);

		com.pjmongodb.DBCursor cursor = collection.find(query).limit(20);
		Iterator<com.pjmongodb.DBObject> iterator = cursor.iterator();
		List<LoginEntity> sessions = new ArrayList<LoginEntity>();

		while (iterator.hasNext()) {
			com.pjmongodb.DBObject object = iterator.next();
			if (object != null) {
				sessions.add(dbObject2Session(object, false));
			}

		}

		return sessions;
	}

	/**
	 * 验证泡椒token
	 *
	 * @param token
	 * @return
	 */
	@SuppressWarnings("rawtypes")
	public static Map veriryPJToken(String token) {
		String url = PjConstants.sconfig.getNgTokenUrl();
		Map<String, String> params = new HashMap<String, String>();
		params.put("token", token);
		String postResult = HttpsUtil.post(url, params,null);
		Map regResult = JSON.parseObject(postResult, Map.class);
		return regResult;
	}
}
