package com.paojiao.sdk3.service.impl;

import com.paojiao.sdk3.common.DS;
import com.paojiao.sdk3.model.PpWallet;
import com.paojiao.sdk3.service.WalletService;

/**
 * WalletServiceImpl
 *
 * @author jiangkun
 * @date 2020/10/30
 */
public class WalletServiceImpl implements WalletService {
    @Override
    public PpWallet findUserWallet(int puid) {
        String sql = "select  * from  pp_wallet where puid = ? limit 1";
        PpWallet  wallet  = PpWallet.dao.use(DS.pubMaster).findFirst(sql, puid);
        return wallet;
    }
}
