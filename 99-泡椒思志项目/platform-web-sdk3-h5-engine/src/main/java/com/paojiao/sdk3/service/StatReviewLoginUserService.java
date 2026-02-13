package com.paojiao.sdk3.service;

import com.paojiao.sdk3.common.DS;
import com.paojiao.sdk3.common.util.PjMap;
import com.paojiao.sdk3.common.util.email.PjSdkUtil;
import com.paojiao.sdk3.model.StatReviewLoginUser;
import org.apache.log4j.Logger;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * StatReviewLoginUserService
 *
 * @author jiangkun
 * @date 2020/10/23
 */
public class StatReviewLoginUserService {
    public static final Logger log = Logger.getLogger(StatReviewLoginUserService.class);

    public StatReviewLoginUser save(StatReviewLoginUser statReviewLoginUser) {
        return statReviewLoginUser.use(DS.sdkMaster).save() == true ? statReviewLoginUser : null;
    }

    public void saveReviewLoginByEmail(PjMap<String, String> params) {
        StatReviewLoginUser statReviewLoginUser = new StatReviewLoginUser();
        //需要保存的参数
        statReviewLoginUser.setUid(params.getToInt("uid"));
        statReviewLoginUser.setUserName(params.get("userName"));
        statReviewLoginUser.setCid(params.get("channel"));
        statReviewLoginUser.setGameId(params.getToInt("gameId"));
        statReviewLoginUser.setCreateDate(new Date());
        statReviewLoginUser.setCreateTime(new Date());
        statReviewLoginUser.setUdid(params.get("udid"));
        statReviewLoginUser.setIp(params.get("ip"));
        statReviewLoginUser.setSsid("");
        statReviewLoginUser.setToken(params.get("token"));
        statReviewLoginUser.setModel(params.get("mobile"));

        //保存提审ip登录记录
        save(statReviewLoginUser);
        //发送邮件的内容
        Map<String, Object> report = new HashMap<>();
        report.put("游戏名称：", params.get("gameName"));
        report.put("访问路径：", params.get("method"));
        report.put("访问时间：", new Date());
        report.put("访问IP:", params.get("ip"));
        report.put("访问参数：", params.toString());
        //发送邮件
        PjSdkUtil.sendReviewEmail(params.get("ip"), report);
    }

    public static void main(String[] args) {
        Map<String, Object> report = new HashMap<>();
        report.put("游戏名称：", "tset");
        report.put("访问路径：", "test");
        report.put("访问时间：", new Date());
        report.put("访问IP:", "127.0.0.1");
        report.put("访问参数：", "测试邮件");
        //发送邮件
        PjSdkUtil.sendReviewEmail("127.0.0.1", report);
    }
}
