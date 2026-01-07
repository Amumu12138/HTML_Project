package com.paojiao.sdk3.controller;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.jfinal.aop.Before;
import com.jfinal.aop.Clear;
import com.jfinal.aop.Inject;
import com.jfinal.kit.HttpKit;
import com.jfinal.kit.JsonKit;
import com.jfinal.kit.StrKit;
import com.paojiao.sdk3.common.PayStyle;
import com.paojiao.sdk3.common.PjConstants;
import com.paojiao.sdk3.common.StatusType;
import com.paojiao.sdk3.common.mongo.manager.LoginSessionManager;
import com.paojiao.sdk3.common.util.*;
import com.paojiao.sdk3.common.util.https.HttpsUtil;
import com.paojiao.sdk3.common.util.report.ReportData;
import com.paojiao.sdk3.common.util.report.ReportUtil;
import com.paojiao.sdk3.common.util.report.SyncType;
import com.paojiao.sdk3.common.util.report.SysType;
import com.paojiao.sdk3.controller.pay.config.PayConfig;
import com.paojiao.sdk3.controller.pay.util.PaySignUtil;
import com.paojiao.sdk3.controller.thirdsdk.*;
import com.paojiao.sdk3.handler.StatHandler;
import com.paojiao.sdk3.interceptor.DomainInterceptor;
import com.paojiao.sdk3.model.*;
import com.paojiao.sdk3.model.base.BasePpGameFlashScreen;
import com.paojiao.sdk3.model.base.BaseStatGameRole;
import com.paojiao.sdk3.model.pojo.LoginEntity;
import com.paojiao.sdk3.service.*;
import com.paojiao.sdk3.service.impl.PpGameFlashScreenServiceImpl;
import com.paojiao.sdk3.service.impl.StatDeviceCidServiceImpl;
import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import static com.paojiao.sdk3.controller.pay.config.PayConfig.platform;

@Before(DomainInterceptor.class)
public class SdkController extends BaseController {
    private static Logger log = Logger.getLogger(SdkController.class);
    static final String resultStr = null;

    @Inject
    private PjMemberUserService userService;
    @Inject
    private PjThirdSdkOrderService orderService;
    @Inject
    private PjMemberUserIdcardService userIdcardService;
    @Inject
    private PjThirdSdkChannelGameService channelGameService;
    @Inject
    private PjCpGameService gameService;
    @Inject
    private PjThirdSdkChannelService channelService;
    @Inject
    private StatNewUserService statNewUserService;
    @Inject
    private PjMemberBindingService bindService;
    @Inject
    private StatHandler statHandler;
    @Inject
    private StatGameRoleService statGameRoleService;
    @Inject
    private StatReviewLoginUserService statReviewLoginUserService;

    private StatDeviceCidService statDeviceCidService = new StatDeviceCidServiceImpl();
    private PpGameFlashScreenService ppGameFlashScreenService = new PpGameFlashScreenServiceImpl();

    private PjThirdSdkChannel sdkChannel;
    private PjThirdSdkChannelGame channelGame;
    private PjCpGame game;
    private PjMemberBinding buser;
    //360角色上报url
    private static final String ROLEREPORTEDURL = "https://dd.mgame.360.cn/t/gameinfo/log";
    //泡椒H5登录URL
    private static final String PAOJIAOLOGINURL = "https://h5.paojiao.cn/login.html";
    //泡椒H5登录URL-SDK2.0
    private static final String PAOJIAOLOGINURLV2 = "https://h5.paojiao.cn/login2.html";

    //泡椒H5登录URL-SDK2.0
    private static final String PAOJIAOMAINURLV2 = "https://h5.paojiao.cn/main.html";
    private static final String PAOJIAOMAINURLV3 = "https://h5.paojiao.cn/main3.html";
    //private static final String PAOJIAOMAINURLV2 = "http://10.11.181.200:8080/main.html";


    //sdk2.0 获取SDK配置URL
    private static final String GETSDKCONFIGURL = "https://sdk2.paojiao.cn/sdk/sdkConfig";

    // 获取游戏信息
    @SuppressWarnings("rawtypes")
    public void getGameInfo() {
        try {

            log.info("==========>>获取游戏信息：" + JsonKit.toJson(getParaMap1()));

            String vr = initRquest(0);
            Map initResult = JsonKit.parse(vr, Map.class);

            if (initResult.get("code") != null
                    && (StatusType.AUTH_SUCCESS.id != (Integer) initResult
                    .get("code"))) {
                this.renderJson(vr);
                return;
            }

            Map<String, String> gameInfo = new HashMap<String, String>();

            gameInfo.put("gameUrl", channelGame.getGameUrl());// 游戏入口
            gameInfo.put("gameName", channelGame.getGameName());// 渠道游戏名称
            gameInfo.put("gameId", channelGame.getGameId() + "");// 游戏id
            gameInfo.put("channelGameId", channelGame.getId() + "");// 游戏id
            gameInfo.put("orientation", channelGame.getOrientation() + "");// 游戏方向


            // 统计新增游戏设备或活跃设备
            try {
                if (getParaToBoolean("isLogin")) {//只有打开登录页面，才会记录
                    StatNewClient client = new StatNewClient();
                    client.setImei(getPara("udid"));
                    client.setMac(getPara("udid"));
                    client.setCreateDate(new Date());
                    client.setCreateTime(new Date());
                    client.setGameId(game.getId());
                    client.setModel(getClientIp());
                    client.setCid(getPara("channel"));
                    statHandler.saveClientStat(client);
                }
            } catch (Exception e) {
                log.error("统计新增/活跃用户异常", e);
            }

            this.requestSuccess("获取游戏信息成功", gameInfo);
        } catch (Exception ex) {
            log.error("获取游戏信息异常", ex);
            this.requestFailure(StatusType.CHANNEL_GAME_EXCEPTION);
        }
    }

    /**
     * 获取悬浮菜单
     */
    @SuppressWarnings("rawtypes")
    public void openGame() {
        try {
            PjMap<String, String> param = getParaMap1();

            String sign = SignUtil.generateSign2(param, PjConstants.SDK_SIGN_KEY);
            param.put("sign", sign);
            log.info("------获取悬浮请求参数：" + param.toString());
            String retData = HttpKit.get(PjConstants.sconfig.getNgOpenGameUrl(), param);
            log.info("==========>>获取悬浮菜单：" + retData);
            Map reMap = JsonKit.parse(retData, Map.class);
            if ("1".equals(reMap.get("code").toString())) {
                JSONObject ret = JSONObject.parseObject(reMap.get("data").toString());
                JSONArray array = ret.getJSONArray("setting");
                super.requestSuccess("获取悬浮菜单成功！", array);
                return;
            } else {
                super.requestFailure("获取悬浮菜单失败");
                return;
            }

        } catch (Exception ex) {
            log.error("获取悬浮菜单异常", ex);
            this.requestFailure(StatusType.INIT_FLOAT_BOX_EXCEPTION);
        }

    }

    /**
     * 生成用户中心url
     */
    public void openUc() {
        try {
            PjMap<String, String> param = getParaMap1();

            String uchost = param.get("ucHost");
            param.remove("ucHost");

            String sign = SignUtil.generateSign2(param, PjConstants.SDK_SIGN_KEY);
            param.put("sign", sign);

            String url = uchost + "?" + SignUtil.sortParam2(param);
            this.requestSuccess("success", url);

        } catch (Exception ex) {
            log.error("打开用户中心异常", ex);
            this.requestFailure(StatusType.OPEN_UC_EXCEPTION);
        }

    }

    /**
     * 登录
     */
    @SuppressWarnings("rawtypes")
    public void login() {

        try {

            log.info("==========>>登录：" + JsonKit.toJson(getParaMap1()));

            String vr = initRquest(5);
            Map initResult = JsonKit.parse(vr, Map.class);

            if (initResult.get("code") != null
                    && (StatusType.AUTH_SUCCESS.id != (Integer) initResult
                    .get("code"))) {
                this.renderJson(vr);
                return;
            }

            PjMap<String, String> param = getParaMap1();
            String retData = HttpKit.get(PjConstants.sconfig.getNgLoginUrl(), param);
            log.info("==========>>登录结果：" + retData);
            Map reMap = JsonKit.parse(retData, Map.class);
            if ("1".equals(reMap.get("code").toString())) {
                Map<String, Object> returnMap = new HashMap<String, Object>();
                JSONObject ret = JSONObject.parseObject(reMap.get("data").toString());
                returnMap.put("uid", ret.getString("uid"));
                returnMap.put("token", ret.getString("token"));
                returnMap.put("openRealNameAuth", ret.getString("openRealNameAuth"));
                returnMap.put("realNameAuthStatus", ret.getString("realNameAuthStatus"));
                returnMap.put("bindMobile", ret.getString("bindMobile"));

                //17.开头的IP做记录
                String ip = getClientIp();
                if (ip.startsWith("17.")) {
                    PjThirdSdkChannelGame sdkChannelGame = channelGameService.findGameById(param.getToInt("channelGameId"));
                    String mobileType = UaUtil.getMobileType(getRequest());
                    log.info("------苹果审核提醒------IP:" + ip);
                    param.put("uid", ret.getString("uid"));
                    param.put("token", ret.getString("token"));
                    param.put("method", "login");
                    param.put("mobile", mobileType);
                    param.put("ip", ip);
                    param.put("gameName", sdkChannelGame.getGameName());
                    param.put("gameId", sdkChannelGame.getGameId().toString());
                    statReviewLoginUserService.saveReviewLoginByEmail(param);
                }
                //拉起微信授权
                String wxUrl = isWxLoginOpenId(getPara("channelGameId"), getPara("channel"));
                if (StringUtils.isNotEmpty(wxUrl)) {
                    returnMap.put("payUrl", wxUrl);
                }

                super.requestSuccess("登录成功!", returnMap);
                return;
            } else {
                super.requestFailure(reMap.get("msg").toString());
                return;
            }

        } catch (Exception e) {
            log.error("登录异常！", e);
            super.requestFailure(StatusType.PJ_LOGIN_EXCEPTION);
            return;
        }

    }

