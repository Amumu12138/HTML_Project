package com.paojiao.sdk3.controller.thirdsdk.huawei;

import com.alibaba.fastjson.JSON;
import org.apache.commons.codec.binary.Base64;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.conn.ssl.NoopHostnameVerifier;
import org.apache.http.conn.ssl.TrustStrategy;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.ssl.SSLContexts;
import org.apache.http.util.Asserts;
import org.apache.http.util.EntityUtils;
import org.apache.log4j.Logger;

import javax.net.ssl.SSLContext;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.Charset;
import java.security.*;
import java.security.cert.CertificateException;
import java.security.cert.X509Certificate;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.PKCS8EncodedKeySpec;
import java.util.*;

/**
 * 华为工具类
 */
public class HuaWeiUtils {
    private final  static Logger Log = Logger.getLogger(HuaWeiUtils.class);
    public static final int HTTP_RESPONSE_STATUS_CODE_OK = 200;

    public static String generateCPSign(Map<String,String> requestParams, final String cpAuthKey)
    {
        // 对消息体中查询字符串按字典序排序并且进行URLCode编码        |  Sort the request parameters in the message body based on the ASCII codes of their names and URL encode the parameter values.
        String baseStr = format(requestParams);
        // 用CP侧签名私钥对上述编码后的请求字符串进行签名      |  Sign the encoded request parameter string using the CP-side signature generation private key.
        String cpSign = sign(baseStr.getBytes(Charset.forName("UTF-8")), cpAuthKey);
        return cpSign;
    }
    /**
     * 根据参数Map构造排序好的参数串        | Construct a string of sorted parameters based on the parameter map.
     *
     * @param params
     * @return
     */
    public static String format(Map<String, String> params)
    {
        StringBuffer base = new StringBuffer();
        Map<String, String> tempMap = new TreeMap<String, String>(params);
        // 获取计算nsp_key的基础串        | Obtain the base string for calculating nsp_key.
        try
        {
            for (Map.Entry<String, String> entry : tempMap.entrySet())
            {
                String k = entry.getKey();
                String v = entry.getValue();
                base.append(k).append("=").append(URLEncoder.encode(v, "UTF-8")).append("&");
            }
        }
        catch (UnsupportedEncodingException e)
        {
            System.out.println("Encode parameters failed.");
            e.printStackTrace();
        }
        String body = base.toString().substring(0, base.toString().length() - 1);
        // 空格和星号转义      | Escape spaces and asterisks (*).
        body = body.replaceAll("\\+", "%20").replaceAll("\\*", "%2A");
        return body;
    }

    public static String sign(byte[] data, String privateKey)
    {
        try
        {
            byte[] e = org.apache.commons.codec.binary.Base64.decodeBase64(privateKey);
            PKCS8EncodedKeySpec pkcs8KeySpec = new PKCS8EncodedKeySpec(e);
            KeyFactory keyFactory = KeyFactory.getInstance("RSA");
            PrivateKey privateK = keyFactory.generatePrivate(pkcs8KeySpec);
            Signature signature = Signature.getInstance("SHA256WithRSA");
            signature.initSign(privateK);
            signature.update(data);
            String signs = Base64.encodeBase64String(signature.sign());
            return signs;

        }
        catch (Exception var)
        {
            System.out.println("SignUtil.sign error." + var);
            return "";
        }
    }

    public static Map<String,Object> doPost(String url, Map<String, String> paramaters)
    {
        HttpPost httpReq = new HttpPost(url);

        // 创建无需SSL验证的httpClient实例.  | Create an HttpClient instance without SSL authentication.
        CloseableHttpClient httpclient = null ;
        try {
            httpclient = getIgnoeSSLClient();
        } catch (Exception e1) {
            // TODO Auto-generated catch block
            e1.printStackTrace();
        }

        try
        {
            if (paramaters != null)
            {
                List<NameValuePair> paramPairs = new ArrayList<NameValuePair>();

                BasicNameValuePair bnv;

                for (Map.Entry<String, String> entry : paramaters.entrySet())
                {
                    bnv = new BasicNameValuePair(entry.getKey(), entry.getValue());
                    paramPairs.add(bnv);
                }

                httpReq.setEntity(new UrlEncodedFormEntity(paramPairs, "UTF-8"));

            }

            Map<String,Object> responseParamPairs = new HashMap<>();

            HttpResponse resp = httpclient.execute(httpReq);

            if(null != resp && HTTP_RESPONSE_STATUS_CODE_OK == resp.getStatusLine().getStatusCode())
            {
                responseParamPairs = JSON.parseObject(EntityUtils.toString(resp.getEntity()));
            }

            return responseParamPairs;
        }
        catch (Exception e)
        {
            e.printStackTrace();

            return null;
        }
        finally
        {
            try
            {
                httpclient.close();
            }
            catch (IOException e)
            {
                e.printStackTrace();
            }
        }
    }


