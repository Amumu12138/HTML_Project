package com.paojiao.sdk3.service;


import com.paojiao.sdk3.model.PpGame;

/**
 * 游戏业务
 * @author zhouzhenyi
 * @date 2018年3月5日
 */
public interface GameService {

    /**
     * 根据游戏id查询游戏
     * @param gameid  游戏id
     * @return
     */
    public PpGame findGameById(int gameid);

    /**
     * 根据业务平台id、业务平台游戏id查询游戏
     * @param platform 业务平台id
     * @param gameid  业务平台游戏id
     * @return
     */
    public PpGame findGame(int platform, int gameid);


    /**
     * 根据业务平台id、业务平台游戏id查询游戏
     * @param platform 业务平台id
     * @param gameid  业务平台游戏id
     * @return
     */
    public PpGame findGame2(int platform, int gameid);




}
