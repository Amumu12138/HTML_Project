package com.paojiao.sdk3.service.impl;

import com.paojiao.sdk3.common.DS;
import com.paojiao.sdk3.model.PpGameFlashScreen;
import com.paojiao.sdk3.model.base.BasePpGameFlashScreen;
import com.paojiao.sdk3.service.PpGameFlashScreenService;

/**
 * PpGameFlashScreenServiceImpl
 * 游戏包闪图配置表查询
 * @author jiangkun
 * @date 2020/12/31
 */
public class PpGameFlashScreenServiceImpl implements PpGameFlashScreenService {
    @Override
    public BasePpGameFlashScreen findGameFlashScreen(String gameId, String cid) {
        String sql = "select * from pp_game_flash_screen where platform_game_id = ? and status = 1 and start_time <=current_timestamp() " +
                "and end_time >= current_timestamp() " +
                "and FIND_IN_SET(?,cid) limit 1" ;
        BasePpGameFlashScreen ppGameFlashScreen= PpGameFlashScreen.dao.use(DS.pubMaster).findFirst(sql,gameId,cid);
        return ppGameFlashScreen;
    }
}
