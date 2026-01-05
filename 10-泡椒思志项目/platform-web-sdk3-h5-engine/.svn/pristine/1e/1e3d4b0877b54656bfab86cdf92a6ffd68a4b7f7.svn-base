package com.paojiao.sdk3.service;

import com.jfinal.aop.Inject;
import com.paojiao.sdk3.common.OnlineEventType;
import com.paojiao.sdk3.common.StatusType;
import com.paojiao.sdk3.common.mongo.manager.SdkOnlineUserManager;
import com.paojiao.sdk3.common.util.DateUtil;
import com.paojiao.sdk3.common.util.IdcardUtil;
import com.paojiao.sdk3.common.util.UcUtil;
import com.paojiao.sdk3.model.*;
import com.paojiao.sdk3.service.impl.PpUserRealNameAuthServiceImpl;
import com.paojiao.sdk3.service.impl.PpUserServiceImpl;
import org.apache.log4j.Logger;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * 防沉迷检测
 *
 * @author jiangkun
 * @date 2020/12/22
 */
public class StatOnlineUserService {

    public static final Logger log = Logger
            .getLogger(StatOnlineUserService.class);

    private PjCpGameService gameService =new PjCpGameService();
    private PpUserRealNameAuthService ppUserRealNameAuthService = new PpUserRealNameAuthServiceImpl();
    private PpUserService ppUserService = new PpUserServiceImpl();

    /**
     * 检查游戏有没有开启防沉迷
     * 1、开启防沉迷后，当天在线1.5小时，给未成年用户提醒弹窗，并且不能关闭，在线时长次日归零。
     *
     * @param gameId 游戏id
     * @param userId 用户id,userId == 0说明还没登录，不需要判断
     */
    public Map<String, Object> checkGameStatus(Integer gameId, Integer userId, String channel) {
        try {

            Date now = new Date();

            Map<String, Object> retMap = new HashMap<String, Object>();

            //查询当前游戏是否开启防沉迷
            PjCpGame pjCpGame = gameService.findGameById(gameId);
            if (pjCpGame == null || pjCpGame.getAddictStatus() == 0 || userId == 0) {
                return null;
            }

            //查询当前用户实名认证状态
            /**
             * -1：接口错误
             * 0：未实名认证
             * 1：实名认证成年人
             * 3：实名认证8岁以下未成年人
             * 4：实名认证8-16岁未成年人
             * 5：实名认证16岁以上未成年人
             */
            Integer realNameAuthStatus = 0;

            //泡椒用户置换平台用户ID
            PpUser ppUser = ppUserService.findUser(userId);
            if (ppUser !=null){
            //查询用户是否实名
            PpUserRealNameAuth ppUserRealNameAuth = ppUserRealNameAuthService.findUserRealNameAuth(ppUser.getId());
            if (ppUserRealNameAuth != null) {
                String idNo = ppUserRealNameAuth.getIdNo().trim();//身份证
                Integer age = IdcardUtil.getAgeByIdNumber(idNo);//年龄
                realNameAuthStatus = IdcardUtil.getRealNameAuthStatus(age);//实名状态
                if (realNameAuthStatus == 1) {
                    return null;
                }
            }
            }
            int hour = DateUtil.getHour(now);

            //未成年人在 当日22:00到次日8:00在线，强制退出游戏。
            if (hour >= 22 || hour < 8) {
                retMap.put("event", OnlineEventType.EVENT_SIGN_OUT.id);
                return retMap;
            }

            //未成年人，查询当前用户/当前游戏在线时长
            Integer recordCount = SdkOnlineUserManager.inst().countUserStat(gameId, userId, now);
            if ((recordCount.intValue() * 60) >= (1.5 * 60 * 60)) {//在线时长大于等于1.5小时，弹窗覆盖无法游戏。
                retMap.put("event", OnlineEventType.EVENT_OVERTIME.id);
                return retMap;
            }
        } catch (Exception e) {
            log.error("防沉迷处理异常", e);
        }

        return null;


    }
}
