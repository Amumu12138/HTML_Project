package com.paojiao.sdk3.controller.pay;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.jfinal.aop.Inject;
import com.jfinal.kit.JsonKit;
import com.jfinal.kit.StrKit;
import com.paojiao.sdk3.common.PayStyle;
import com.paojiao.sdk3.common.PjConstants;
import com.paojiao.sdk3.common.StatusType;
import com.paojiao.sdk3.common.util.*;
import com.paojiao.sdk3.common.util.https.HttpsUtil;
import com.paojiao.sdk3.controller.BaseController;
import com.paojiao.sdk3.controller.pay.config.PayConfig;
import com.paojiao.sdk3.controller.pay.util.PaySignUtil;
import com.paojiao.sdk3.model.*;
import com.paojiao.sdk3.service.*;
import com.paojiao.sdk3.service.impl.*;
import org.apache.commons.lang.StringUtils;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * PayController
 *
 * @author jiangkun
 * @date 2020/10/30
 */
public class PayController extends BaseController {

    private PpUserService userService = new PpUserServiceImpl();
    private WalletService walletService = new WalletServiceImpl();
    private VoucherService voucherService = new VoucherServiceImpl();
    private GameService ppGameService = new GameServiceImpl();
    private PayConfigService payConfigService = new PayConfigServiceImpl();
    private PayService payService = new PayServiceImpl();
    private PpUserRealNameAuthService ppUserRealNameAuthService = new PpUserRealNameAuthServiceImpl();

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
    private PjMemberBindingService bindService;

    private PjThirdSdkChannel sdkChannel;
    private PjThirdSdkChannelGame channelGame;
    private PjCpGame game;
    private PjMemberBinding buser;
    private final int platform = 1;  //泡椒平台
    private final static String PAY_KEY = "VMKNuQFVWOYDIGXOlC7QzDbsYrfV285G";  //拉起支付验证KEY

    private final static String PAY_CENT_URL = "https://pay.paojiao.cn/pay/createH5PayUrl";  //支付中心URL