    /**
     * 注册
     */
    @SuppressWarnings({"static-access", "rawtypes"})
    public void reg() {

        try {

            log.info("==========>>注册：" + JsonKit.toJson(getParaMap1()));

            Map<String, String> reqParams = getParaMap1();
            Integer channelGameId = getParaToInt("channelGameId");
            int status = 1;
            if (channelGameId == null) {
                this.renderJson(super.stateFailure(StatusType.CHANNEL_GAME_NONE));
                return;
            }
            this.channelGame = channelGameService.findGameById(getParaToInt("channelGameId"));
            if (channelGame == null || channelGame.getStatus() == 10) {
                this.renderJson(super.stateFailure(StatusType.CHANNEL_GAME_NONE));
                return;
            }
            this.game = gameService.findGameById(channelGame.getGameId());
            if (game == null) {
                this.renderJson(super.stateFailure(StatusType.GAME_NONE));
                return;
            }
            this.sdkChannel = channelService.findChannelById(channelGame.getSdkChannelId());

            if (sdkChannel == null) {
                this.renderJson(super.stateFailure(StatusType.SDK_CHANNEL_NONE));
                return;
            }

            reqParams.put("gameId", game.getId() + "");

            String ip = getClientIp();
            reqParams.put("ip", ip);
            String sign = SignUtil.generateSign2(reqParams, PjConstants.SDK_SIGN_KEY);
            reqParams.put("sign", sign);
            String regUrl = PjConstants.sconfig.getNgRegUrl();
            if ("y".equals(getPara("a"))) {// 一键注册
                regUrl = PjConstants.sconfig.getNgRandomUserUrl();
            }
            String postResult = HttpsUtil.post(regUrl, reqParams, null);

            Map regResult = JsonKit.parse(postResult, Map.class);
            if (regResult != null && (Integer) regResult.get("code") == 1 && channelGame != null) {
                PjMemberUser user = new PjMemberUser();
                Map user1 = (Map) regResult.get("data");
                user.setId((Integer) user1.get("uid"));
                user.setUdid((String) user1.get("udid"));
                user.setUserName((String) user1.get("userName"));
                SDKVerifyResult sdkResult = new SDKVerifyResult();
                sdkResult.setNickName(user.getNiceName());
                sdkResult.setUserID(user.getId() + "");
                sdkResult.setUserName(user.getUserName());
                // 绑定到sdk用户
                String cid = getPara("channel");
                if (cid == null) {
                    cid = PjConstants.SDK_CODE_PJH5;
                }
                user.setCid(cid);

                String bindType = PjConstants.SDK_CODE_H5_SDK3;
                if (PjConstants.SDK_CODE_PJH5.equals(sdkChannel.getSdkCode())) {
                    bindType = sdkChannel.getSdkCode();
                }

                buser = bindService.bindUser(user, sdkResult, sdkChannel, status, getPara("sdkVersion"), bindType);
                //isEdition 字段标识为苹果包访问
                if (StringUtils.isNotEmpty(getPara("isEdition"))) {
                    try {
                        ReportData reportData = new ReportData();
                        reportData.setReportSys(SysType.IOS.code);
                        reportData.setReportType(SyncType.REGISTER.code);
                        reportData.setUid(user.getId());
                        reportData.setGameId(channelGame.getGameId());
                        reportData.setCid(getPara("channel"));
                        // String orgIdfa = AdUtils.replaceIdfa(getPara("channel").toUpperCase());
                        reportData.setIdfa(getPara("udid"));
                        reportData.setIdfaMd5(SignUtil.md5(getPara("udid")));
                        reportData.setIp(getClientIp());
                        ReportUtil.reportRegister(reportData);
                    } catch (Exception e) {
                        log.error("==========>>异步上报用户注册异常", e);
                    }
                }


            }
            this.renderJson(postResult);
        } catch (Exception e) {
            log.error("泡椒注册失败", e);
            super.requestFailure(StatusType.PJ_REG_EXCEPTION);
        }

    }


    /**
     * 发送注册信息给用户
     */
    @SuppressWarnings("rawtypes")
    public void sendUserInfo() {

        try {
            log.info("==========>>发送注册信息给用户：" + JsonKit.toJson(getParaMap1()));
            String vr = initRquest(5);
            Map initResult = JsonKit.parse(vr, Map.class);

            if (initResult.get("code") != null
                    && (StatusType.AUTH_SUCCESS.id != (Integer) initResult
                    .get("code"))) {
                this.renderJson(vr);
                return;
            }
            Map<String, String> reqParams = getParaMap1();
            reqParams.put("channelId", "1");
            reqParams.put("channel", channelGame.getCid());
            reqParams.put("sdkVersion", "1.0.0");
            reqParams.put("appVersion", "1.0.0");
            reqParams.put("platformType", "H5");
            String sign = SignUtil.generateSign2(reqParams, PjConstants.SDK_SIGN_KEY);
            reqParams.put("sign", sign);
            log.info("====>>发送注册信息请求参数：" + reqParams.toString());
            String postResult = HttpsUtil.post(PjConstants.sconfig.getSendUserInfoToMobileUrl(), reqParams, null);
            Map regResult = JsonKit.parse(postResult, Map.class);
            if (regResult != null && "1".equals(regResult.get("code").toString())) {
                super.requestSuccess(regResult.get("msg").toString(), null);
                return;
            } else {
                super.requestFailure(regResult.get("msg").toString());
                return;
            }

        } catch (Exception e) {
            log.error("发送注册信息给用户失败", e);
            super.requestFailure("发送失败");
        }
    }


