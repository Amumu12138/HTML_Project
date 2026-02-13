package com.paojiao.sdk3.service;

import com.paojiao.sdk3.common.DS;
import com.paojiao.sdk3.model.StatDeviceCid;
import org.apache.log4j.Logger;

/**
 * StatDeviceCidService
 *
 * @author jiangkun
 * @date 2020/11/30
 */
public interface StatDeviceCidService {

     StatDeviceCid findStatDeviceCid(String gameId, String udid);

     void save(StatDeviceCid statDeviceCid) ;
}