    /**
     * sdk2.0 游戏支付-跳转选择支付页面
     */
    public void payGameOrder() {
        log.info("------------->>>payGameOrder:" + JsonKit.toJson(getParaMap1()));

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
            if (channelGame.getStatus() == 11) {//11：支付被禁用
                requestFailure(StatusType.PAY_FORBIDDEN_ERROR);
                return;
            }

            Float money = getParaToFloat("money");
            if (money == null || money.floatValue() <= 0) {
                requestFailure(StatusType.ORDER_MONEY_INVALID);
                return;
            }
            //游戏名称
            setAttr("gameName",channelGame.getGameName());
            //泡椒平台生成订单
            PjThirdSdkOrder order = orderService.generatePayOrder(sdkChannel, channelGame, game, getParaMap1(), money, buser, 2, PayStyle.PAY_CENTER.id);
            if (order == null) {
                requestFailure(StatusType.ORDER_FAL);
                return;
            }
            setAttr("order", order);   //订单信息
            Integer uid = getParaToInt("uid");

            PpUser ppUser = null;
            try {

                //查询用户信息pp_user，不存在调用业务平台api查询，并绑定。
                String ip = getClientIp();
                //泡椒uid查询公共平台用户Id
                ppUser = userService.findUser(uid);
            } catch (Exception e) {
                log.error(ErrorMsg.QUERY_USER_EXCEPTION.msg, e);
                this.renderError(ErrorMsg.QUERY_USER_EXCEPTION);
                return;
            }
            //用户信息获取失败
            if (ppUser == null) {
                this.renderError(ErrorMsg.QUERY_USER_EXCEPTION);
                return;
            }

            if (ppUser.getStatus() != null && ppUser.getStatus() != 1) {//判断用户是否被禁用,禁用无法使用支付
                this.renderError(ErrorMsg.USER_DISABLE);
                return;
            }
            setAttr("ppUser", ppUser);

            //根据业务平台id、游戏id，查询对应游戏
            Integer gameId = game.getId();//业务平台的游戏id（非公共管理平台的游戏id）
            PpGame game = ppGameService.findGame2(platform, gameId);
            if (game == null || game.getStatus() == 0) {//游戏不存在/禁用
                this.renderError(ErrorMsg.GAME_NOT_EXIST);
                return;
            }

            if (game.getPayStatus() == 0) {//游戏关闭支付
                this.renderError(ErrorMsg.GAME_NOT_PAY);
                return;
            }
            //查找支付配置
            List<PpPayConfig> payconfigList = payConfigService.findPlatformPay(platform);//平台默认支付配置

            int client = UaUtil.getClientType(getRequest());
            setAttr("clientType", client);//客户端类型
            List<PpPayConfig> newPayConfigList = SDKUtil.getPayConfigList(payconfigList, client);
            setAttr("payConfigList", newPayConfigList);//支付方式列表
            //查询用户钱包
            PpWallet wallet = walletService.findUserWallet(ppUser.getId());
            setAttr("wallet", wallet); //钱包信息
            setAttr("wxOpenId", getPara("wxOpenId"));//微信openid
            //=============================新sdk2处理===========================================

            //查询用户优惠券
            List<PpUserVoucher> userVoucherList = voucherService.findUserVoucherList(ppUser.getId(), order);
            setAttr("userVoucherList", userVoucherList);

            //可用代金券数量
            int canUseSize = SDKUtil.countCanUse(userVoucherList);
            setAttr("canUseSize", canUseSize);

            //优惠金额最大的代金券
            setAttr("maxDeductVoucher", SDKUtil.getMaxDeductVoucher(userVoucherList));

            //不可用代金券数量
            //setAttr("canNotUseSize", userVoucherList.size() - canUseSize);
            //用户游币数量
            Double userGold = 0.0;
            if (wallet != null) {
                userGold = wallet.getGold() + wallet.getFreeGold();
            }
            setAttr("userGold", userGold.intValue());//用户游币数量(包含免费的)

            //是否显示充值按钮  //是否显示领券按钮
            setAttr("showRechargeBtn", true);
            setAttr("showVoucherBtn", true);
            //sdk2.0 支付页面
          /*  if (sdkInfo.getMainSdkVersion().equals(SDKUtil.SDK2)) {
                setAttr("showRechargeBtn", false);
                setAttr("showVoucherBtn", false);
                this.renderJsp(ViewConstant.PAY_GAME_SDK2_VIEW);
                return;
            }*/
            //没有可以使用的代金券，查询可领取的代金券数量
            if (canUseSize == 0) {
                int canReceiveSize = voucherService.countCanReceiveVoucher(ppUser.getId(),order);
                setAttr("canReceiveSize", canReceiveSize);
            }

            //生成游币充值sdk跳转url
            setAttr("goldRechargeUrl", SDKUtil.createSdkUrl("/pay"));
            //生成代金券sdk跳转url
            setAttr("voucherUrl", SDKUtil.createSdkUrl("/voucher"));
            //查询cid充值折扣
            PpPayCidDiscount cidDiscount = payService.findCidDiscount(game, order.getCid());
            double cidDiscountRate = (cidDiscount == null ? 0 : cidDiscount.getRate());
            setAttr("cidDiscountRate", cidDiscountRate);
            setAttr("cidDiscountMoney", 0);
            double cidDiscountMoney = 0;
            //查询cid充值折扣金额
            if (cidDiscountRate > 0) {
                 cidDiscountMoney = SDKUtil.doubleFormat((1 - cidDiscountRate) * order.getMoney());
                setAttr("cidDiscountMoney", cidDiscountMoney);
            }

            //查询游币充值折扣
            setAttr("goldDiscount", payService.findGoldDiscount());
            //充值获得积分
            Integer credits =(int) Math.floor(order.getMoney() - cidDiscountMoney);
            setAttr("credits", credits);

            //sdk2.1及以后的支付页面

            this.render(ViewConstant.PAY_GAME_SDK21_VIEW);
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
     * sdk2.0 获取支付Url
     */
    public void getPayUrl() {
        try {
            PjMap<String, String> map = getParaMap1();
            System.out.println("----------------" + map.toString());
            Double money = Double.parseDouble(map.get("orderPirce"));  //订单金额
            Double cidDiscountMoney = Double.parseDouble(map.get("cidDiscountMoney"));  //cid折扣金额
            Integer voucherId = map.getToInt("voucherId"); //优惠券Id
            Integer uid = map.getToInt("uid"); //泡椒平台用户Id
            Integer puid = map.getToInt("puid"); //泡椒平台用户Id
            if (money <= 0) {//非法的商品价格
                this.requestFailure(ErrorMsg.INVALID_MONEY.msg);
                return;
            }
            //用户不存在
            PpUser user = userService.findUser(uid);
            if (user == null) {
                this.requestFailure(ErrorMsg.USER_NOT_EXIST.msg);
                return;
            }


            //验证订单号是否存在
            PjThirdSdkOrder sdkOrder = orderService.findOrderByOrderNo(map.get("orderNumber"));
            if (sdkOrder == null) {
                super.requestFailure(ErrorMsg.PAY_ORDER_NOT_EXIST.msg);
            } else if (sdkOrder.getStatus() == PayStatus.PAY_SUCCESS.id) {// 已完成支付
                super.requestFailure(ErrorMsg.PAY_ORDER_FINISHED.msg);
                return;
            }
            //CP游戏未开启实名认证时进入 0：否，1：开启  2：强制开启
            PjCpGame pjCpGame = gameService.findGameById(sdkOrder.getGameId());
            if (!pjCpGame.getRealNameAuthentication().equals("0")) {
            //查询用户是否实名
            PpUserRealNameAuth ppUserRealNameAuth = ppUserRealNameAuthService.findUserRealNameAuth(puid);
            if (ppUserRealNameAuth == null) {
                requestFailure(StatusType.USER_REAL_NAME_AUTH_NONE);
                return;
            }
            String idNo = ppUserRealNameAuth.getIdNo().trim();//身份证
            Integer age = IdcardUtil.getAgeByIdNumber(idNo);//年龄
            Integer realNameAuthStatus = IdcardUtil.getRealNameAuthStatus(age);//实名状态
            if (realNameAuthStatus == 3) {   //8岁以下不允许充值
                requestFailure(StatusType.NO_AGE_NO_PAY);
                return;
                //8-16未成年
            } else if (realNameAuthStatus == 4) {
                if (money > 50) {    //单笔充值金额不能大于50
                    requestFailure(StatusType.PAY_MONEY_EXCESS);
                    return;
                }
                //查询用户当月累计充值金额
                Integer sumMoney = orderService.findUserMonthMoney(uid);

                if (sumMoney > 200) { //每月充值金额累计不得超过200元人民币
                    requestFailure(StatusType.MONTH_PAY_MONEY_EXCESS);
                    return;
                }
                //16-18未成年
            } else if (realNameAuthStatus == 5) {
                if (money > 100) {    //单笔充值金额不能大于50
                    requestFailure(StatusType.PAY_MONEY_EXCESS);
                    return;
                }
                //查询用户当月累计充值金额
                Integer sumMoney = orderService.findUserMonthMoney(uid);
                if (sumMoney > 400) { //每月充值金额累计不得超过400元人民币
                    requestFailure(StatusType.MONTH_PAY_MONEY_EXCESS);
                    return;
                }
            }
        }

            //商品金额验证
            if (sdkOrder.getMoney() != money.floatValue()) {
                super.requestFailure(ErrorMsg.INVALID_MONEY.msg);
                return;
            }

            //查询用户代金券
            double deduction = 0;//代金券抵扣金额
            double price = sdkOrder.getMoney();//订单原价
            //代金券Id是否为空
            if (voucherId != null) {
                PpUserVoucher userVoucher = voucherService.checkUserVoucher(user.getId(), sdkOrder, voucherId);
                if (userVoucher == null) {
                    super.requestFailure(ErrorMsg.VOUCHER_CAN_NOT_USE.msg);
                    return;
                }
                deduction = userVoucher.getDeduct().doubleValue();
                if (deduction > price) {//代金券抵扣金额大于订单金额
                    deduction = price;
                }
            }
            if (cidDiscountMoney == null){
                cidDiscountMoney = 0.0;
            }

            //实际支付金额
            double practicalMoney = SDKUtil.doubleFormat(price - deduction - cidDiscountMoney);

            //请求参数
            Map<String, Object> param = new HashMap<String, Object>();
            param.put("platform", platform);//业务平台id
            param.put("uid", uid);//业务平台用户id
            param.put("puid", user.getId());//公共平台用户id
            param.put("gameId", sdkOrder.getGameId());//游戏id
            param.put("productName", sdkOrder.getGoodsName() == null ? "" : sdkOrder.getGoodsName());//产品名称
            param.put("price", price);//产品价格
            param.put("money", practicalMoney);//实际支付价格
            param.put("ip", getClientIp());//用户ip地址
            param.put("orderType", 1);//订单类型 1:游戏订单
            param.put("payType", map.get("payType"));//支付方式 1支付宝 2微信 3钱包
            param.put("busOrder", sdkOrder.getOrderNumber());//H5平台订单号
            param.put("sdkVersion", sdkOrder.getSdkVersion() == null ? "" : sdkOrder.getSdkVersion());//sdk版本
            param.put("cid", sdkOrder.getCid());//cid
            param.put("deduction", deduction);//折扣金额
            param.put("serverId", sdkOrder.getServerId() == null ? "" : sdkOrder.getServerId()); //服务器id
            param.put("serverName", sdkOrder.getServerName() == null ? "" : sdkOrder.getServerName()); //服务器名称
            param.put("roleName", sdkOrder.getRoleName() == null ? "" : sdkOrder.getRoleName());//角色名称
            param.put("cpOrder", sdkOrder.getCpOrderNumber()); //cp订单号
            param.put("notifyUrl", PjConstants.sconfig.getSdkHost() + PayConfig.notifyUrl);//支付，异步通知地址async
            param.put("cidDiscountMoney", cidDiscountMoney);//cid 折扣金额

            if (voucherId != null) {
                param.put("userVoucherId", voucherId);//用户代金券id
            }
            param.put("timestamps", new Date().getTime());//时间戳
            if (StringUtils.isNotEmpty(map.get("wxOpenId"))) {
                param.put("openId", map.get("wxOpenId"));//微信openId
            }
            //生成签名
            String sign = PaySignUtil.generateSign(param, PAY_KEY);
            param.put("sign", sign);

            log.info("调用支付中心支付 start======>>" + JsonKit.toJson(param));
            String res = HttpsUtil.post(PAY_CENT_URL, param, getRequest());
            log.info("调用支付中心支付 end======>>" + res);
            if (StrKit.isBlank(res)) {
                super.requestFailure(ErrorMsg.PAY_EXCEPTION.msg);
                return;
            }
            JSONObject jsonObj = JSON.parseObject(res);
            int code = jsonObj.getInteger("code");
            if (code != 1) {//调用失败
                super.requestFailure(jsonObj.getString("msg"));
                return;
            }
            String data = jsonObj.getString("data");
            int clientType = UaUtil.getClientType(getRequest());

            if (clientType != UaUtil.pc && clientType != UaUtil.weixin) {
                if ("1".equalsIgnoreCase(map.get("payType"))) {//支付宝
                    data = PayUtil.parseAliPayForm(data, getRequest());
                } else if ("2".equalsIgnoreCase(map.get("payType"))) {//微信
                    data = PayUtil.parseWechatPay(data, getRequest());
                }
            } else {
                //支付宝扫码，返回表单代码
                //微信扫码返回base64图片
                if ("1".equalsIgnoreCase(map.get("payType"))) {//支付宝
                    data = PayUtil.parseAliPayQrPayForm(data);//解析支付宝表单代码
                }
            }

            super.requestSuccess("拉取支付成功", data);
        } catch (Exception e) {
            log.error("拉起支付异常,错误信息：", e);
            super.requestFailure(ErrorMsg.PAY_EXCEPTION.msg);
        }
    }

}