    /**
     * 校验第三方渠道登录token
     *
     * @throws Exception
     */
    @SuppressWarnings("rawtypes")
    public void getToken() {
        try {

            log.info("==========>>登录验证token：" + JsonKit.toJson(getParaMap1()));

            String vr = initRquest(1);
            Map initResult = JsonKit.parse(vr, Map.class);
            if (initResult.get("code") != null
                    && (StatusType.AUTH_SUCCESS.id != (Integer) initResult
                    .get("code"))) {
                this.renderJson(vr);
                return;
            }
            final Map<String, Object> data = new HashMap<String, Object>();

            // 3.调用SDK渠道方的token验证接口
            log.info("==========>>当前sdk渠道信息：" + JsonKit.toJson(sdkChannel));
            log.info("==========>>SDK实现类：" + sdkChannel.getItfImplClass());
            ItfSdk verifier = (ItfSdk) Class.forName(sdkChannel.getItfImplClass()).newInstance();

            verifier.verify(sdkChannel, channelGame, game, getPara("sdkToken"), new ISDKVerifyListener() {
                @Override
                public void onSuccess(SDKVerifyResult sdkResult) {

                    boolean isPjSdk = false;
                    if (PjConstants.PJSDK_ITF_IMPL_CLASS.equals(sdkChannel.getItfImplClass())) {
                        isPjSdk = true;
                    }


                    log.info("==========>>调用SDK渠道方的token验证结果：" + JsonKit.toJson(sdkResult));

                    LoginEntity session;// 玩家在我服务器登录实体
                    String appVersion = getPara("appVersion");
                    try {
                        if (sdkResult.isSuccess()) {
                            // 根据第三方用户信息判断用户是否已绑定我平台账号
                            String bindType = PjConstants.SDK_CODE_H5_SDK3;
                            if (PjConstants.SDK_CODE_PJH5.equals(sdkChannel.getSdkCode())) {
                                bindType = sdkChannel.getSdkCode();
                            }


                            PjMemberBinding buser = bindService.getBindingUser(sdkResult.getUserID(), sdkChannel, bindType);


                            StatNewUser newUser = new StatNewUser();
                            newUser.setGameId(channelGame.getGameId());
                            newUser.setUdid(getPara("udid"));
                            newUser.setImei(getPara("imei"));
                            newUser.setModel(getClientIp());
                            newUser.setCreateDate(new Date());
                            newUser.setCreateTime(new Date());

                            log.info("==========>>"
                                    + "】绑定信息：[" + JsonKit.toJson(buser)
                                    + "][" + JsonKit.toJson(sdkResult)
                                    + "][" + JsonKit.toJson(sdkChannel)
                                    + "][" + bindType + "]");

                            // 未绑定则绑定、登录、返回token
                            if (buser == null) {
                                if (channelGame.getStatus() == 2) {// 封新增:不允许新增用户
                                    log.error("Game reg forbidden,channelGame:[" + JsonKit.toJson(channelGame) + "]");
                                    data.put("status", StatusType.CHANNEL_GAME_EXCEPTION);
                                    return;
                                }

                                log.info("==========>>【" + sdkResult.getUserName() + "】尚未绑定平台账号");


                                PjMemberUser user = null;
                                if (PjConstants.SDK_CODE_PJH5.equals(sdkChannel.getSdkCode())) {// 如果渠道是泡椒sdk
                                    user = userService.findUser(sdkResult.getUserID());
                                } else {
                                    // 生成平台新用户、游戏新用户
                                    user = userService.random(getPara("udid"));
                                }

                                // 绑定到sdk用户
                                String cid = getPara("channel");
                                if (StrKit.isBlank(cid)) {
                                    cid = PjConstants.SDK_CODE_PJH5;
                                }

                                user.setCid(cid);
                                user.setUdid(getPara("udid"));
                                int status = 1;// 默认普通用户

                                buser = bindService.bindUser(user, sdkResult, sdkChannel, status, getPara("sdkVersion"), bindType);
                                log.info("==========>>[" + sdkResult.getUserName() + "]自动绑定平台账号：" + JsonKit.toJson(buser));

                                newUser.setUid(buser.getUserId().longValue());
                                newUser.setCid(cid);

                            } else {// 已绑定的第三方用户,重新登录并返回登录token,记录stat_active_user
                                Integer state = buser.getStatus();
                                log.info("==========>>[" + sdkResult.getUserName() + "]已绑定平台账号：" + JsonKit.toJson(buser));

                                if (state == 0) {
                                    data.put("status", StatusType.USER_FORBIDDEN);
                                    return;
                                }

                                newUser.setUid(buser.getUserId().longValue());
                                newUser.setCid(getPara("channel"));
                            }

                            // 统计新增游戏用户或活跃用户 (非泡椒sdk才需要统计)
                            if (!isPjSdk) {
                                try {
                                    statHandler.saveUserStat(newUser);
                                } catch (Exception e) {
                                    log.error("统计新增/活跃用户异常", e);
                                }
                            }

                            if (!isPjSdk) {// 非泡椒sdk，登录.（泡椒SDK用户已登录）.
                                // 登录并返回用户信息、token.
                                session = bindService.updateLoginEntity(buser, appVersion);


                                //判断当前游戏是否开启实名认证
                                //开启实名认证，调用用户中心接口，查询当前用户实名认证状态
                                //未开启实名认证，直接使用渠道返回的实名认证状态
                                try {
                                    Integer realNameAuthStatus = sdkResult.getRealNameAuthStatus();//渠道实名认证状态

                                    if (realNameAuthStatus == null) {//渠道没有实名认证功能

                                        int realNameAuthentication = channelGame.getRealNameAuthentication();//实名认证开启状态0：未开启，1：开启 2:强制开启(用户无法关闭)
                                        session.setOpenRealNameAuth(realNameAuthentication);

                                        if (realNameAuthentication == 1 || realNameAuthentication == 2) {//开启实名认证
                                            Integer pjstatus = UcUtil.queryRealNameAuth(1, buser.getUserId());
                                            session.setRealNameAuthStatus(pjstatus);//设置泡椒实名认证状态
                                        } else {//未开启实名认证
                                            session.setRealNameAuthStatus(0);//设置泡椒实名认证状态
                                        }

                                    } else {//渠道有实名认证功能
                                        session.setOpenRealNameAuth(0);//关闭泡椒实名认证功能
                                        session.setRealNameAuthStatus(realNameAuthStatus);//设置渠道实名认证状态
                                    }

                                } catch (Exception e) {
                                    log.error("实名认证查询异常", e);
                                }

                                data.put("userInfo", session);
                            } else {
                                session = new LoginEntity();
                                session.setUid(buser.getUserId());
                                session.setToken(getPara("sdkToken"));
                                data.put("userInfo", session);
                            }

                            data.put("status", StatusType.AUTH_SUCCESS);

                        } else {
                            data.put("status", StatusType.AUTH_FAILED);
                            return;
                        }
                    } catch (Exception e) {
                        data.put("status", StatusType.AUTH_EXCEPTION);
                        log.error("==========>>验证异常", e);
                        return;
                    }
                }

                @Override
                public void onFailed(String errorMsg) {// SDK渠道方的token验证失败
                    data.put("status", StatusType.AUTH_FAILED);
                    data.put("errMsg", errorMsg);
                }
            });
            //银联渠道做处理
            if (channelGame.getCid().equals("smxnh5_zysh_sm_001")) {
                String userInfo = data.get("userInfo").toString();
                log.info("-----userInfo-----参数为：" + userInfo);
                JSONObject jsonObject = JSONObject.parseObject(userInfo);
                String gameUrl = channelGame.getGameUrl();
                String sdkToken = jsonObject.getString("token");
                Integer sdkUid = jsonObject.getInteger("uid");
                String gameCpLogin = gameUrl + "&uid=" + sdkUid + "&sdkToken=" + sdkToken;
                log.info("-----CP------游戏路径为：" + gameCpLogin);
                super.success("OK", "00", gameCpLogin);
                return;
            }
            if (StatusType.AUTH_SUCCESS.equals((StatusType) data.get("status"))) {
                log.info("==========>>token验证成功：" + JsonKit.toJson(data));
                super.requestSuccess("验证完成!", data);
                return;
            } else {
                log.info("==========>>token验证失败：" + JsonKit.toJson(data));
                super.requestFailure(StatusType.AUTH_FAILED);
                return;
            }
        } catch (Exception e) {
            log.error("==========>>token验证异常", e);
            super.requestFailure(StatusType.AUTH_EXCEPTION);
            return;
        }
    }

    /**
     * 泡椒sdk token登录
     */
    public void loginByToken() {

        try {

            log.info("==========>>泡椒token登录：" + JsonKit.toJson(getParaMap1()));

            String vr = initRquest(1);
            Map initResult = JsonKit.parse(vr, Map.class);
            if (initResult.get("code") != null
                    && (StatusType.AUTH_SUCCESS.id != (Integer) initResult
                    .get("code"))) {
                this.renderJson(vr);
                return;
            }

            PjMap<String, String> param = getParaMap1();
            param.put("gameId", this.game.getId() + "");
            String retData = HttpKit.get(PjConstants.sconfig.getNgTokenUrl(), param);
            log.info("==========>>泡椒token登录结果：" + retData);
            Map regResult = JsonKit.parse(retData, Map.class);
            if (regResult != null && (Integer) regResult.get("code") == 1) {

                PjMemberUser user = new PjMemberUser();
                Map user1 = (Map) regResult.get("data");
                user.setId((Integer) user1.get("uid"));
                user.setUdid((String) user1.get("udid"));
                user.setUserName((String) user1.get("userName"));
                SDKVerifyResult sdkResult = new SDKVerifyResult();
                sdkResult.setNickName(user.getNiceName());
                sdkResult.setUserID(user.getId() + "");
                sdkResult.setUserName(user.getUserName());

                // 判断用户是否已绑定我平台账号
                String bindType = PjConstants.SDK_CODE_H5_SDK3;
                if (PjConstants.SDK_CODE_PJH5.equals(sdkChannel.getSdkCode())) {
                    bindType = sdkChannel.getSdkCode();
                }


                PjMemberBinding buser = bindService.getBindingUser(sdkResult.getUserID(), sdkChannel, bindType);
                if (buser == null) {// 绑定到sdk用户
                    bindService.bindUser(user, sdkResult, sdkChannel, 1, getPara("sdkVersion"), bindType);
                }

                Map<String, Object> returnMap = new HashMap<String, Object>();
                returnMap.put("uid", user1.get("uid"));
                returnMap.put("token", getPara("token"));
                returnMap.put("openRealNameAuth", user1.get("openRealNameAuth"));
                returnMap.put("realNameAuthStatus", user1.get("realNameAuthStatus"));
                returnMap.put("bindMobile", user1.get("bindMobile"));

                //17.开头的IP做记录
                String ip = getClientIp();
                if (ip.startsWith("17.")) {
                    PjThirdSdkChannelGame sdkChannelGame = channelGameService.findGameById(param.getToInt("channelGameId"));
                    String mobileType = UaUtil.getMobileType(getRequest());
                    log.info("------苹果审核提醒------IP:" + ip);
                    param.put("uid", user1.get("uid").toString());
                    param.put("userName", user1.get("userName").toString());
                    param.put("token", getPara("token"));
                    param.put("method", "loginByToken");
                    param.put("mobile", mobileType);
                    param.put("ip", ip);
                    param.put("gameId", sdkChannelGame.getGameId().toString());
                    param.put("gameName", sdkChannelGame.getGameName());
                    statReviewLoginUserService.saveReviewLoginByEmail(param);
                }

                //拉起微信授权
                String wxUrl = isWxLoginOpenId(getPara("channelGameId"), getPara("channel"));
                if (StringUtils.isNotEmpty(wxUrl)) {
                    returnMap.put("payUrl", wxUrl);
                }

                super.requestSuccess("登录成功!", returnMap);
                return;
            } else {
                super.requestFailure(regResult.get("msg").toString());
                return;
            }

        } catch (Exception e) {
            log.error("登录异常！", e);
            super.requestFailure(StatusType.PJ_LOGIN_EXCEPTION);
            return;
        }

    }


