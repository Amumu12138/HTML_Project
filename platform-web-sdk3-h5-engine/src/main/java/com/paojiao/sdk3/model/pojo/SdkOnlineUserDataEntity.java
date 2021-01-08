package com.paojiao.sdk3.model.pojo;

import java.util.Date;

/**
 * @Description 在线用户数据
 * @Author zhouzhenyi
 * @Date 2020/11/26
 **/
public class SdkOnlineUserDataEntity extends BaseEntity  {

    private int userId;//用户id
    private String cid;//cid
    private Date addDate;//记录添加日期
    private Date addTime;//记录添加时间
    private int gameId;//游戏id

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getCid() {
        return cid;
    }

    public void setCid(String cid) {
        this.cid = cid;
    }

    public Date getAddDate() {
        return addDate;
    }

    public void setAddDate(Date addDate) {
        this.addDate = addDate;
    }

    public Date getAddTime() {
        return addTime;
    }

    public void setAddTime(Date addTime) {
        this.addTime = addTime;
    }

    public int getGameId() {
        return gameId;
    }

    public void setGameId(int gameId) {
        this.gameId = gameId;
    }
}
