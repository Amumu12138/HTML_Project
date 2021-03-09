package com.paojiao.sdk3.service;

import com.jfinal.plugin.activerecord.Record;
import com.paojiao.sdk3.model.PjThirdSdkOrder;
import com.paojiao.sdk3.model.PpOrder;
import com.paojiao.sdk3.model.PpUserVoucher;

import java.util.List;

/**
 * voucherService
 *
 * @author jiangkun
 * @date 2020/10/30
 */
public interface VoucherService {

    /**
     * @description: ${this}
     * @param puid     公共平台用户id
     * @param gameId  游戏id
     */
    public List<PpUserVoucher> findUserVoucherList(int puid ,  PjThirdSdkOrder order);

    /**
     * 校验用户代金券是否能在当前订单使用
     *
     * @param order     订单信息
     * @param voucherId 代金券id
     * @return
     */
    public PpUserVoucher checkUserVoucher(Integer puid,PjThirdSdkOrder order, Integer voucherId);

    /**
     * 更新用户代金券状态
     * @param order
     * @param userVoucher
     */
    void updateVoucherStatus(PpOrder order, PpUserVoucher userVoucher);

    /**
     * 查询用户可退还的代金券list
     * @param minutes 使用时间多少分钟内的代金券
     * @return
     */
    List<Record> findUserVoucherList(int minutes);

    /**
     * 退还用户代金券
     * @param id 用户代金券表id
     * @param orderNumber 代金券使用订单
     * @return
     */
    int returnVoucher(int id,String orderNumber);

    /**
     * 更新用户代金券状态
     * @param userVoucherId
     * @return
     */
    int updateVoucherStatus(Integer userVoucherId,String orderNumber);

    /**
     * 查询用户当前订单，能够领取的代金券
     *
     * @param order 订单信息
     * @return
     */
     int countCanReceiveVoucher(int puid, PjThirdSdkOrder order);
}
