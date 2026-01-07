package com.paojiao.sdk3.service;

import com.paojiao.sdk3.model.PpGame;
import com.paojiao.sdk3.model.PpPayCidDiscount;

import java.util.Map;

/**
 * PayService
 *
 * @author jiangkun
 * @date 2021/3/1
 */
public interface PayService {
    /**
     * 查询游戏cid充值折扣
     *
     * @param ppGame  游戏
     * @param channel cid
     * @return
     */
    public PpPayCidDiscount findCidDiscount(PpGame ppGame, String channel);


    /**
     * 查询游戏充值折扣信息
     * @return
     */
    public Map<String,Double> findGoldDiscount();


}
