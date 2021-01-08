package com.paojiao.sdk3.service;

import com.paojiao.sdk3.common.DS;

import com.jfinal.plugin.activerecord.Db;
import com.paojiao.sdk3.model.PjMemberUserIdcard;
import org.apache.log4j.Logger;

public class PjMemberUserIdcardService {

    private static final Logger log = Logger.getLogger(PjMemberUserIdcardService.class);


    /**
     * 查询用户实名认证记录
     * @param userId
     * @return
     */
    public PjMemberUserIdcard findByUserId(Integer userId){
	String sql = "select * from  pj_member_user_idcard where uid=? and status = 1 limit 1";
	PjMemberUserIdcard user  = PjMemberUserIdcard.dao.use(DS.ucSlave).findFirst(sql, userId);
	return user;

    }


    public PjMemberUserIdcard findByIdcard(String idcard){
   	String sql = "select * from  pj_member_user_idcard where idcard=? and status = 1 limit 1";
   	PjMemberUserIdcard user  = PjMemberUserIdcard.dao.use(DS.ucSlave).findFirst(sql, idcard);
   	return user;

       }

    public int findByIdcard5(String idcard){
   	String sql = "select count(1) from  pj_member_user_idcard where idcard=? and status = 1";
   	return Db.use(DS.ucSlave).queryLong(sql, idcard).intValue();
       }







}
