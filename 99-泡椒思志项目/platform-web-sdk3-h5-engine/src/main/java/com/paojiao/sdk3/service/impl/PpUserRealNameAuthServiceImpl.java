package com.paojiao.sdk3.service.impl;

import com.paojiao.sdk3.common.DS;
import com.paojiao.sdk3.model.PpUser;
import com.paojiao.sdk3.model.PpUserRealNameAuth;
import com.paojiao.sdk3.service.PpUserRealNameAuthService;

/**
 * PpUserRealNameAuthServiceImpl
 *
 * @author jiangkun
 * @date 2020/12/16
 */
public class PpUserRealNameAuthServiceImpl implements PpUserRealNameAuthService {
    @Override
    public PpUserRealNameAuth findUserRealNameAuth(Integer puid) {
        String sql = "select * from pp_user_real_name_auth where puid=?  limit 1";
        return PpUserRealNameAuth.dao.use(DS.pubMaster).findFirst(sql, puid);
    }
}
