package com.paojiao.sdk3.service.impl;

import com.jfinal.kit.StrKit;
import com.paojiao.sdk3.common.DS;
import com.paojiao.sdk3.model.PpGamePayConfig;
import com.paojiao.sdk3.model.PpPayConfig;
import com.paojiao.sdk3.service.PayConfigService;
import org.apache.log4j.Logger;

import java.util.List;

/**
 * PayConfigServiceImpl
 *
 * @author jiangkun
 * @date 2020/10/30
 */
public class PayConfigServiceImpl implements PayConfigService {

    private final Logger log = Logger.getLogger(PayConfigServiceImpl.class);


    @Override
    public PpPayConfig findById(int id) {
        String sql = "select  * from pp_pay_config where id  = ? limit 1";
        PpPayConfig config = PpPayConfig.dao.use(DS.pubMaster).findFirst(sql, id);
        return config;
    }


    @Override
    public List<PpPayConfig> findGamePay(int gameid) {
        String sql = "select  * from pp_game_pay_config where game_id = ? limit 1";
        PpGamePayConfig gameConfig = PpGamePayConfig.dao.use(DS.pubMaster).findFirst(sql, gameid);
        if(gameConfig == null || StrKit.isBlank(gameConfig.getWapPayConfigIds())){
            return null;
        }

        //查询游戏支付配置
        String configIds = gameConfig.getWapPayConfigIds();
        return getPayConfig(configIds);
    }



    @Override
    public List<PpPayConfig> findPlatformPay(Integer platform) {
        String sql = "select  * from pp_game_pay_config where game_id = 0 and platform = ? limit 1";
        PpGamePayConfig gameConfig = PpGamePayConfig.dao.use(DS.pubMaster).findFirst(sql, platform);
        if(gameConfig == null || StrKit.isBlank(gameConfig.getWapPayConfigIds())){
            log.info("平台默认支付配置不存在[param:"+platform+"]");
            return null;
        }

        //查询游戏支付配置
        String configIds = gameConfig.getWapPayConfigIds();
        return getPayConfig(configIds);
    }


    @Override
    public List<PpPayConfig> findChannelPay(int platform,int gameId, String cid) {
        try {
            if (StrKit.isBlank(cid)) {
                return null;
            }

/*
            String sql = "select *from pp_channel_pay_config  where channel = ? and game_id = ? and status = 1 limit 1";
            PpChannelPayConfig channelPayConfig =  PpChannelPayConfig.dao.use(DS.pubSlave).findFirst(sql,cid,gameId);
            if(channelPayConfig == null){
                return null;
            }

            //查询游戏支付配置
            String configIds = channelPayConfig.getWapPayConfigIds();

            return getPayConfig(configIds);*/

        }catch (Exception e){
            log.error("查询渠道支付异常",e);
        }

        return null;
    }


    private  List<PpPayConfig> getPayConfig(String configIds){
        if(StrKit.isBlank(configIds)){
            return null;
        }
        String sql  = "select  * from pp_pay_config where id in("+configIds+") ORDER by field(id,"+configIds+")";
        List<PpPayConfig> payconfigList =  PpPayConfig.dao.use(DS.pubMaster).find(sql);
        if(payconfigList == null || payconfigList.size()  == 0){
            return null;
        }
        return payconfigList;
    }


}
