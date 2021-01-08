package com.paojiao.sdk3.common.mongo.config;

import java.io.IOException;
import java.util.Properties;

/**
 * Mongodb的配置信息；
 * @author van
 * @version 1.0
 */
public class LoginSessionMongoConfig {


	/**MongoDB配置信息*/
	public String dbName;
	public String host;
	public int port;
	public String user;
	public String password;
	public String replicaSet;
	public boolean security;
	public boolean init=false;

	public LoginSessionMongoConfig (){

		Properties properties = new Properties();
		try {
			properties.load(LoginSessionMongoConfig.class.getResourceAsStream("/mongo.properties"));

				dbName=properties.getProperty("mongo_db_name_loginSession");
				host=properties.getProperty("mongo_host_loginSession");
				if (properties.getProperty("mongo_port_loginSession") != null) {
					port=Integer.parseInt(properties.getProperty("mongo_port_loginSession"));
				}
				user=properties.getProperty("mongo_user_loginSession");
				password=properties.getProperty("mongo_password_loginSession");
				replicaSet = properties.getProperty("mongo_replicaSet_loginSession");
				security=properties.getProperty("mongo_sec_loginSession").equals("true")?true:false;
			init = true;
		} catch (IOException e) {

		}
	}

}