    /**
     * 获取支付Url
     */
    @SuppressWarnings("rawtypes")
    public void getPayUrl() {
        try {
            log.info("==========>>获取支付URL：" + JsonKit.toJson(getParaMap1()));
            // 1.请求验证
            String vr = initRquest(2);
            Map initResult = JsonKit.parse(vr, Map.class);
            if (initResult.get("code") != null
                    && (StatusType.AUTH_SUCCESS.id == (Integer) initResult
                    .get("code"))) {

                Map<String, Object> map = new HashMap<String, Object>();

                if (buser.getStatus() == 0 || buser.getStatus() == 3) {//0：禁用 3：黑名单用户
                    requestFailure("暂时无法使用支付功能！");
                    return;
                }

                Float money = getParaToFloat("money");
                if (money == null || money.floatValue() <= 0) {
                    requestFailure(StatusType.ORDER_MONEY_INVALID);
                    return;
                }
                //生成订单
                PjThirdSdkOrder order = orderService.generatePayOrder(sdkChannel, channelGame, game, getParaMap1(), money, buser, 2, PayStyle.PAY_CENTER.id);
                if (order == null) {
                    requestFailure(StatusType.ORDER_FAL);
                    return;
                }

                String payUrl = "";
                Map<String, Object> param = new HashMap<String, Object>();
                param.put("uid", order.getUid());//业务平台用户id
                param.put("platform", platform);//业务平台id
                param.put("gameId", order.getGameId());//业务平台游戏id
                param.put("timestamps", new Date().getTime());//时间戳
                param.put("productName", order.getGoodsName() == null ? "" : order.getGoodsName());//产品名称
                param.put("price", order.getMoney() + "");//产品价格
                param.put("busOrder", order.getOrderNumber());//业务平台订单号
                param.put("ip", order.getIp());//用户ip地址
                param.put("notifyUrl", PjConstants.sconfig.getSdkHost() + PayConfig.notifyUrl);//支付，异步通知地址
                param.put("cid", order.getCid() == null ? "" : order.getCid());//业务平台cid
                param.put("orderType", 1);//订单类型，  订单类别：1游戏道具
                param.put("serverId", order.getServerId() == null ? "" : order.getServerId());
                param.put("serverName", order.getServerName() == null ? "" : order.getServerName());
                param.put("roleName", order.getRoleName() == null ? "" : order.getRoleName());
                param.put("cpOrder", order.getCpOrderNumber() == null ? "" : order.getCpOrderNumber());
                param.put("sdkVersion", order.getSdkVersion() == null ? "" : order.getSdkVersion());

                // if (UaUtil.getClientType(getRequest()) == UaUtil.weixin) {//微信公众号支付需要返回游戏地址
                String channel = getPara("channel") == null ? "" : getPara("channel");
                String channelGameId = getPara("channelGameId") == null ? "" : getPara("channelGameId");
                String resultUrl = "";
                //测试游戏返回新页面 login2
              /*  if (channelGameId.equals("11094")) {
                    resultUrl = PAOJIAOLOGINURLV2 + "?channelGameId=" + channelGameId + "&channel=" + channel;
                } else {
                    resultUrl = PAOJIAOLOGINURL + "?channelGameId=" + channelGameId + "&channel=" + channel;
                }*/
                resultUrl = PAOJIAOLOGINURL + "?channelGameId=" + channelGameId + "&channel=" + channel;
                param.put("returnUrl", resultUrl); //返回游戏链接
                //param.put("uc_backGameUrl", channelGame.getGameEntranceUrl());
                // }


                //生成签名
                String sign = PaySignUtil.generateSign(param, PayConfig.api_pay_key);
                param.put("sign", sign);


                param = PaySignUtil.encodeMap(param);

                String paramStr = PaySignUtil.mapToUrlNotEncode(param);

                StringBuffer sb = new StringBuffer();
                sb.append(PjConstants.sconfig.getPayUrl() + "?");
                sb.append(paramStr);

                payUrl = sb.toString();
                log.info("生成支付中心支付url======>>" + payUrl);


                //因为是调用微信公众号支付，需要获取用户openid，所以需要先授权登录获取用openid，在跳转支付接口。
                if (UaUtil.getClientType(getRequest()) == UaUtil.weixin) {
                    String callback = null;
                    try {
                        callback = URLEncoder.encode(payUrl, "utf-8");
                    } catch (UnsupportedEncodingException e) {
                        e.printStackTrace();
                    }

                    String loginUrl = "/wxThird/login?platform=" + platform + "&toUrl=" + callback;
                    String ucHost = PjConstants.sconfig.getUcUrl();


                    payUrl = ucHost + loginUrl;

                    log.info("生成泡椒微信授权登录url======>>" + payUrl);
                }


                map.put("payUrl", payUrl);
                requestSuccess("获取支付URL成功", map);
                return;
            } else {
                requestFailure(StatusType.GET_PAY_CONFIG_EXCEPTION);
                return;
            }

        } catch (Exception e) {
            log.error("==========>>支付链接生成异常", e);
            super.requestFailure(StatusType.GEN_PAY_URL_EXCEPTION);
            return;
        }

    }


    /**
     * 获取融合sdk订单号、切支付等操作
     */
    public void getOrderNo() {
        try {

            String vr = initRquest(2);
            Map initResult = JsonKit.parse(vr, Map.class);

            Map<String, Object> data = new HashMap<String, Object>();


            if (initResult.get("code") != null
                    && (StatusType.AUTH_SUCCESS.id != (Integer) initResult.get("code"))) {
                this.renderJson(vr);
                return;
            }


            if (channelGame == null || channelGame.getStatus() == 11) { //11:禁支付
                this.renderJson(super.stateFailure(StatusType.CHANNEL_GAME_NONE));
                return;
            }


            // 2.生成订单号
            PjMap<String, String> params = getParaMap1();
            params.put("ip", getClientIp());
            PjThirdSdkOrder order = orderService.generateRhOrder(sdkChannel,
                    channelGame, game, params, getParaToFloat("money"), buser);

            if (order == null) {//订单生成失败
                super.requestFailure(StatusType.ORDER_FAL);
                return;
            }

            if (order.getPtype() == 2) {//泡椒支付

                Map<String, Object> param = new HashMap<String, Object>();
                param.put("uid", order.getUid());//业务平台用户id
                param.put("platform", platform);//业务平台id
                param.put("gameId", order.getGameId());//业务平台游戏id
                param.put("timestamps", new Date().getTime());//时间戳
                param.put("productName", order.getGoodsName() == null ? "" : order.getGoodsName());//产品名称
                param.put("price", order.getMoney() + "");//产品价格
                param.put("busOrder", order.getOrderNumber());//业务平台订单号
                param.put("ip", order.getIp());//用户ip地址
                param.put("notifyUrl", PjConstants.sconfig.getSdkHost() + PayConfig.notifyUrl);//支付，异步通知地址
                param.put("cid", order.getCid() == null ? "" : order.getCid());//业务平台cid
                param.put("orderType", 1);//订单类型，  订单类别：1游戏道具
                param.put("serverId", order.getServerId() == null ? "" : order.getServerId());
                param.put("serverName", order.getServerName() == null ? "" : order.getServerName());
                param.put("roleName", order.getRoleName() == null ? "" : order.getRoleName());
                param.put("cpOrder", order.getCpOrderNumber() == null ? "" : order.getCpOrderNumber());

                //生成签名
                String sign = PaySignUtil.generateSign(param, PayConfig.api_pay_key);
                param.put("sign", sign);

                if (UaUtil.getClientType(getRequest()) == UaUtil.weixin) {//微信公众号支付需要返回游戏地址
                    param.put("uc_backGameUrl", channelGame.getGameEntranceUrl());
                }

                param = PaySignUtil.encodeMap(param);

                String paramStr = PaySignUtil.mapToUrlNotEncode(param);
                StringBuffer sb = new StringBuffer();
                sb.append(PjConstants.sconfig.getPayUrl() + "?");
                sb.append(paramStr);
                log.info("调用支付中心支付======>>" + sb.toString());

                //微信公众号支付需要现授权获取
                if (UaUtil.getClientType(getRequest()) == UaUtil.weixin) {

                    //因为是调用微信公众号支付，需要获取用户openid，所以需要先授权登录获取用openid，在跳转支付接口。
                    String callback = null;
                    try {
                        callback = URLEncoder.encode(sb.toString(), "utf-8");
                    } catch (UnsupportedEncodingException e) {
                        e.printStackTrace();
                    }
                    String loginUrl = "/wxThird/login?platform=" + platform + "&toUrl=" + callback;
                    String ucHost = PjConstants.sconfig.getUcUrl();//用户中心地址
                    loginUrl = ucHost + loginUrl;

                    log.info("生成泡椒微信公众号授权登录url======>>" + loginUrl);

                    data.put("payUrl", loginUrl);

                } else {
                    data.put("payUrl", sb.toString());
                }

            } else {
                data.put("orderInfo", order);
            }

            ItfSdk verifier = (ItfSdk) Class.forName(sdkChannel.getItfImplClass()).newInstance();
            verifier.getOrderNo(sdkChannel, channelGame, order, params, new ISDKVerifyListener() {
                @Override
                public void onSuccess(SDKVerifyResult result) {
                    data.put("extension", result.getExtension() == null ? "" : result.getExtension());
                }

                @Override
                public void onFailed(String errorMsg) {

                }
            });


            super.requestSuccess("获取订单成功!", data);

        } catch (Exception e) {
            log.error("==========>>获取订单异常", e);
            super.requestFailure(StatusType.GET_RH_ORDER_EXCEPTION);
        }
    }


