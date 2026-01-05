package com.paojiao.sdk3.service.impl;

import com.jfinal.kit.StrKit;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Record;
import com.paojiao.sdk3.common.DS;
import com.paojiao.sdk3.common.util.SDKUtil;
import com.paojiao.sdk3.model.PjThirdSdkOrder;
import com.paojiao.sdk3.model.PpOrder;
import com.paojiao.sdk3.model.PpUserVoucher;
import com.paojiao.sdk3.service.VoucherService;
import org.apache.log4j.Logger;

import java.util.ArrayList;
import java.util.List;

/**
 * VoucherServiceImpl
 *
 * @author jiangkun
 * @date 2020/10/30
 */
public class VoucherServiceImpl implements VoucherService {

    private final Logger log = Logger.getLogger(VoucherServiceImpl.class);


    /**
     * 查询用户已领取、未使用、未过期的代金券
     * 判断代金券，在当前游戏、当前订单是否可用
     *
     * @int 公共平台 puid , 游戏ID gameId
     * @return
     */
    @Override
    public List<PpUserVoucher> findUserVoucherList(int puid, PjThirdSdkOrder order) {
        int gameId = order.getGameId();
        String sql = "select a.*,DATEDIFF(a.expired_end,CURDATE())+1 as 'expiredDays' from pp_user_voucher a where  a.puid = ? and a.use_status = 2 and a.status = 1 and CURDATE() >= a.expired_start " +
                "and CURDATE() <= a.expired_end order by a.id desc";
        List<PpUserVoucher> userVoucherList = PpUserVoucher.dao.use(DS.pubMaster).find(sql, puid);
        List<PpUserVoucher> newVoucherList = new ArrayList<PpUserVoucher>();


        for (PpUserVoucher ppUserVoucher : userVoucherList) {
            Boolean canUse = true;//默认可用
            //适用范围判断 适用范围；1指定游戏，2全平台
            if (ppUserVoucher.getApplicableRange() == 1 && StrKit.notBlank(ppUserVoucher.getGameIds())) {
                if (!SDKUtil.containGameId(gameId, ppUserVoucher.getGameIds())) {
                    canUse = false;
                }
            }

            if (canUse) {
                //当前订单金额是否符合代金券使用条件
                int rule = ppUserVoucher.getRule();//满减规则；1有门槛，2无门槛
                if (rule == 1) {
                    if (order.getMoney().doubleValue() < ppUserVoucher.getAchieveMoney().doubleValue()) {
                        canUse = false;
                    }
                }
            }
            ppUserVoucher.put("canUse", canUse);
            newVoucherList.add(ppUserVoucher);
        }

        return newVoucherList;
    }

    @Override
    public PpUserVoucher checkUserVoucher(Integer puid,PjThirdSdkOrder order, Integer userVoucherId) {

        int gameId = order.getGameId();
        String sql = "select * from pp_user_voucher a where  a.puid = ? and a.id = ? and a.use_status = 2 and CURDATE() >= a.expired_start " +
                "and CURDATE() <= a.expired_end ORDER BY a.expired_end asc limit 1";
        PpUserVoucher ppUserVoucher = PpUserVoucher.dao.use(DS.pubMaster).findFirst(sql, puid, userVoucherId);
        if (ppUserVoucher == null) {
            return null;
        }

        //当前游戏是否符合代金券使用条件
        if (!SDKUtil.containGameId(gameId, ppUserVoucher.getGameIds())) {
            return null;
        }

        //当前订单金额是否符合代金券使用条件
        int rule = ppUserVoucher.getRule();//满减规则；1有门槛，2无门槛
        if (rule == 1 && order.getMoney().doubleValue() < ppUserVoucher.getAchieveMoney().doubleValue()) {
            return null;
        }

        return ppUserVoucher;
    }

    @Override
    public void updateVoucherStatus(PpOrder order, PpUserVoucher userVoucher) {
        try {
            //更新用户代金券状态
            String sql = "update pp_user_voucher set use_status = 3,use_date = now(),use_order = ? where id = ?";
            Db.use(DS.pubMaster).update(sql, order.getOrderNumber(), userVoucher.getId());
            log.info("========>>更新用户代金券:orderNumber:" + order.getOrderNumber() + ",代金券ID:" + userVoucher.getId());

            //更新代金券使用数量
            if (userVoucher.getVoucherId() != null) {
                sql = "update pp_voucher set quantity = quantity + 1 where id = ?";
                Db.use(DS.pubMaster).update(sql, userVoucher.getVoucherId());
                log.info("========>>更新用户代金券使用数量:orderNumber:" + order.getOrderNumber() + ",代金券ID:" + userVoucher.getId());
            }
        } catch (Exception e) {
            log.error("更新代金券状态异常", e);
        }

    }


    @Override
    public List<Record> findUserVoucherList(int minutes) {
        StringBuilder sb = new StringBuilder();
        sb.append("SELECT a.id,a.use_status,a.puid,a.voucher_id,a.use_order ");
        sb.append("FROM pp_user_voucher a LEFT JOIN pp_order b ON a.use_order = b.order_number ");
        sb.append("WHERE ");
        sb.append("a.use_status = 3 AND a.use_order is not null AND a.status = 1 AND a.use_date >= DATE_SUB(NOW(),INTERVAL ? MINUTE) and b.status = 0");
        List<Record> userVoucherList = Db.use(DS.pubMaster).find(sb.toString(), minutes);
        return userVoucherList;
    }

    @Override
    public int returnVoucher(int id, String orderNumber) {
        String sql = "update pp_user_voucher set use_date = null,use_order=null,use_status = 2 where id = ? and use_status = 3 and use_order = ?";
        int rows = Db.use(DS.pubMaster).update(sql, id, orderNumber);
        return rows;
    }

    @Override
    public int updateVoucherStatus(Integer userVoucherId, String orderNumber) {
        String sql = "update pp_user_voucher set use_date = now(),use_order=?,use_status = 3 where id = ?";
        int rows = Db.use(DS.pubMaster).update(sql, orderNumber, userVoucherId);
        return rows;
    }
}
