package com.paojiao.sdk3.service.impl;

import com.jfinal.kit.JsonKit;
import com.paojiao.sdk3.common.DS;
import com.paojiao.sdk3.common.Platform;
import com.paojiao.sdk3.common.util.ErrorMsg;
import com.paojiao.sdk3.model.PpUser;
import com.paojiao.sdk3.service.PpUserService;
import org.apache.log4j.Logger;

import java.util.Date;

/**
 * PpUserServiceImpl
 *
 * @author jiangkun
 * @date 2020/10/30
 */
public class PpUserServiceImpl implements PpUserService {
    private final Logger log = Logger.getLogger(PpUserServiceImpl.class);
    @Override
    public PpUser findUser(int userId) {
        StringBuilder sql = new StringBuilder("select * from pp_user where uid1=? limit 1 ");

        return PpUser.dao.use(DS.pubMaster).findFirst(sql.toString(), userId);
    }
/*

    @Override
    public PpUser findUser2(int platform, int uid) {
        StringBuilder sql = new StringBuilder("select * from pp_user where ");
        switch (platform) {
            case Platform.PAOJIAO_SDK:
            case Platform.PAOJIAO_WEIXIN:
            case Platform.PAOJIAO_WEB:
            case Platform.PAOJIAO_H5_SDK:
                sql.append(" uid1=? limit 1");
                break;
            case Platform.YINHU_IOS_SDK:
            case Platform.YINHU_ANDROID_SDK:
            case Platform.YINHU_WEIXIN:
            case Platform.YINHU_GAME_CENTER_WEIXIN:
            case Platform.YINHU_IOS_H5_SDK:
            case Platform.YINHU_ANDROID_H5_SDK:

                sql.append(" uid2 =? limit 1");
                break;
        }
        return PpUser.dao.use(DS.pubMaster).findFirst(sql.toString(), uid);
    }

    @Override
    public PpUser findUser(int platform, int uid,String ip) {


        //查询用户信息
        PpUser  user  = findUser2(platform, uid);

        if(user != null){ //用户存在，直接返回。
            user.setLastLoginTime(new Date());
            user.use(DS.pubMaster).update();

            try{
                //异步调用,更新用户地址信息
                ApiTask.updateUserAddress(user.getId(),ip);
            }catch(Exception e){
                log.error(ErrorMsg.UPDATE_USER_ADDRESS_EXCEPTION.msg, e);
            }
            return user;
        }

        //用户信息不存在，说明用户尚未在用户中心绑定。
        log.info("用户尚未绑定,开始调用接口查询。param[platform:"+platform+",uid:"+uid+"]");
        user  =  ApiService.getUserInfo(uid, platform,platform,false);

        //银狐(infox_uc_center.pj_member_user)之前没有用户中心，所以部分用户是生成在泡椒数据库的。
        //如果在银狐获取不到用户信息，需要到泡椒平台再次获取。
        if(user == null && SDKUtil.isYhPlatform(platform)){
            log.info("用户在银狐不存在调用泡椒接口查询。param[platform:"+platform+",uid:"+uid+"]");
            user  =  ApiService.getUserInfo(uid,Platform.PAOJIAO_SDK,platform,true);
        }

        if(user == null){
            log.info("获取用户信息失败。param[platform:"+platform+",uid:"+uid+"]");
            return null;
        }

        try{
            user.setStatus(1);
            user.use(DS.pubMaster).save();
            log.info("保存用户信息["+ JsonKit.toJson(user)+"]");

       */
/*     try{
                //异步调用接口获取用户充值记录
                ApiTask.getOrder(user.getId());
            }catch(Exception e){
                log.error(ErrorMsg.GET_ORDER_EXCEPTION.msg, e);
            }*//*


            try{
                //异步调用接口获取用户游戏记录
               // ApiTask.getUserGame(user.getId());
            }catch(Exception e){
                log.error(ErrorMsg.GET_USER_GAME_EXCEPTION.msg, e);
            }


            try{
                //异步调用,更新用户地址信息
               // ApiTask.updateUserAddress(user.getId(),ip);
            }catch(Exception e){
                log.error(ErrorMsg.UPDATE_USER_ADDRESS_EXCEPTION.msg, e);
            }


            return user;

        }catch(Exception e){
            log.error("保存用户信息异常["+JsonKit.toJson(user)+"]", e);
            return null;
        }

    }
*/


}