    /**
     *获取泡椒微信小程序订单号
     *
     */
	/*public void getWxAppletOrderNo() {
		try {

			String vr = initRquest(2);
			Map initResult = JsonKit.parse(vr, Map.class);
			Map<String, Object> data = new HashMap<String, Object>();

			if (initResult.get("code") != null
					&& (StatusType.AUTH_SUCCESS.id != (Integer) initResult.get("code"))) {
				this.renderJson(vr);
				return;
			}

			if (channelGame == null || channelGame.getStatus() == 11) { //11:禁支付
				this.renderJson(super.stateFailure(StatusType.CHANNEL_GAME_NONE));
				return;
			}
			// 2.生成订单号
			PjMap<String, String> params = getParaMap1();
			params.put("ip", getClientIp());
		*//*	PjThirdSdkOrder order = orderService.generateRhOrder(sdkChannel,
					channelGame, game, params, getParaToFloat("money"), buser);*//*
			PjThirdSdkOrder order = orderService.generatePayOrder(sdkChannel,channelGame, game, params, getParaToFloat("money"), buser,2,PayStyle.WX_APPLET_PAY.id);

			if(order == null){//订单生成失败
				super.requestFailure(StatusType.ORDER_FAL);
				return;
			}

			if(order.getPtype() == 2){//泡椒支付

				Map<String, Object> param = new HashMap<String, Object>();
				param.put("uid",order.getUid());//业务平台用户id
				param.put("platform", platform);//业务平台id
				param.put("gameId",order.getGameId());//业务平台游戏id
				param.put("timestamps",new Date().getTime());//时间戳
				param.put("productName",order.getGoodsName()== null?"":order.getGoodsName());//产品名称
				param.put("price",order.getMoney()+"");//产品价格
				param.put("busOrder",order.getOrderNumber());//业务平台订单号
				param.put("ip",order.getIp());//用户ip地址
				param.put("notifyUrl",PjConstants.sconfig.getSdkHost()+PayConfig.notifyUrl);//支付，异步通知地址
				param.put("cid",order.getCid()== null?"":order.getCid());//业务平台cid
				param.put("orderType",1);//订单类型，  订单类别：1游戏道具
				param.put("serverId",order.getServerId()== null?"":order.getServerId());
				param.put("serverName",order.getServerName() == null?"":order.getServerName());
				param.put("roleName",order.getRoleName() == null?"":order.getRoleName());
				param.put("cpOrder", order.getCpOrderNumber()== null?"":order.getCpOrderNumber());

				//生成签名
				String sign = PaySignUtil.generateSign(param,PayConfig.api_pay_key);
				param.put("sign",sign);

				if(UaUtil.getClientType(getRequest()) == UaUtil.weixin){//微信公众号支付需要返回游戏地址
					param.put("uc_backGameUrl",channelGame.getGameEntranceUrl());
				}

				param  = PaySignUtil.encodeMap(param);

				String  paramStr = PaySignUtil.mapToUrlNotEncode(param);
				StringBuffer sb = new StringBuffer();
				sb.append(PjConstants.sconfig.getPayUrl()+"?");
				sb.append(paramStr);
				log.info("调用支付中心支付======>>"+sb.toString());

				//TODO 调用支付中心接口创建订单
				HttpAgent.getInstance().post(null,null);


				//微信公众号支付需要现授权获取
			*//*	if(UaUtil.getClientType(getRequest()) == UaUtil.weixin) {

					//因为是调用微信公众号支付，需要获取用户openid，所以需要先授权登录获取用openid，在跳转支付接口。
					String callback = null;
					try {
						callback = URLEncoder.encode(sb.toString(), "utf-8");
					} catch (UnsupportedEncodingException e) {
						e.printStackTrace();
					}
					String loginUrl = "/wxThird/login?platform="+ platform+"&toUrl=" + callback;
					String ucHost = PjConstants.sconfig.getUcUrl();//用户中心地址
					loginUrl= ucHost + loginUrl;

					log.info("生成泡椒微信公众号授权登录url======>>"+loginUrl);

					data.put("payUrl", loginUrl);

				}else{
					data.put("payUrl", sb.toString());
				}*//*

			}else{
				data.put("orderInfo", order);
			}

			ItfSdk verifier = (ItfSdk) Class.forName(sdkChannel.getItfImplClass()).newInstance();
			verifier.getOrderNo(sdkChannel,channelGame,order,params, new ISDKVerifyListener() {
				@Override
				public void onSuccess(SDKVerifyResult result) {
					data.put("extension", result.getExtension()==null?"":result.getExtension());
				}

				@Override
				public void onFailed(String errorMsg) {

				}
			});

			super.requestSuccess("微信小程获取订单成功!", data);

		}catch (Exception e){
			log.error("==========>>微信小程序获取订单异常", e);
			super.requestFailure(StatusType.GET_RH_ORDER_EXCEPTION);
		}
	}
*/

    /**
     * 上报玩家信息
     */
    @SuppressWarnings("rawtypes")
    public void reportRoleInfo() {
        try {
            log.info("==========>>上报玩家信息：" + JsonKit.toJson(getParaMap1()));
            String vr = initRquest(5);
            Map initResult = JsonKit.parse(vr, Map.class);
            if (initResult.get("code") != null
                    && (StatusType.AUTH_SUCCESS.id != (Integer) initResult
                    .get("code"))) {
                this.renderJson(vr);
                return;
            }

            PjMap<String, String> param = getParaMap1();
            param.put("gameId", channelGame.getGameId() + "");

            String retData = HttpKit.get(PjConstants.sconfig.getNgReportRoleInfoUrl(), param);
            Map reMap = JsonKit.parse(retData, Map.class);
            log.info("====>>上报玩家角色信息[" + JsonKit.toJson(getParaMap1()) + "]====>>返回结果:" + retData);
            if ("1".equals(reMap.get("code"))) {
                super.requestSuccess("上报玩家角色信息成功!", "");
                return;
            } else {
                super.requestFailure("上报玩家角色信息失败!");
                return;
            }

        } catch (Exception e) {
            log.error("上报玩家角色信息异常！", e);
            super.requestFailure(StatusType.REPORT_USER_ROLE_INFO);
            return;
        }


    }


    /**
     * CP服务器端请求我方token验证
     */
    @SuppressWarnings("static-access")
    @Clear(DomainInterceptor.class)
    public void verifyToken() {
        try {
            String token = getPara("token");
            String sign = getPara("sign");
            Integer channelGameId = getParaToInt("appId");
            // log.debug("-------------------channelGameId:"+channelGameId);
            if (channelGameId == null) {
                log.error("ERROR:[parmeter appId and gameId must have one] Request from:"
                        + getFullURL());
                super.requestFailure(StatusType.CHANNEL_GAME_NONE);
                return;
            }

            this.channelGame = channelGameService.findGameById(channelGameId);
            if (channelGame == null || channelGame.getStatus() == 10) {
                log.error("channelGame not found err:[appId: " + channelGameId + "] Request from:" + getFullURL());
                super.requestFailure(StatusType.CHANNEL_GAME_NONE);
                return;
            }
            this.game = gameService.findGameById(channelGame.getGameId());
            if (game == null) {
                log.error("Game not found err:[appId: " + channelGameId + "] Request from:" + getFullURL());

                super.requestFailure(StatusType.GAME_NONE);
                return;
            }


            // 1.验证签名
            Map<String, String> params = getParaMap1();
            SignUtil su = new SignUtil();
            if (!su.isSignOK(params, sign, game.getServerSecret())) {
                log.error("Sign invalid:\n [md5Before:" + su.md5before
                        + "]\n [mySign:" + su.mySign + "]\n[yourSign:" + sign
                        + "]\nRequest from:" + getFullURL());
                super.requestFailure(StatusType.SIGN_ERROR);
                return;
            }

            // 2.查找登录信息\验证token
            LoginEntity session = LoginSessionManager.inst().findByToken(token,
                    true);

            Map<String, Object> data = new HashMap<String, Object>();

            if (session != null && session.getUid() > 0) {
                if (session.getActiveTime() != null) {
                    data.put("activeTime", session.getActiveTime());
                }
                data.put("token", session.getToken());
                data.put("uid", session.getUid());
                data.put("userName", session.getUserName());
                super.requestSuccess("登陆成功", data);
                return;
            }

            super.requestFailure(StatusType.USER_NOT_LOGIN);


        } catch (Exception e) {
            log.error("CP服务器端请求我方token验证异常！", e);
            super.requestFailure(StatusType.VERIFY_TOKEN_EXCEPTION);
            return;
        }
    }


    /**
     * 支付回调
     */
    @Clear(DomainInterceptor.class)
    public void payCallBack() {
        try {
            Integer channelGameId = getParaToInt("channelGameId");
            if (channelGameId == null) {
                channelGameId = getParaToInt(0);
            }

            this.channelGame = channelGameService.findGameById(channelGameId);

            sdkChannel = channelService.findChannelById(channelGame.getSdkChannelId());

            if (sdkChannel != null && StrKit.notBlank(sdkChannel.getItfImplClass())) {
                final Map<String, Object> data = new HashMap<String, Object>();
                ItfSdk verifier = (ItfSdk) Class.forName(
                        sdkChannel.getItfImplClass()).newInstance();
                PjMap<String, String> params = getParaMap1();
                params.put("ip", getClientIp());
                params.put("channelGameId", channelGameId + "");
                verifier.orderCallBack(params, getRequest(), new ISDKVerifyListener() {

                    @Override
                    public void onSuccess(SDKVerifyResult sdkResult) {
                        if (sdkResult != null && StrKit.notBlank(sdkResult.getReturnMsg())) {
                            data.put("returnMsg", sdkResult.getReturnMsg());
                        }
                        data.put("status", StatusType.AUTH_SUCCESS);
                    }

                    @Override
                    public void onFailed(String errorMsg) {
                        data.put("status", StatusType.AUTH_FAILED);
                    }
                });
                log.info("==========>>支付凭证验证完成：params:【"
                        + JsonKit.toJson(params) + "】,验证结果：【"
                        + JsonKit.toJson(data) + "】");
                if (data.get("returnMsg") != null) {
                    this.renderText(data.get("returnMsg").toString());
                    return;
                }
                super.requestSuccess("验证完成!", data);
            } else {
                log.error("ERROR：渠道不存在，或渠道接口未实现！sdkChannel:[" + JsonKit.toJson(sdkChannel) + "]");
                this.renderJson(super.stateFailure("ERROR：渠道不存在，或渠道接口未实现！"));
            }
        } catch (Exception e) {
            log.error("ERROR：支付回调异常", e);
            this.renderJson(super.stateFailure("ERROR：" + e.getMessage()));
        }
    }


