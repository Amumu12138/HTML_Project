package com.paojiao.sdk3.service;

import com.paojiao.sdk3.model.base.BasePpGameFlashScreen;

/**
 * PpGameFlashScreen
 *
 * @author jiangkun
 * @date 2020/12/31
 */
public interface PpGameFlashScreenService {
    //查询显示背景
   BasePpGameFlashScreen findGameFlashScreen(String gameId, String cid);
}
