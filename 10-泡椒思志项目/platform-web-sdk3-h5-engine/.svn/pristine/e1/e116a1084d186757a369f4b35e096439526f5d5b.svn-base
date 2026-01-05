package com.paojiao.sdk3.service;

import com.paojiao.sdk3.model.PpPayConfig;

import java.util.List;

/**
 * 支付配置
 * @author zhouzhenyi
 * @date 2018年3月8日
 */
public interface PayConfigService {

    public PpPayConfig findById(int id);


    /**
     * 查询游戏支付方式
     * @param gameid  游戏id（非业务平台游戏id）
     * @return
     */
    public List<PpPayConfig> findGamePay(int gameid);

    /**
     * 查询对应平台默认配置，游戏id 为 0
     * @param platform
     * @return
     */
    public List<PpPayConfig> findPlatformPay(Integer platform);

    /**
     * 查询渠道支付配置
     * 根据cid和业务平台游戏id，查询渠道ID,根据渠道id获得支付配置
     * @param platform 业务平台id
     * @param gameId 业务平台游戏id
     * @param cid  业务平台cid
     * @return
     */
    List<PpPayConfig> findChannelPay(int platform, int gameId, String cid);
}
