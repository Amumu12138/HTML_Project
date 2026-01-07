package com.paojiao.sdk3.common.util.report;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.jfinal.kit.StrKit;
import com.paojiao.sdk3.common.PjConstants;
import com.paojiao.sdk3.common.util.https.HttpsUtil;
import org.apache.log4j.Logger;
import java.util.Map;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/**
 * @Auther: zhouzhenyi
 * @Date: 2020/6/3 14:03
 * @Description:数据上报工具
 */
public class ReportUtil {
    private static Logger log =  Logger.getLogger(ReportUtil.class);
    private static ExecutorService executorService = Executors.newFixedThreadPool(20);

    private static final String REPORT_HOST_URL = "https://report.paojiao.cn/report/";
    //private static final String REPORT_HOST_URL = "http://localhost:8288/report/";
    private static final String GET_IOS_CID_URL= REPORT_HOST_URL+"getIosCid";//获取ios cid
    private static final String REPORT_ACTIVATE_URL= REPORT_HOST_URL+"activate";//上报激活
    private static final String REPORT_REGISTER_URL= REPORT_HOST_URL+"register";//上报注册
    private static final String REPORT_RECHARGE_URL= REPORT_HOST_URL+"recharge";//上报充值



    /**
     * 匹配ios cid，匹配成功上报激活
     * @param reportData
     */
    public static String getIosCid(ReportData reportData){
        String cid = PjConstants.DEFAULT_CID;
        try{
            String reqStr = JSON.toJSONString(reportData);
            log.info("=========>>{"+reportData.getIdfa()+"}获取IOS CID BEGAIN:"+reqStr);

            Map<String,Object> param =  JSON.parseObject(JSON.toJSONString(reportData),Map.class);

            String res = HttpsUtil.post(GET_IOS_CID_URL,param,null);
            log.info("=========>>{"+reportData.getIdfa()+"}获取IOS CID END:"+res);

            if(StrKit.isBlank(res)){
                return cid;
            }

           JSONObject retData = JSON.parseObject(res);
            int code = retData.getInteger("code");
            if(code != 1){
                return cid;
            }

            JSONObject data = retData.getJSONObject("data");
            String retCid  = data.getString("cid");
             if(StrKit.notBlank(retCid)){
                  return retCid;
             }

        }catch (Exception e){
             log.error("获取IOS CID异常",e);
        }
        return cid;

    }


    /**
     * 上报激活
     * @param reportData
     */
    public static void reportActivate(ReportData reportData){
        try{

            Runnable work = new Runnable(){
                @Override
                public void run() {
                    String reqStr = JSON.toJSONString(reportData);
                    log.info("=========>>上报激活 BEGAIN:"+ reqStr);
                    Map<String,Object> param =  JSON.parseObject(reqStr,Map.class);
                    String res = HttpsUtil.post(REPORT_ACTIVATE_URL,param,null);
                    log.info("=========>>上报激活 END:"+res);
                }
            };


            executorService.execute(work);

        }catch (Exception e){
            log.error("上报激活异常");
        }

    }

    /**
     * 上报注册
     * @param reportData
     */
    public static void reportRegister(ReportData reportData){
        try{

            Runnable work = new Runnable(){
                @Override
                public void run() {
                    String reqStr = JSON.toJSONString(reportData);
                    log.info("=========>>上报注册 BEGAIN:"+reqStr);
                    Map<String,Object> param =  JSON.parseObject(reqStr,Map.class);
                    String res = HttpsUtil.post(REPORT_REGISTER_URL,param,null);
                    log.info("=========>>上报注册 END:"+res);
                }
            };


            executorService.execute(work);

        }catch (Exception e){
            log.error("上报注册异常");
        }

    }


    /**
     * 上报充值
     * @param reportData
     */
    public static void reportRecharge(ReportData reportData){
        try{

            Runnable work = new Runnable(){
                @Override
                public void run() {
                    String reqStr = JSON.toJSONString(reportData);
                    log.info("=========>>上报充值 BEGAIN:"+ reqStr);
                    Map<String,Object> param =  JSON.parseObject(reqStr,Map.class);
                    String res = HttpsUtil.post(REPORT_RECHARGE_URL,param,null);
                    log.info("=========>>上报充值 END:"+res);
                }
            };


            executorService.execute(work);

        }catch (Exception e){
            log.error("上报充值异常");
        }

    }







}