    /**
     * 生成实名认证跳转链接
     */
    public void getRealNameAuthUrl() {
        try {

            Integer uid = getParaToInt("uid");
            Integer gameId = getParaToInt("gameId");
            String cid = getPara("channel");

            if (uid == null || gameId == null) {
                super.requestFailure(StatusType.PARAM_ERROR);
                return;
            }

            PjCpGame pjCpGame = gameService.findGameById(gameId);
            Integer realNameType = pjCpGame.getRealNameType();//实名认证验证类型(0：验证格式，1：接口验证)
            if (realNameType == null) {
                realNameType = 0;
            }
            //生成用户中心实名认证访问地址。
            String url = UcUtil.genToUrl(1, uid, gameId, cid, "https://member.paojiao.cn/authentication?from=RealNameAuth&realNameType=" + realNameType);

            super.requestSuccess("success", url);

        } catch (Exception ex) {
            super.requestFailure(StatusType.USER_REAL_NAME_AUTH_EXC);
        }


    }


    @SuppressWarnings("static-access")
    private String initRquest(int flag) {
        try {
            // 1.参数有效性验证
            Integer channelGameId = getParaToInt("channelGameId");
            log.info("channelGameId:" + channelGameId);
            if (channelGameId == null) {
                log.error("channelGameId is null");
                return super.stateFailure(StatusType.CHANNEL_GAME_NONE);
            }
            this.channelGame = channelGameService.findGameById(channelGameId);
            if (channelGame == null || channelGame.getStatus() == 10) {
                return super.stateFailure(StatusType.CHANNEL_GAME_NONE);
            }
            this.game = gameService.findGameById(channelGame.getGameId());
            if (game == null) {
                return super.stateFailure(StatusType.GAME_NONE);
            }
            this.sdkChannel = channelService.findChannelById(channelGame.getSdkChannelId());

            if (sdkChannel == null) {
                return super.stateFailure(StatusType.SDK_CHANNEL_NONE);
            }

            // 第三方登录验证
            if (flag == 1) {
                if (StrKit.isBlank(getPara("sdkToken"))) {
                    return super.stateFailure(StatusType.SDKTOKEN_EMPTY);
                }
            }

            // 支付验证
            if (flag == 2) {
                if (getParaToFloat("money") <= 0f) {
                    return super.stateFailure(StatusType.ORDER_MONEY_INVALID);
                }
                String uid = getPara("uid");
                buser = bindService.getBindingUser(uid);
                if (buser == null || buser.getStatus() == 10) {
                    return super.stateFailure(StatusType.USER_NONE);
                }
            }

        } catch (Exception e) {
            log.error("验证请求发生异常", e);
            return super.stateFailure(StatusType.REQUEST_VERIFY_EXCEPTION);
        }

        return super.stateSuccess("请求参数验证OK");
    }

    /**
     * 获取短信验证码
     */
    public void getMobileCode() {
        PjMap<String, String> param = getParaMap1();
        String mobile = param.get("mobile");
        if (StringUtils.isEmpty(mobile)) {
            super.requestFailure("手机号码为空");
        }
        Map<String, String> reqParams = getParaMap1();
     /*   reqParams.put("type", "2");
        reqParams.put("sdkVersion", "1.0.0");
        reqParams.put("appVersion", "1.0.0");
        reqParams.put("platformType", "H5");*/
        String sign = SignUtil.generateSign2(reqParams, PjConstants.SDK_SIGN_KEY);
        reqParams.put("sign", sign);
        log.info("CODE---URL:" + PjConstants.sconfig.getNgPhoneCodeUrl());
        String postResult = HttpsUtil.post(PjConstants.sconfig.getNgPhoneCodeUrl(), reqParams, null);
        log.info("================>获取短信验证码返回结果：" + postResult);
        JSONObject jsonObject = JSONObject.parseObject(postResult);
        if (jsonObject != null && "1".equals(jsonObject.get("code").toString())) {
            super.requestSuccess(jsonObject.get("msg").toString(), null);
            return;
        } else {
            super.requestFailure(jsonObject.get("msg").toString());
            return;
        }

    }

    /**
     * 绑定手机
     */
    public void bindMobilePhone() {
        try {


            PjMap<String, String> param = getParaMap1();
            String mobile = param.get("mobile");
            if (StringUtils.isEmpty(mobile)) {
                super.requestFailure("手机号码为空");
            }
            String smsCode = param.get("smsCode");
            if (StringUtils.isEmpty(smsCode)) {
                super.requestFailure("验证码为空");
            }
            Map<String, String> reqParams = getParaMap1();

            reqParams.put("sdkVersion", "1.0.0");
            reqParams.put("appVersion", "1.0.0");
            reqParams.put("platformType", "H5");
            String sign = SignUtil.generateSign2(reqParams, PjConstants.SDK_SIGN_KEY);
            reqParams.put("sign", sign);
            String postResult = HttpsUtil.post(PjConstants.sconfig.getNgBindMobileUrl(), reqParams, null);
            log.info("================>绑定手机返回结果：" + postResult);
            JSONObject jsonObject = JSONObject.parseObject(postResult);
            if (jsonObject != null && "1".equals(jsonObject.get("code").toString())) {
                super.requestSuccess(jsonObject.get("msg").toString(), null);
                return;
            } else {
                super.requestFailure(jsonObject.get("msg").toString());
                return;
            }
        } catch (Exception e) {
            log.info("Exception----ERROR:" + e.getMessage());
            return;
        }
    }


    /**
     * 360角色上报
     */
    public void getRoleReported() {
        Map<String, String> params = new HashMap<>();
        params.put("interface", getPara("interface"));
        params.put("gname", getPara("gname"));
        params.put("gid", getPara("gid"));
        params.put("sid", getPara("sid"));
        params.put("oldsid", getPara("oldsid"));
        params.put("user", getPara("user"));
        params.put("roleid", getPara("roleid"));
        params.put("dept", getPara("dept"));
        params.put("time", getPara("time"));
        params.put("level", getPara("level"));
        params.put("ip", getPara("ip"));
        params.put("map_id", getPara("map_id"));
        params.put("rolename", getPara("rolename"));
        params.put("channel", "0");
        params.put("poster", "0");
        params.put("site", "0");
        params.put("prof", "0");
        try {
            if (getPara("roleType").equals("2")) {
                params.put("interface", "create_role");
                log.info("360-创建角色上报数据：" + params.toString());
                String createRoleJson = HttpAgent.getInstance().get(ROLEREPORTEDURL, params);
                log.info("360-创建角色上报返回参数：" + createRoleJson);
                super.renderJson(createRoleJson);
            } else {
                params.put("interface", "login");
                log.info("360-用户登录上报参数：" + params.toString());
                String resultJson = HttpAgent.getInstance().get(ROLEREPORTEDURL, params);
                log.info("360-用户登录上报返回参数：" + resultJson);
                super.renderJson(resultJson);
            }
        } catch (Exception e) {
            log.info("360角色上报异常：" + e);
        }

    }


    /**
     * 游禧科技H5 角色查询
     */
    public void getRoleQuery() {
        //验证渠道参数
        String key = "3ed7b9e2da09ad1091978c7910c516";
        String sign = getPara("sign");
        if (StringUtils.isEmpty(sign)) {
            log.info("getRoleQuery-游禧科技角色查询-sign为空");
            super.requestFailure(StatusType.PARAM_ERROR);
            return;
        }
        if (StringUtils.isEmpty(getPara("uid"))) {
            log.info("getRoleQuery-游禧科技角色查询-uid为空");
            super.requestFailure(StatusType.PARAM_ERROR);
            return;
        }
        if (StringUtils.isEmpty(getPara("appid"))) {
            log.info("getRoleQuery-游禧科技角色查询-appid为空");
            super.requestFailure(StatusType.PARAM_ERROR);
            return;
        }
        if (StringUtils.isEmpty(getPara("serverid"))) {
            log.info("getRoleQuery-游禧科技角色查询-serverid为空");
            super.requestFailure(StatusType.PARAM_ERROR);
            return;
        }
        if (StringUtils.isEmpty(getPara("platform"))) {
            log.info("getRoleQuery-游禧科技角色查询-platform为空");
            super.requestFailure(StatusType.PARAM_ERROR);
            return;
        }
        if (StringUtils.isEmpty(getPara("time"))) {
            log.info("getRoleQuery-游禧科技角色查询-time为空");
            super.requestFailure(StatusType.PARAM_ERROR);
            return;
        }
        StringBuffer sf = new StringBuffer();
        sf.append(getPara("uid"))
                .append(getPara("appid"))
                .append(getPara("serverid"))
                .append(getPara("platform"))
                .append(getPara("time"))
                .append(key);
        log.info("getRoleQuery-游禧科技角色查询，加密参数：" + sf.toString());
        String newSign = SignUtil2.md5(sf.toString());
        log.info("getRoleQuery-游禧科技角色查询，加密结果：" + newSign);
        //渠道验证结果
        if (!sign.equals(newSign)) {
            log.info("getRoleQuery-游禧科技角色查询，签名错误，原sign:" + sign + "，加密后：" + newSign);
            super.requestFailure(StatusType.SIGN_ERROR);
            return;
        }
        try {
            //查询渠道信息，是否存在此渠道
            PjThirdSdkChannelGame pjThirdSdkChannelGame = channelGameService.findGameByPayKey(key);
            if (pjThirdSdkChannelGame == null) {
                log.info("getRoleQuery-游禧科技角色查询-渠道信息不存在！");
                super.requestFailure(StatusType.SDK_CHANNEL_NONE);
                return;
            }
            //查询用户，拿渠道用户置换我们自己的用户，是否存在此用户
            PjMemberBinding pjMemberBinding = bindService.getBindingUser(getPara("uid"), pjThirdSdkChannelGame.getId().toString());
            if (pjMemberBinding == null) {
                log.info("getRoleQuery-游禧科技角色查询-用户不存在！");
                super.requestFailure(StatusType.USER_NONE);
                return;
            }
            //查询是否创建了角色
            String gameId = pjThirdSdkChannelGame.getSdkAppId();
            String userId = pjMemberBinding.getUserId().toString();
            BaseStatGameRole statGameRole = statGameRoleService.getStatGmaeRoleInfo(gameId, userId);
            if (statGameRole == null) {
                log.info("getRoleQuery-游禧科技角色查询-无角色信息！");
                super.requestFailure(StatusType.PARAM_ERROR);
                return;
            }
            //返回参数给渠道
            Map<String, String> sdkPamras = new HashMap<>();
            sdkPamras.put("uid", getPara("uid"));
            sdkPamras.put("appid", getPara("appid"));
            sdkPamras.put("serverid", getPara("serverid"));
            sdkPamras.put("platform", getPara("platform"));
            sdkPamras.put("time", getPara("time"));
            sdkPamras.put("sign", getPara("sign"));

            Map<String, String> data = new HashMap<>();
            data.put("roleLevel", statGameRole.getRoleLevel());
            data.put("roleName", statGameRole.getRoleName());
            data.put("sdkChannelParams", JSONObject.toJSONString(sdkPamras));
            super.requestSuccess("验证完成", data);
            return;
        } catch (Exception e) {

        }
    }


