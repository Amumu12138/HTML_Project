package com.paojiao.sdk3.service;

import com.paojiao.sdk3.model.PpUserRealNameAuth;

/**
 * PpUserRealNameAuth
 *
 * @author jiangkun
 * @date 2020/12/16
 */
public interface PpUserRealNameAuthService {
    //查询实名记录
     PpUserRealNameAuth findUserRealNameAuth(Integer puid);
}
