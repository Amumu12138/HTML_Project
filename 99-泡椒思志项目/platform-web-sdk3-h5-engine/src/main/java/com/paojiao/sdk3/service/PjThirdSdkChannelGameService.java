package com.paojiao.sdk3.service;

import com.paojiao.sdk3.common.DS;
import com.paojiao.sdk3.model.PjCpGame;
import com.paojiao.sdk3.model.PjThirdSdkChannelGame;

/**
 * @Auther: zhouzhenyi
 * @Date: 2019/3/7 14:45
 * @Description:
 */
public class PjThirdSdkChannelGameService {


    public PjThirdSdkChannelGame findGameById(int channelGameId){
        String sql = "select * from pj_third_sdk_channel_game where id = ?";
        return PjThirdSdkChannelGame.dao.use(DS.sdkSlave).findFirst(sql,channelGameId);

    }
     public PjThirdSdkChannelGame findGameByPayKey(String channelGamePayKey){
        String sql = "select * from pj_third_sdk_channel_game where payKey = ?";
        return PjThirdSdkChannelGame.dao.use(DS.sdkSlave).findFirst(sql,channelGamePayKey);
    }

}