    public void getIsAudit() {
        String channelGameId = getPara("channelGameId");
        PjThirdSdkChannelGame channelGame = channelGameService.findGameById(Integer.parseInt(channelGameId));
        if (channelGame == null) {
            super.requestFailure("正常状态");
        }
        //是否是提审状态,1：是提审状态,0：正常状态,默认为 0
        Integer code = channelGame.getAuditType();
        if (code == 1) {
            super.requestSuccess("提审状态", "");
        } else {
            super.requestFailure("正常状态");
        }
    }


    /**
     * SDK2.0 退游提示弹框
     */
    public void exitPopupBox() {
        try {

            log.info("============>>退游提示弹框参数：" + JsonKit.toJson(getParaMap1()));
            PjMap<String, String> param = getParaMap1();

            Map<String, String> sdkRequestMap = new HashMap<>();
            //1.获取SDK配置 请求参数
            sdkRequestMap.put("gameId", param.get("gameId"));
            sdkRequestMap.put("channel", param.get("channel"));
            sdkRequestMap.put("sdkVersion", param.get("sdkVersion"));
            sdkRequestMap.put("token", param.get("token"));
            sdkRequestMap.put("appVersion", param.get("appVersion"));
            String result = HttpsUtil.post(GETSDKCONFIGURL, sdkRequestMap, null);
            log.info("==========>>获取SDK配置返回结果：" + result);
            JSONObject jsonObject = JSONObject.parseObject(result);
            //code状态为 1 时进入
            if (jsonObject.getInteger("code") == 1) {
                //popupUrl 2.获取退游提示弹框url
                String popupUrl = jsonObject.getJSONObject("data").getString("popupUrl");
                sdkRequestMap.put("type", param.get("type"));   //弹窗类型,1：开屏 2：退游
                String popUpResult = HttpsUtil.post(popupUrl, sdkRequestMap, null);
                log.info("==========>>获取退游提示弹框返回结果：" + popUpResult);
                super.renderJson(popUpResult);
                return;
            } else {
                super.renderJson(result);
                return;
            }
        } catch (Exception e) {
            log.error("获取弹窗配置异常！", e);
            super.requestFailure(StatusType.GET_POPUP_CONFIG_ERROR);
            return;
        }

    }


    /**
     * SDK2.0 获取弹窗配置
     */
    public void getPopUpConfig() {
        try {

            log.info("============>>获取弹窗配置：" + JsonKit.toJson(getParaMap1()));
            PjMap<String, String> param = getParaMap1();

            Map<String, String> sdkRequestMap = new HashMap<>();
            //1.获取SDK配置 请求参数
            sdkRequestMap.put("gameId", param.get("gameId"));
            sdkRequestMap.put("channel", param.get("channel"));
            sdkRequestMap.put("sdkVersion", param.get("sdkVersion"));
            sdkRequestMap.put("token", param.get("token"));
            sdkRequestMap.put("appVersion", param.get("appVersion"));
            String result = HttpsUtil.post(GETSDKCONFIGURL, sdkRequestMap, null);
            log.info("==========>>获取SDK配置返回结果：" + result);
            JSONObject jsonObject = JSONObject.parseObject(result);
            //code状态为 1 时进入
            if (jsonObject.getInteger("code") == 1) {
                //popupUrl 2.获取弹窗配置url
                String popupUrl = jsonObject.getJSONObject("data").getString("popupUrl");
                sdkRequestMap.put("type", param.get("type"));
                String popUpResult = HttpsUtil.post(popupUrl, sdkRequestMap, null);
                log.info("==========>>获取弹窗配置返回结果：" + popUpResult);
                super.renderJson(popUpResult);
                return;
            } else {
                super.renderJson(result);
                return;
            }
        } catch (Exception e) {
            log.error("获取弹窗配置异常！", e);
            super.requestFailure(StatusType.GET_POPUP_CONFIG_ERROR);
            return;
        }

    }


    /**
     * SDK2.0 获取悬浮窗红点状态和气泡消息提示
     */
    public void getFloatTips() {
        try {

            log.info("============>>获取悬浮窗红点状态参数：" + JsonKit.toJson(getParaMap1()));
            PjMap<String, String> param = getParaMap1();

            Map<String, String> sdkRequestMap = new HashMap<>();
            //1.获取SDK配置 请求参数
            sdkRequestMap.put("gameId", param.get("gameId"));
            sdkRequestMap.put("channel", param.get("channel"));
            sdkRequestMap.put("sdkVersion", param.get("sdkVersion"));
            sdkRequestMap.put("token", param.get("token"));
            sdkRequestMap.put("appVersion", param.get("appVersion"));
            String result = HttpsUtil.post(GETSDKCONFIGURL, sdkRequestMap, null);
            log.info("==========>>获取SDK配置返回结果：" + result);
            JSONObject jsonObject = JSONObject.parseObject(result);
            //code状态为 1 时进入
            if (jsonObject.getInteger("code") == 1) {
                //floatTipsUrl 获取悬浮窗红点状态和气泡消息提示url
                String floatTipsUrl = jsonObject.getJSONObject("data").getString("floatTipsUrl");
                String floatTipsResult = HttpsUtil.post(floatTipsUrl, sdkRequestMap, null);
                log.info("==========>>获取悬浮窗红点状态返回结果：" + floatTipsResult);
                super.renderJson(floatTipsResult);
                return;
            } else {
                super.renderJson(result);
                return;
            }
        } catch (Exception e) {
            log.error("获取悬浮窗红点状态异常！", e);
            super.requestFailure(StatusType.GET_FLOAT_CONFIG_ERROR);
            return;
        }

    }


    /**
     * SDK2.0 获取悬浮窗接口
     */
    public void getFloatUrl() {
        try {

            log.info("============>>获取悬浮窗接口参数：" + JsonKit.toJson(getParaMap1()));
            PjMap<String, String> param = getParaMap1();

            Map<String, String> sdkRequestMap = new HashMap<>();
            //1.获取SDK配置 请求参数
            sdkRequestMap.put("gameId", param.get("gameId"));
            sdkRequestMap.put("channel", param.get("channel"));
            sdkRequestMap.put("sdkVersion", param.get("sdkVersion"));
            sdkRequestMap.put("token", param.get("token"));
            sdkRequestMap.put("appVersion", param.get("appVersion"));
            String result = HttpsUtil.post(GETSDKCONFIGURL, sdkRequestMap, null);
            log.info("==========>>获取SDK配置返回结果：" + result);
            JSONObject jsonObject = JSONObject.parseObject(result);
            //code状态为 1 时进入
            if (jsonObject.getInteger("code") == 1) {
                //floatUrl 获取悬浮窗页面
                String floatUrl = jsonObject.getJSONObject("data").getString("floatUrl");
                StringBuffer sf = new StringBuffer();
                sf.append(floatUrl).append("?gameId=").append(param.get("gameId"))
                        .append("&channel=").append(param.get("channel"))
                        .append("&sdkVersion=").append(param.get("sdkVersion"))
                        .append("&token=").append(param.get("token"))
                        .append("&appVersion=").append(param.get("appVersion"))
                        .append("&channelGameId=").append(param.get("channelGameId"))
                        .append("&openId=").append(param.get("wxOpenId"));
                log.info("==========>>获取悬浮窗返回结果：" + sf.toString());
                super.requestSuccess("获取悬浮窗成功", sf.toString());
                return;
            } else {
                super.renderJson(result);
                return;
            }
        } catch (Exception e) {
            log.error("获取悬浮窗页面异常！", e);
            super.requestFailure(StatusType.GET_FLOAT_PAGE_ERROR);
            return;
        }

    }

