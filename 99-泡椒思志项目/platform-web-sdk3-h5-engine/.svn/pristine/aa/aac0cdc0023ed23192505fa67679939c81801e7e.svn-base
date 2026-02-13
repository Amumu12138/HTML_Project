package com.paojiao.sdk3.common.util;

import com.jfinal.kit.StrKit;
import com.paojiao.sdk3.controller.thirdsdk.HttpAgent;
import com.sun.org.apache.bcel.internal.generic.IF_ACMPEQ;
import com.sun.org.apache.xpath.internal.operations.And;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * @Description 支付工具类
 * @Author zhouzhenyi
 * @Date 2020/11/10
 **/
public class PayUtil {

    private static String IOS_ALIPAY_URLScheme = "alipay://alipayclient/?%7B%22requestType%22%3A%22SafePay%22%2C%22fromAppUrlScheme%22%3A%22alipays%22%2C%22dataString%22%3A%22h5_route_token%3D%5C%22{h5_route_token}%5C%22%26is_h5_route%3D%5C%22true%5C%22%22%7D";
    private static String ANDROID_ALIPAY_URLScheme = "alipays://platformapi/startApp?appId=20000125&orderSuffix=h5_route_token%3D%22{h5_route_token}%22%26is_h5_route%3D%22true%22";
    /**
     * 解析支付宝表单，生成支付宝app URLScheme跳转链接
     * @return
     */
    public static String  parseAliPayForm(String form, HttpServletRequest request){
        //form = StringEscapeUtils.unescapeHtml(form);
        Document doc = Jsoup.parse(form);
        Elements formElement = doc.getElementsByTag("form");
        Elements elements = formElement.select("input");
        String biz_content = "";
        String action =  formElement.attr("action");;
        for(Element inputTag : elements) {
            String name = inputTag.attr("name");
            if ("biz_content".equalsIgnoreCase(name)) {
                biz_content = inputTag.attr("value");
            }
        }
        Map<String,String> param = new HashMap<>();
        param.put("biz_content",biz_content);

        String res = HttpAgent.newInstance().get(action,param);
        if (StrKit.isBlank(res)) {
            return null;
        }

        String urlScheme = "";
        //获取h5_route_token，拉起支付宝app使用
        String h5_route_token = res.substring(res.indexOf("h5_route_token")+15,res.indexOf("h5_route_token")+62);
        int clientType = UaUtil.getClientType(request);
        if (clientType == UaUtil.mobile_ios) {
           urlScheme = IOS_ALIPAY_URLScheme.replace("{h5_route_token}",h5_route_token);
        }else{
            urlScheme = ANDROID_ALIPAY_URLScheme.replace("{h5_route_token}",h5_route_token);
        }
        return urlScheme;
    }

    /**
     * 解析支付宝二维码支付表单代码。
     * 手动提交网页，解析网页获取支付二维码，并转成base64
     * @param form
     * @return
     */
    public static String  parseAliPayQrPayForm(String form){
        Document doc = Jsoup.parse(form);
        Elements formElement = doc.getElementsByTag("form");
        Elements elements = formElement.select("input");
        String biz_content = "";
        String action =  formElement.attr("action");;
        for(Element inputTag : elements) {
            String name = inputTag.attr("name");
            if ("biz_content".equalsIgnoreCase(name)) {
                biz_content = inputTag.attr("value");
            }
        }
        Map<String,String> param = new HashMap<>();
        param.put("biz_content",biz_content);

        String res = HttpAgent.newInstance().get(action,param);
        if (StrKit.isBlank(res)) {
            return null;
        }

        //解析网页，获取支付二维码
        Document doc2 = Jsoup.parse(res);
        Elements elements2 = doc2.select("input");
        String qrCode = null;//支付宝支付二维码url
        for(Element inputTag : elements2) {
            String name = inputTag.attr("name");
            if ("qrCode".equalsIgnoreCase(name)) {
                qrCode = inputTag.attr("value");
            }
        }
        if(qrCode == null){
            return null;
        }
        String base64Img = QrCodeUtil.createQr2Base64(qrCode);//生成二维码并返回图片base64编码
        return base64Img;
    }





        /**
         * 解析url获取微信app支付urlScheme
         * @param payUrl 微信支付url
         * @param request
         * @return
         */
    public static String  parseWechatPay(String payUrl, HttpServletRequest request){
        Map<String, String> headers = new HashMap<String, String>();
        headers.put("Referer","https://pay.paojiao.cn");
        String res = HttpAgent.newInstance().get(payUrl,headers,null,"UTF-8");
        if (StrKit.isBlank(res)) {
            return null;
        }
        String urlScheme = "weixin"+PayUtil.getBetweenStr(res,"weixin(.*?)\"");
        return urlScheme;
    }

    public static String getBetweenStr(String soap,String rgex) {
        Pattern pattern = Pattern.compile(rgex);// 匹配的模式
        Matcher m = pattern.matcher(soap);
        while (m.find()) {
            return m.group(1);
        }
        return "";

    }

}
