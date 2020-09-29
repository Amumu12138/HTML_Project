package com.paojiao.sdk3.service;

import java.util.Date;
import java.util.List;

import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.DbPro;
import com.paojiao.sdk3.common.DS;
import com.paojiao.sdk3.common.PjConstants;
import com.paojiao.sdk3.model.PjUserVip;
import com.paojiao.sdk3.model.PjUserVipConfig;
import com.paojiao.sdk3.model.PjUserVipGrowthRecord;

public class UserVipService {


    /**
     * 查询用户vip等级
     * @param uid
     * @return
     */
    public PjUserVip findUserVip(int uid){
	String sql = "select * from pj_user_vip where uid= ?";
	PjUserVip vip = PjUserVip.dao.use(DS.sdkSlave).findFirst(sql, uid);
	return vip;
    }

    /**
     * vip等级配置
     * @param vipLvl
     * @return
     */
    public PjUserVipConfig findUserVipConfig(int vipLvl){
   	String sql = "select * from pj_user_vip_config where vipLvl= ?";
   	PjUserVipConfig vip = PjUserVipConfig.dao.use(DS.sdkSlave).findFirst(sql, vipLvl);
   	return vip;
       }


    /**
     * 修改用户vip
     * @param userVip
     */
    public  void  updateUserVip(PjUserVip userVip){
	String sql =" UPDATE pj_user_vip set payMoney = (payMoney+?),vipFraction = (vipFraction+?),points = (points+?),vipLvl=?"
		+ ",updateTime = now(),lastRechargeTime = now() where uid = ?";
	Db.use(DS.sdkSlave).update(sql, userVip.getPayMoney(),userVip.getVipFraction(),userVip.getPoints()
		,userVip.getVipLvl(),userVip.getUid());
    }


    public void insertUserVip(PjUserVip userVip){
	Date date = new Date();
	userVip.setUpdateTime(date);
	userVip.setAddTime(date);
	userVip.setLastRechargeTime(date);
	userVip.setLastActiveTime(date);
	userVip.setCreatedTime(date);
	userVip.use(DS.sdkSlave).save();
    }


    public List<PjUserVipConfig> findUserVipConfigs(){
	String sql = "SELECT  * from pj_user_vip_config";
	List<PjUserVipConfig> list = PjUserVipConfig.dao.use(DS.sdkSlave).find(sql);
	return list;
    }


    public void insertUserGrowth(PjUserVipGrowthRecord pjUserVipGrowthRecord){
	pjUserVipGrowthRecord.setAddTime(new Date());
	pjUserVipGrowthRecord.use(DS.sdkSlave).save();
    }







}
