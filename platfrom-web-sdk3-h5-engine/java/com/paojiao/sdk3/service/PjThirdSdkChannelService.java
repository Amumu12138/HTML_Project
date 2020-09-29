package com.paojiao.sdk3.service;

import com.paojiao.sdk3.common.DS;
import com.paojiao.sdk3.model.PjThirdSdkChannel;

/**
 * @Auther: zhouzhenyi
 * @Date: 2019/3/7 14:52
 * @Description:
 */
public class PjThirdSdkChannelService {

    public PjThirdSdkChannel findChannelById(int channelId){
        String sql = "select * from pj_third_sdk_channel where id = ?";
        return  PjThirdSdkChannel.dao.use(DS.sdkSlave).findFirst(sql,channelId);

    }
}
