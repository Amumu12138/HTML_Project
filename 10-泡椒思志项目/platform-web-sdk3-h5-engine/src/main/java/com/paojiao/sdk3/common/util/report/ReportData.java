package com.paojiao.sdk3.common.util.report;

import com.alibaba.fastjson.annotation.JSONField;

import java.util.Date;


/**
 * sdk上报数据
 */
public class ReportData {

    private Integer reportSys;//上报系统类型，1:安卓 2：IOS
    private Integer reportType;//上报类型，1:激活 2：注册 3：充值
    private Integer gameId;//游戏ID
    private String cid;//渠道号
    private String ip;
    private String mac;//mac地址
    private String imei;//安卓设备imei
    private String os;//系统类型
    private String ua;
    private Integer clickType;//点击类型，1:不需要跳转 2：需要跳转
    private Date addTime;//添加时间
    private String referer;//来源
    private String clickId;
    private String activeCallBackUrl;//激活回调
    private String regCallBackUrl;//注册回调
    private String imeiMd5;
    private String oaid;
    private String oaidMd5;
    private String idfa;
    private String idfaMd5;

    private Integer aid;//广告配置主id

    @JSONField(format = "yyyy-MM-dd HH:mm:ss")
    private Date payFinishedTime;//充值完成时间

    private Double payMoney;//充值金额
    private String orderNumber;//订单号
    private Integer uid;//用户id


    public Integer getReportSys() {
        return reportSys;
    }

    public void setReportSys(Integer reportSys) {
        this.reportSys = reportSys;
    }

    public Integer getReportType() {
        return reportType;
    }

    public void setReportType(Integer reportType) {
        this.reportType = reportType;
    }

    public Integer getGameId() {
        return gameId;
    }

    public void setGameId(Integer gameId) {
        this.gameId = gameId;
    }

    public String getCid() {
        return cid;
    }

    public void setCid(String cid) {
        this.cid = cid;
    }

    public String getIp() {
        return ip;
    }

    public void setIp(String ip) {
        this.ip = ip;
    }

    public String getMac() {
        return mac;
    }

    public void setMac(String mac) {
        this.mac = mac;
    }

    public String getImei() {
        return imei;
    }

    public void setImei(String imei) {
        this.imei = imei;
    }

    public String getOs() {
        return os;
    }

    public void setOs(String os) {
        this.os = os;
    }

    public String getUa() {
        return ua;
    }

    public void setUa(String ua) {
        this.ua = ua;
    }

    public Integer getClickType() {
        return clickType;
    }

    public void setClickType(Integer clickType) {
        this.clickType = clickType;
    }

    public Date getAddTime() {
        return addTime;
    }

    public void setAddTime(Date addTime) {
        this.addTime = addTime;
    }

    public String getReferer() {
        return referer;
    }

    public void setReferer(String referer) {
        this.referer = referer;
    }

    public String getClickId() {
        return clickId;
    }

    public void setClickId(String clickId) {
        this.clickId = clickId;
    }

    public String getActiveCallBackUrl() {
        return activeCallBackUrl;
    }

    public void setActiveCallBackUrl(String activeCallBackUrl) {
        this.activeCallBackUrl = activeCallBackUrl;
    }

    public String getRegCallBackUrl() {
        return regCallBackUrl;
    }

    public void setRegCallBackUrl(String regCallBackUrl) {
        this.regCallBackUrl = regCallBackUrl;
    }

    public String getImeiMd5() {
        return imeiMd5;
    }

    public void setImeiMd5(String imeiMd5) {
        this.imeiMd5 = imeiMd5;
    }

    public String getOaid() {
        return oaid;
    }

    public void setOaid(String oaid) {
        this.oaid = oaid;
    }

    public String getOaidMd5() {
        return oaidMd5;
    }

    public void setOaidMd5(String oaidMd5) {
        this.oaidMd5 = oaidMd5;
    }

    public String getIdfa() {
        return idfa;
    }

    public void setIdfa(String idfa) {
        this.idfa = idfa;
    }

    public String getIdfaMd5() {
        return idfaMd5;
    }

    public void setIdfaMd5(String idfaMd5) {
        this.idfaMd5 = idfaMd5;
    }

    public Integer getAid() {
        return aid;
    }

    public void setAid(Integer aid) {
        this.aid = aid;
    }

    public Date getPayFinishedTime() {
        return payFinishedTime;
    }

    public void setPayFinishedTime(Date payFinishedTime) {
        this.payFinishedTime = payFinishedTime;
    }

    public Double getPayMoney() {
        return payMoney;
    }

    public void setPayMoney(Double payMoney) {
        this.payMoney = payMoney;
    }

    public String getOrderNumber() {
        return orderNumber;
    }

    public void setOrderNumber(String orderNumber) {
        this.orderNumber = orderNumber;
    }

    public Integer getUid() {
        return uid;
    }

    public void setUid(Integer uid) {
        this.uid = uid;
    }
}
