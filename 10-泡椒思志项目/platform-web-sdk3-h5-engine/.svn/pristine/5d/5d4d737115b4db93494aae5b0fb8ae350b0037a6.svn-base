package com.paojiao.sdk3.service.impl;

import com.paojiao.sdk3.common.DS;
import com.paojiao.sdk3.common.Platform;
import com.paojiao.sdk3.model.PpGame;
import com.paojiao.sdk3.service.GameService;

/**
 * GameServiceImpl
 *
 * @author jiangkun
 * @date 2020/10/30
 */
public class GameServiceImpl implements GameService {

    //private final Logger log = Logger.getLogger(GameServiceImpl.class);


    @Override
    public PpGame findGame(int platform, int gameid) {

        switch (platform) {
            case Platform.PAOJIAO_SDK:
            case Platform.PAOJIAO_WEIXIN:
            case Platform.PAOJIAO_WEB:
            case Platform.PAOJIAO_H5_SDK:
                platform = Platform.PAOJIAO_SDK;
                break;
            case Platform.YINHU_IOS_SDK:
            case Platform.YINHU_ANDROID_SDK:
            case Platform.YINHU_WEIXIN:
            case Platform.YINHU_GAME_CENTER_WEIXIN:
            case Platform.YINHU_IOS_H5_SDK:
            case Platform.YINHU_ANDROID_H5_SDK:
                platform = Platform.YINHU_IOS_SDK;
                break;
        }
        String sql = "select * from  pp_game  where  platform = ? and platform_game_id = ? and status = 1 limit 1";
        PpGame game = PpGame.dao.use(DS.pubSlave).findFirst(sql,platform,gameid);
        return game;
    }

    @Override
    public PpGame findGame2(int platform, int gameid) {
        switch (platform) {
            case Platform.PAOJIAO_SDK:
            case Platform.PAOJIAO_WEIXIN:
            case Platform.PAOJIAO_WEB:
            case Platform.PAOJIAO_H5_SDK:
                platform = Platform.PAOJIAO_SDK;
                break;
            case Platform.YINHU_IOS_SDK:
            case Platform.YINHU_ANDROID_SDK:
            case Platform.YINHU_WEIXIN:
            case Platform.YINHU_GAME_CENTER_WEIXIN:
            case Platform.YINHU_IOS_H5_SDK:
            case Platform.YINHU_ANDROID_H5_SDK:
                platform = Platform.YINHU_IOS_SDK;
                break;
        }
        String sql = "select * from  pp_game  where  platform = ? and platform_game_id = ? limit 1";
        PpGame game = PpGame.dao.use(DS.pubSlave).findFirst(sql,platform,gameid);
        return game;
    }



    @Override
    public PpGame findGameById(int gameid) {
        String sql="select  * from pp_game where id = ? and status = 1 limit 1";
        return PpGame.dao.use(DS.pubSlave).findFirst(sql,gameid);
    }
}
