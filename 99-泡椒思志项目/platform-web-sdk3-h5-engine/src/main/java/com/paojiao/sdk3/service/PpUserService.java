package com.paojiao.sdk3.service;

import com.paojiao.sdk3.model.PpUser;

/**
 * PpUserService
 *
 * @author jiangkun
 * @date 2020/10/30
 */
public interface PpUserService {
    /**
     * 查找用户信息
     * @param userId
     * @return
     */
    public PpUser findUser(int userId);

   /* *//**
     * 查找用户信息
     * @param platform   业务平台id
     * @param uid  业务平台用户id
     * @return
     *//*
    public PpUser findUser(int platform,int uid,String ip);

    public PpUser findUser2(int platform,int uid);
*/

}
