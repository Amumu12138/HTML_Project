package com.paojiao.sdk3.controller.thirdsdk.huawei;

public class HuaWeiPayCallbackCode {
    /**
     * 操作结果，
     * 0:表示成功
     * 1:验签失败
     * 2: 超时
     * 3: 业务信息错误，比如订单不存在
     * 94: 系统错误
     * 95: IO 错误
     * 96: 错误的url
     * 97: 错误的响应
     * 98: 参数错误
     * 99: 其他错误
     */

    public static final Integer SUCCESS = 0;
    public static final Integer SING_VERIFY_FAIL = 1;
    public static final Integer ORDER_NONE = 3;
    public static final Integer SYSTEM_ERROR  = 94;
    public static final Integer IO_ERROR = 95;
    public static final Integer URL_ERROR = 96;
    public static final Integer RESPONSE_ERROR = 97;
    public static final Integer PARAM_ERROR = 98;
    public static final Integer OTHER_ERROR = 99;
}
