package com.paojiao.sdk3.service;

import com.paojiao.sdk3.common.DS;
import com.paojiao.sdk3.model.StatNewClient;
import org.apache.log4j.Logger;

public class StatNewClientService {

	public static final Logger log = Logger
			.getLogger(StatNewClientService.class);

	/**
	 *
	 */
	public StatNewClient findStatNewClient(StatNewClient user) {
		String  sql = "select * from stat_new_client where imei= ? and gameId=? limit 1";

		String imei = user.getImei();

		StatNewClient statNewClient = user.use(DS.sdkSlave).findFirst(sql,imei,user.getGameId());
		return statNewClient;
	}

	public StatNewClient save(StatNewClient user) {
		return user.use(DS.sdkMaster).save() == true ? user : null;

	}

}