    /**
     *     创建跳过SSL验证的httpClient实例，https://jos-api.cloud.huawei.com/gameservice/api/gbClientApi这个地址暂时没有添加SSL证书，所以需要跳过SSL验证
     *           *   Create an HttpClient instance without SSL authentication. The SSL certificate is currently not added for the address "https://jos-api.cloud.huawei.com/gameservice/api/gbClientApi", and therefore SSL authentication needs to be skipped.
     */
    public static CloseableHttpClient getIgnoeSSLClient() throws Exception {
        SSLContext sslContext = SSLContexts.custom().loadTrustMaterial(null, new TrustStrategy() {
            @Override
            public boolean isTrusted(X509Certificate[] x509Certificates, String s) throws CertificateException {
                return true;
            }
        }).build();
        //创建httpClient  |  Create an HttpClient.
        CloseableHttpClient client = HttpClients.custom().setSslcontext(sslContext).
                setSSLHostnameVerifier(new NoopHostnameVerifier()).build();
        return client;
    }


    public static String getString(String key,Map<String,Object> responseParamPairs)
    {
        Asserts.notNull(responseParamPairs, "responseParamPairs");
        Object value = responseParamPairs.get(key);
        if (value == null) {
            return null;
        }
        return value.toString();
    }


    public static String getSign(Map<String, Object> params, String privateKey) {

        StringBuffer content = new StringBuffer();
        // 按照key做排序
        List<String> keys = new ArrayList<String>(params.keySet());
        Collections.sort(keys);
        String value = null;
        Object object = null;
        for (int i = 0; i < keys.size(); i++) {
            String key = (String) keys.get(i);
            object = params.get(key);
            if (object instanceof String) {
                value = (String) object;
            } else {
                value = String.valueOf(object);
            }
            if (value != null) {
                content.append((i == 0 ? "" : "&") + key + "=" + value);
            } else {
                continue;
            }
        }
        //带签名的字符串
        String signOri = content.toString();
        return rsaSign(signOri,privateKey);
    }

    /**
     * 使用开发者联盟网站分配的支付私钥对支付信息进行签名
     * 强烈建议在商户服务端做签名处理，且私钥存储在服务端，防止信息泄露
     * CP通过服务器获取服务器端的签名之后，再进行支付请求
     * @param content
     * @return
     */
    public static String rsaSign(String content,String privateKey) {
        if (null == content) {
            return null;
        }
        //开发者联盟网站申请的支付私钥，请妥善保管，最好存储在服务器端
        // String privateKey = "xxxxxxxxxxx";
        //使用加密算法规则
        String SIGN_ALGORITHMS = "SHA256WithRSA";
        String charset = "UTF-8";
        try {
            //Base64请采用服务器端标准的Base64算法库。
            PKCS8EncodedKeySpec priPKCS8 = new PKCS8EncodedKeySpec(Base64.decodeBase64(privateKey));
            KeyFactory keyf = KeyFactory.getInstance("RSA");
            PrivateKey priKey = keyf.generatePrivate(priPKCS8);
            Signature signature = Signature.getInstance(SIGN_ALGORITHMS);
            signature.initSign(priKey);
            signature.update(content.getBytes(charset));
            byte[] signed = signature.sign();
            //Base64请采用服务器端标准的Base64算法库。
            return Base64.encodeBase64String(signed);
        } catch (NoSuchAlgorithmException e) {
            Log.error( "sign NoSuchAlgorithmException");
        } catch (InvalidKeySpecException e) {
            Log.error( "sign InvalidKeySpecException");
        } catch (InvalidKeyException e) {
            Log.error("sign InvalidKeyException");
        } catch (SignatureException e) {
            Log.error("sign SignatureException");
        } catch (UnsupportedEncodingException e) {
            Log.error("sign UnsupportedEncodingException");
        }
        return null;
    }

    public static String nullToEmpty(String value) {
        return value==null?"":value;
    }

}
