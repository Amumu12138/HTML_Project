package com.paojiao.sdk3.service.impl;

import com.jfinal.kit.StrKit;
import com.paojiao.sdk3.common.DS;
import com.paojiao.sdk3.model.PpGame;
import com.paojiao.sdk3.model.PpPayCidDiscount;
import com.paojiao.sdk3.model.PpPaygoldSetting;
import com.paojiao.sdk3.service.PayService;

import java.util.HashMap;
import java.util.Map;

/**
 * PayServiceServiceImpl
 *
 * @author jiangkun
 * @date 2021/3/1
 */
public class PayServiceImpl implements PayService {
    @Override
    public PpPayCidDiscount findCidDiscount(PpGame ppGame, String channel) {
        Integer mainGameId = ppGame.getMainGameId();
        Integer platformGameId = ppGame.getPlatformGameId();
        if (StrKit.isBlank(channel) || platformGameId == null || mainGameId == null) {
            return null;
        }
        PpPayCidDiscount config = findCidDis(1, mainGameId, platformGameId, channel);
        if (config == null) {
            config = findCidDis(2, mainGameId, platformGameId, channel);
        }
        if (config == null) {
            config = findCidDis(3, mainGameId, platformGameId, channel);
        }
        return config;
    }


    /**
     * 查询游戏折扣
     *
     * @param queryType      查询类型 1:游戏、cid 2：游戏 3：主游戏
     * @param mainGameId
     * @param platformGameId
     * @param channel
     * @return
     */
    private PpPayCidDiscount findCidDis(int queryType, Integer mainGameId, Integer platformGameId, String channel) {

        StringBuilder sb = new StringBuilder("select * from pp_pay_cid_discount where status = 1");
        sb.append(" and CURDATE() >=start_date and CURDATE() <= end_date");
        sb.append(" and main_game_id = " + mainGameId);
        //按游戏id、cid查询
        if (queryType == 1) {
            sb.append(" and game_id=" + platformGameId).append(" and FIND_IN_SET('" + channel + "',cid)");
        }
        //按游戏查询
        if (queryType == 2) {
            sb.append(" and game_id=" + platformGameId).append(" and (cid is null or cid ='')");
        }
        //按主游戏查询
        if (queryType == 3) {
            sb.append(" and (cid is null or cid ='')").append(" and game_id is null");
        }
        sb.append(" ORDER BY update_date desc limit 1");
        PpPayCidDiscount config = PpPayCidDiscount.dao.use(DS.pubMaster).findFirst(sb.toString());
        return config;
    }

    @Override
    public Map<String, Double> findGoldDiscount() {
        Map<String, Double> goldDiscount = new HashMap<>();

        //查询充值最小折扣
        String sql = "select * from pp_paygold_setting where setting_type= 2 and status = 1 and discount < 1 " +
                "and CURDATE() >= start_date and CURDATE() <= end_date ORDER BY discount desc limit 1";
        PpPaygoldSetting config = PpPaygoldSetting.dao.use(DS.pubMaster).findFirst(sql);
        if (config == null) {
            return null;
        }
        goldDiscount.put("lowDiscount", config.getDiscount());

        //查询最大充值折扣金额
        sql = "select ROUND(price*(1-discount),2) as discountMoney from pp_paygold_setting where setting_type= 2 and status = 1 and discount < 1 " +
                "and CURDATE() >= start_date and CURDATE() <= end_date ORDER BY discountMoney desc limit 1";
        config = PpPaygoldSetting.dao.use(DS.pubMaster).findFirst(sql);
        goldDiscount.put("maxDiscountMoney", config.getDouble("discountMoney"));

        return goldDiscount;
    }

}
