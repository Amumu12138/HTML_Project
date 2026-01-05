package com.paojiao.sdk3.common.util;

/** 返回信息的错误码 */
public enum ErrorMsg {

    INVALID_SIGN("签名验证失败", 10000),
    PARAM_ERROR("参数错误", 10001),
    PLATFORM_NOT_EXIST("业务平台不存在", 10002),
    GAME_NOT_EXIST("游戏不存在", 10003),
    PAYTYPE_NOT_CONFIG("未配置支付方式", 10004),
    PAY_ORDER_EXCEPTION("支付跳转异常", 10005),
    UID_NOT_NULL("UID不能为空", 10006),
    USER_NOT_EXIST("用户不存在", 10007),
    QUERY_USER_EXCEPTION("获取用户信息异常", 10008),
    SAVE_ORDER_EXCEPTION("保存订单信息异常", 10009),
    BUS_ORDER_EXIST("订单已经存在，请勿重复提交！", 10010),
    PAY_EXCEPTION("支付处理异常", 10011),
    PAY_ORDER_NOT_EXIST("订单不存在", 10012),
    PAY_ORDER_FINISHED("订单已经支付完成，请勿重复支付！", 10013),
    RED_PACKET_NOT_ENOUGH("红包余额不足", 10015),
    INVALID_PARAM("非法参数", 10014),
    PAYTYPE_NOT_EXIST("当前支付方式不可用或不存在", 10016),
    GEN_PAYURL_EXCEPTION("生成支付链接失败", 10017),
    INVALID_RED_PACKET_MONEY("红包使用金额错误", 10018),
    GEN_THIRD_PAYURL_EXCEPTION("生成支付链接失败", 10019),
    INVALID_MONEY("商品价格错误", 10020),
    WALLET_NOT_ENOUGH("您的钱包余额不足，请及时充值，或者选择其他支付方式。", 10021),
    PLATFROM_PAY_FAIL("业务平台扣款失败", 10022),
    PLATFROM_PAY_EXCEPTION("业务平台扣款异常", 10023),
    WALLET_PAY_FAIL("钱包支付失败", 10024),
    UPDATE_ORDER_EXCEPTION("更新订单信息异常", 10025),
    GEN_ORDER_EXCEPTION("订单生成失败", 10026),
    QUERY_ORDER_EXCEPTION("查询订单失败", 10027),
    SAVE_USER_EXCEPTION("保存用户信息失败", 10028),
    NOT_SET_PAY_PASSWORD("没有设置支付密码,请先设置支付密码。", 10029),
    USER_SESSION_TIMEOUT("用户信息已过期", 10030),
    USER_NOT_MATCH("用户信息不一致", 10031),
    PAY_PASSWORD_ERROR("支付密码错误", 10032),
    USER_DISABLE("当前用户无法使用支付", 10033),
    CARD_ORDER_NOT_EXIST("优惠卡订单不存在", 10033),
    GET_ORDER_EXCEPTION("获取订单异常", 10034),
    GET_USER_GAME_EXCEPTION("获取用户游戏异常", 10035),
    PAY_FREQUENTLY("您的操作过于频繁，请稍后再试。", 100036),
    UPDATE_USER_ADDRESS_EXCEPTION("更新用户地址信息异常", 10037),
    IOS_PREVENT_CHARGE("IOS内购用户代充", 10038),
    GAME_NOT_PAY("游戏已关闭支付功能", 10039),
    DOWNLOAD_BILL_FAIL("账单下载失败", 10040),
    DOWNLOAD_BILL_NOT_EXIST("账单不存在", 10041),
    REAL_NAME_ERROR("实名认证异常", 10042),
    ID_CARD_ERROR("输入正确完整的身份证号码", 10043),
    REAL_NAME_SUCCESS("实名认证成功", 10044),
    REAL_NAME_FAIL("实名认证失败", 10045),
    ACCOUNT_REAL_NAME_SUCCESS("该账号已完成实名认证", 10046),
    VOUCHER_CAN_NOT_USE("代金券无法使用", 10047),
    VOUCHER_NOT_EXIST("代金券已过期或不存在", 10048);










    public int code;
    public String msg;

    private ErrorMsg(String msg, int code) {
        this.code = code;
        this.msg = msg;
    }

    public int getId() {
        return code;
    }

    public void setId(int code) {
        this.code = code;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public static ErrorMsg getById(int v) {
        ErrorMsg gender = null;
        ErrorMsg[] list = ErrorMsg.values();

        for (ErrorMsg g : list) {
            if (g.code == v) {
                gender = g;
            }
        }
        return gender;
    }

    public static ErrorMsg getByName(String name) {
        return ErrorMsg.valueOf(name);

    }

}
