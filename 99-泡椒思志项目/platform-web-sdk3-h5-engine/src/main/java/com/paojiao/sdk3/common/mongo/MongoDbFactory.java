package com.paojiao.sdk3.common.mongo;

import com.paojiao.sdk3.common.mongo.config.LoginSessionMongoConfig;
import org.apache.log4j.Logger;

import java.net.UnknownHostException;

/**
 * MongoDB工具类，获取MongoDB配置
 *
 * @author Van
 * @version 1.0
 */
public class MongoDbFactory {
	private static Logger logger = Logger
			.getLogger(MongoDbFactory.class);

	// MongoDB配置信息
	private static final com.pjmongodb.MongoClientOptions MONGO_OPTIONS = new com.pjmongodb.MongoClientOptions.Builder()
			.legacyDefaults().connectionsPerHost(500)
			.threadsAllowedToBlockForConnectionMultiplier(100).build();

	/**
	 * 获取MongoDB连接
	 *
	 * @return
	 */
	public com.pjmongodb.DB getMongoDB(String host) {

		try {

			  LoginSessionMongoConfig config = new LoginSessionMongoConfig();
				// 初始化数据
				com.pjmongodb.MongoClient mongoClient = initClient(config.host, config.dbName,
						config.port, config.user, config.password, config.security,config.replicaSet);
				return mongoClient.getDB(config.dbName);

		} catch (UnknownHostException e1) {
			logger.error("+++++++++++++++++ 初始化MongoDB失败：" + e1.getMessage());
			return null;
		}
	}


	/**
	 * 获取MongoClient
	 *
	 * @param host
	 * @param dbName
	 * @param port
	 * @param userName
	 * @param password
	 * @param authenticate
	 * @return
	 * @throws UnknownHostException
	 */
	private com.pjmongodb.MongoClient initClient(String host, String dbName, int port,
			String userName, String password, boolean authenticate,String replicaSet)
			throws UnknownHostException {

		// 个性配置
		com.pjmongodb.MongoClient mongoClient = null;
	//ServerAddress addr = new ServerAddress(host, port);
		if (authenticate) {
			// 验证登录
			//MongoCredential credential = MongoCredential.createMongoCRCredential(userName, dbName,password.toCharArray());
			//MongoCredential credential = MongoCredential.createScramSha1Credential(userName, dbName,password.toCharArray());
			//List<MongoCredential> credentials = new ArrayList<MongoCredential>(1);
			//credentials.add(credential);
			//mongoClient = new com.pjmongodb.MongoClient(addr, credentials, MONGO_OPTIONS);
			String connectionString = null;
			if(host.contains("aliyuncs")){//线上
				 connectionString = "mongodb://"+userName+":"+password+"@"+host+"/"+dbName+"?replicaSet="+replicaSet;
			}else{
				 connectionString = "mongodb://"+userName+":"+password+"@"+host+"/"+dbName;
			}

			com.pjmongodb.MongoClientURI uri = new com.pjmongodb.MongoClientURI(connectionString);
			mongoClient = new com.pjmongodb.MongoClient(uri);
		} else {
			//mongoClient = new com.pjmongodb.MongoClient(addr, MONGO_OPTIONS);
		}
		return mongoClient;
	}

}
