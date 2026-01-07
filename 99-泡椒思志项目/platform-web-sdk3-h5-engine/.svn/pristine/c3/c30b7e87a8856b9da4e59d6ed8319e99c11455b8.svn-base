package com.paojiao.sdk3.service.impl;

import com.paojiao.sdk3.common.DS;
import com.paojiao.sdk3.model.StatDeviceCid;
import com.paojiao.sdk3.service.StatDeviceCidService;

/**
 * StatDeviceCidServiceImpl
 *
 * @author jiangkun
 * @date 2020/12/1
 */
public class StatDeviceCidServiceImpl implements StatDeviceCidService {

    public StatDeviceCid findStatDeviceCid(String gameId, String udid) {
        StringBuilder sql = new StringBuilder("select * from stat_device_cid where gameId=? and udid = ? limit 1 ");

        return StatDeviceCid.dao.use(DS.sdkMaster).findFirst(sql.toString(), gameId, udid);
    }


    public void save(StatDeviceCid statDeviceCid) {
         statDeviceCid.use(DS.sdkMaster).save();
    }
}