    /**
     * SDK2.0 手机号码登录
     */
    @SuppressWarnings("rawtypes")
    public void mobileLogin() {
        try {
            log.info("==========>>手机号码登录接口参数：" + JsonKit.toJson(getParaMap1()));
            String vr = initRquest(5);
            Map initResult = JsonKit.parse(vr, Map.class);

            if (initResult.get("code") != null
                    && (StatusType.AUTH_SUCCESS.id != (Integer) initResult
                    .get("code"))) {
                this.renderJson(vr);
                return;
            }
            //请求参数
            Map<String, String> reqParams = getParaMap1();
            String sign = SignUtil.generateSign2(reqParams, PjConstants.SDK_SIGN_KEY);
            reqParams.put("sign", sign);
            log.info("==========>>手机号码登录请求参数：" + reqParams.toString());
            String postResult = HttpsUtil.post(PjConstants.sconfig.getNgMobileLoginUrl(), reqParams, null);
            log.info("==========>>手机号码登录返回参数：" + postResult);
            JSONObject jsonObject = JSONObject.parseObject(postResult);
            Integer code = jsonObject.getInteger("code");
            if (StringUtils.isNotEmpty(getPara("isEdition"))) {
                if (code == 1) {
                    Integer isNewUser = jsonObject.getJSONObject("data").getInteger("isNewUser"); //0：老用户登录，1：新手机号账号登录
                    if (isNewUser == 1) {
                        try {
                            ReportData reportData = new ReportData();
                            reportData.setReportSys(SysType.IOS.code);
                            reportData.setReportType(SyncType.REGISTER.code);
                            reportData.setUid(jsonObject.getJSONObject("data").getInteger("uid"));//注册时生成的用户ID
                            reportData.setGameId(channelGame.getGameId());
                            reportData.setCid(getPara("channel"));
                            // String orgIdfa = AdUtils.replaceIdfa(getPara("channel").toUpperCase());
                            reportData.setIdfa(getPara("udid"));
                            reportData.setIdfaMd5(SignUtil.md5(getPara("udid")));
                            reportData.setIp(getClientIp());
                            ReportUtil.reportRegister(reportData);
                        } catch (Exception e) {
                            log.error("==========>>异步上报用户注册异常", e);
                        }
                    }
                }
            }
            Map regResult = JsonKit.parse(postResult, Map.class);
            super.renderJson(regResult);
            return;
        } catch (Exception e) {
            log.error("手机号码登录失败", e);
            super.requestFailure("登录失败");
        }
    }


    /**
     * SDK2.0 选择账户/输入账户登录
     */
    @SuppressWarnings("rawtypes")
    public void selectLogin() {

        try {
            log.info("==========>>输入账户登录接口参数：" + JsonKit.toJson(getParaMap1()));
            String vr = initRquest(5);
            Map initResult = JsonKit.parse(vr, Map.class);

            if (initResult.get("code") != null
                    && (StatusType.AUTH_SUCCESS.id != (Integer) initResult
                    .get("code"))) {
                this.renderJson(vr);
                return;
            }
            //请求参数
            Map<String, String> reqParams = getParaMap1();
            String sign = SignUtil.generateSign2(reqParams, PjConstants.SDK_SIGN_KEY);
            reqParams.put("sign", sign);
            log.info("==========>>输入账户登录请求参数：" + reqParams.toString());
            String postResult = HttpsUtil.post(PjConstants.sconfig.getNgSelectLoginUrl(), reqParams, null);
            log.info("==========>>输入账户登录返回参数：" + postResult);
            Map regResult = JsonKit.parse(postResult, Map.class);
            super.renderJson(regResult);
            return;
        } catch (Exception e) {
            log.error("输入账户登录失败", e);
            super.requestFailure("登录失败");
        }
    }


    @SuppressWarnings("static-access")
    private String isWxLoginOpenId(String channelGameId, String channel) {
        String payUrl = "";
        try {
            //因为是调用微信公众号支付，需要获取用户openid，所以需要先授权登录获取用openid，在跳转支付接口。
            if (UaUtil.getClientType(getRequest()) == UaUtil.weixin) {
                StringBuffer callback = new StringBuffer();
                if (channelGameId.equals("11190") ){
                    callback.append(PAOJIAOMAINURLV3).append("?channelGameId=").append(channelGameId)
                            .append("&channel=").append(channel);
                }else{
                    callback.append(PAOJIAOMAINURLV2).append("?channelGameId=").append(channelGameId)
                            .append("&channel=").append(channel);
                }

                String loginUrl = "/wxThird/login?platform=" + platform + "&toUrl=" + callback.toString();
                String ucHost = PjConstants.sconfig.getUcUrl();

                payUrl = ucHost + loginUrl;
                log.info("生成泡椒微信授权登录url======>>" + payUrl);
            }
        } catch (Exception e) {
            log.error("微信授权登录发生异常:", e);
        }
        return payUrl;
    }

    /**
     * 获取带参数微信二维码
     */
    public void getWeChatCode() {
        try {
            log.info("==========>>获取微信二维码请求参数：" + JsonKit.toJson(getParaMap1()));
            //获取当前时间戳到毫秒
            Long time = DateUtil.getTimestamp(new Date());
            //请求参数
            Map<String, String> reqParams = new HashMap<>();
            reqParams.put("appid", PjConstants.SDK_PJ_PUB_APPID);
            reqParams.put("gameId", getPara("channelGameId"));
            reqParams.put("user_name", getPara("user_name"));
            reqParams.put("password", getPara("password"));
            reqParams.put("ts", time.toString());
            String params = SignUtil.sortParam2(reqParams);
            String sign = SignUtil.md5(URLEncoder.encode(params) + PjConstants.SDK_PJ_PUB_APPKEY);
            reqParams.put("sign", sign);
            log.info("==========>>泡椒微信二维码请求参数：" + reqParams.toString());
            String postResult = HttpsUtil.post(PjConstants.SDK_PJ_PUB_URL, reqParams, null);
            log.info("==========>>泡椒微信二维码返回参数：" + postResult);
            Map regResult = JsonKit.parse(postResult, Map.class);
            super.renderJson(regResult);
            return;
        } catch (Exception e) {
            log.error("泡椒微信二维码获取失败", e);
            super.requestFailure("二维码获取失败");
        }
    }

    /**
     * IOS端 idfa字段匹配
     */
    public void getIOSMatchIdfa() {
        try {
            log.info("==========>>IOS匹配CID参数：" + JsonKit.toJson(getParaMap1()));
            String vr = initRquest(5);
            Map initResult = JsonKit.parse(vr, Map.class);

            if (initResult.get("code") != null
                    && (StatusType.AUTH_SUCCESS.id != (Integer) initResult
                    .get("code"))) {
                this.renderJson(vr);
                return;
            }
            String udid = getPara("idfa");

            if (StringUtils.isEmpty(udid)) {
                log.info("==========>>IOS匹配CID参数为空！");
                return;
            }

            StatDeviceCid findCid = statDeviceCidService.findStatDeviceCid(channelGame.getGameId().toString(), udid.replace("-", ""));

            //如未查询到绑定数据，则请求接口
            if (findCid == null) {
                String cid = "";
                ReportData reportData = new ReportData();
                reportData.setReportSys(SysType.IOS.code);
                reportData.setReportType(SyncType.ACTIVATE.code);
                reportData.setGameId(channelGame.getGameId());
                reportData.setIdfa(udid);
                reportData.setIdfaMd5(SignUtil.md5(udid));
                reportData.setIp(getClientIp());
                //匹配cid
                String retCid = ReportUtil.getIosCid(reportData);
                if (StrKit.notBlank(retCid)) {
                    cid = retCid;
                } else {
                    cid = PjConstants.DEFAULT_CID;
                }
                //将数据保存至数据库 StatDeviceCid
                StatDeviceCid statDeviceCid = new StatDeviceCid();
                statDeviceCid.setCid(cid);
                statDeviceCid.setUdid(udid.replace("-", ""));
                statDeviceCid.setGameId(channelGame.getGameId());
                statDeviceCid.setGameName(channelGame.getGameName());
                statDeviceCid.setCreateDate(new Date());
                statDeviceCid.setCreateTime(new Date());
                statDeviceCidService.save(statDeviceCid);
                Map<String, String> resultMap = new HashMap<>();
                resultMap.put("cid", cid);
                super.requestSuccess("请求匹配成功", resultMap);
                return;
            }
            super.requestSuccess("本地匹配成功", findCid);
            return;

        } catch (Exception e) {
            log.error("IOS匹配CID错误,ERROR:", e);
            super.requestFailure("IOS匹配CID错误");
        }
    }


    /**
     * 游戏闪屏背景图查询
     */
    public void getGameFlashScreen() {
        try {
            String channelGameId = getPara("channelGameId");
            String channel = getPara("channel");
            //查询原游戏ID
            PjThirdSdkChannelGame pjThirdSdkChannelGame = channelGameService.findGameById(Integer.parseInt(channelGameId));
            //查询是否配置闪屏图
            BasePpGameFlashScreen ppGameFlashScreen = ppGameFlashScreenService.findGameFlashScreen(pjThirdSdkChannelGame.getGameId().toString(), channel);
            if (ppGameFlashScreen == null) {
                super.requestFailure("未配置闪屏");
                return;
            } else {
                super.requestSuccess("查询成功", ppGameFlashScreen);
                return;
            }
        } catch (Exception e) {
            log.info("游戏闪屏背景图查询异常ERROR：" + e.getMessage());
        }
    }

}
