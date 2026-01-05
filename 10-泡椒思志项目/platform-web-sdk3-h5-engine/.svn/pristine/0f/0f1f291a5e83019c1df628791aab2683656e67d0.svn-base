package com.paojiao.sdk3.common.util;

import com.jfinal.kit.StrKit;

import com.paojiao.sdk3.common.PayStyle;
import com.paojiao.sdk3.model.PpPayConfig;
import com.paojiao.sdk3.model.PpUserVoucher;
import com.paojiao.sdk3.service.impl.VoucherServiceImpl;
import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.apache.log4j.spi.LoggerFactory;

import java.math.BigDecimal;
import java.net.URLEncoder;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * @Description
 * @Author zhouzhenyi
 * @Date 2020/8/19
 **/
public class SDKUtil {
    private final Logger log = Logger.getLogger(SDKUtil.class);

    private static final String sdkHost = "https://sdk2.paojiao.cn/sdk/toUc";


    /**
     * sdk2.0编号
     **/
    public static final String SDK2 = "SDK2";
    public static final double SDK2_VALUE = 2;

    public static final String SDK2_1 = "SDK2.1";
    public static final double SDK2_1_VALUE = 2.1;

    /**
     * sdk匹配正则
     **/
    public static final String REGEX = "SDK(.*)_(.*)";


    /**
     * 获取sdk版本信息，获取不到代表是旧sdk
     * 例子：SDK2_v2.1.3 SDK2.1_v2.10.1
     *
     * @param version
     * @return
     */
    /*public static SdkVersionEntity getNewSdkVersion(String version) {
        try {
            if (StringUtils.isEmpty(version)) {
                return null;
            }
            Pattern pattern = Pattern.compile(REGEX);
            Matcher m = pattern.matcher(version);
            if (m.matches()) {
                String mainSdkVersionValue = m.group(1);
                String mainSdkVersion = "SDK" + mainSdkVersionValue;
                String sdkVersion = m.group(2);

                SdkVersionEntity v = new SdkVersionEntity();
                v.setMainSdkVersion(mainSdkVersion);
                v.setMainSdkVersionValue(Double.parseDouble(mainSdkVersionValue));
                v.setSdkVersion(sdkVersion);
                return v;
            }
        } catch (Exception e) {
            log.error("sdk版本号解析异常", e);
        }
        return null;
    }*/
    public static String createSdkUrl(String url) {
        try {
            String jumpUrl = sdkHost + "?callback=" + URLEncoder.encode(url, "UTF-8");
            return jumpUrl;
        } catch (Exception e) {
        }
        return null;
    }




    /**
     * 判断是否是sdk2.0版本及以后的版本
     *
     * @param sdkVersion sdk版本号
     * @return
     */
    public static boolean isSdk2(String sdkVersion) {
        if (StrKit.isBlank(sdkVersion)) {
            return false;
        }
        if (sdkVersion.startsWith("SDK2")) {
            return true;
        }
        return false;
    }

    /**
     * 判断是不是银狐平台
     *
     * @param platform
     * @return
     *//*
    public static boolean isYhPlatform(int platform) {
        if (platform == Platform.YINHU_IOS_SDK
                || platform == Platform.YINHU_WEIXIN
                || platform == Platform.YINHU_GAME_CENTER_WEIXIN
                || platform == Platform.YINHU_IOS_H5_SDK
                || platform == Platform.YINHU_ANDROID_H5_SDK
                || platform == Platform.YINHU_ANDROID_SDK) {
            return true;
        }
        return false;
    }
*/
    /**
     * 判断游戏id是否在游戏id字符串内
     *
     * @param gameid
     * @param gameidsStr
     * @return
     */
    public static boolean containGameId(int gameid, String gameidsStr) {
        if (StringUtils.isEmpty(gameidsStr)) {
            return true;
        }
        String gameIds[] = gameidsStr.split(",");
        List<String> gameList = Arrays.asList(gameIds);
        if (gameList.contains(String.valueOf(gameid))) {
            return true;
        }
        return false;
    }

    /**
     * 统计可用代金券数量
     * @param userVoucherList
     * @return
     */
    public static int countCanUse(List<PpUserVoucher> userVoucherList) {
        int canUseSize = 0;
        if (userVoucherList == null || userVoucherList.size() == 0) {
            return canUseSize;
        }

        for (PpUserVoucher ppUserVoucher : userVoucherList) {
            boolean canUse = ppUserVoucher.get("canUse");
            if (canUse) {
                canUseSize++;
            }
        }
        return canUseSize;
    }

    /**
     * 优惠金额最大的代金券
     * @param userVoucherList
     * @return
     */
    public static PpUserVoucher getMaxDeductVoucher(List<PpUserVoucher> userVoucherList) {
        if (userVoucherList == null || userVoucherList.size() == 0) {
            return null;
        }
        List<PpUserVoucher> userVoucherList2 = new ArrayList<PpUserVoucher>();
        for (PpUserVoucher ppUserVoucher : userVoucherList) {
            boolean canUse = ppUserVoucher.get("canUse");
            if (canUse) {
                userVoucherList2.add(ppUserVoucher);
            }
        }
        if (userVoucherList2 == null || userVoucherList2.size() == 0) {
            return null;
        }

        Collections.sort(userVoucherList2, new Comparator<PpUserVoucher>() {
            @Override
            public int compare(PpUserVoucher o1, PpUserVoucher o2) {
                int deduct1 =  o1.getDeduct();
                int deduct2 =  o2.getDeduct();
                if (deduct1 < deduct2) {
                    return 1;
                }else {
                    return -1;
                }
            }
        });
        return userVoucherList2.get(0);
    }

    public static List<PpPayConfig> getPayConfigList(List<PpPayConfig> payconfigList, int client) {
        List<PpPayConfig> newPayConfigList = new ArrayList<PpPayConfig>();
        for (PpPayConfig ppPayConfig : payconfigList) {
            //微信浏览器内不能使用支付宝
            if (client == UaUtil.weixin && ppPayConfig.getPayType() == PayStyle.ALIPAY_MOBILE.id) {
            } else {
                newPayConfigList.add(ppPayConfig);
            }
        }
        return newPayConfigList;
    }
    public static double doubleFormat(double number) {
        // 将double类型转为BigDecimal
        BigDecimal bigDecimal = new BigDecimal(number);
        // 保留两位小数,并且四舍五入
        return bigDecimal.setScale(2, BigDecimal.ROUND_HALF_UP).doubleValue();
    }
}
