package com.paojiao.sdk3.service;

import com.paojiao.sdk3.common.DS;
import com.paojiao.sdk3.model.PjCpGame;

/**
 * @Auther: zhouzhenyi
 * @Date: 2019/3/7 14:30
 * @Description:
 */
public class PjCpGameService  {


    public PjCpGame findGameById(int gameId){
        String sql = "select * from pj_cp_game where id = ?";
        return PjCpGame.dao.use(DS.sdkSlave).findFirst(sql,gameId);

    }

}
