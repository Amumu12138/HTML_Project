package com.paojiao.sdk3.controller.thirdsdk.yinlian;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.HttpStatus;
import org.apache.commons.httpclient.NameValuePair;
import org.apache.commons.httpclient.methods.PostMethod;

import com.alibaba.fastjson.JSON;

import sun.misc.BASE64Decoder;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.security.*;
import java.security.interfaces.RSAPublicKey;

import java.security.spec.InvalidKeySpecException;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;
import java.util.Map;
import java.util.Set;

/**
 * Created by Chouchou on 2018/4/13.
 */
public class RSAEncrypt {

    /**
     * 私钥
     */
    private PrivateKey privateKey;

    /**
     * 公钥
     */
    private RSAPublicKey publicKey;

    /**
     * 签名算法
     */
    private static final String SIGN_ALGORITHMS  = "SHA1withRSA";

    /**
     * 获取私钥
     *
     * @return 当前的私钥对象
     */
    public PrivateKey getPrivateKey() {
        return privateKey;
    }

    /**
     * 获取公钥
     *
     * @return 当前的公钥对象
     */
    public RSAPublicKey getPublicKey() {
        return publicKey;
    }

    /**
     * 从文件中输入流中加载公钥
     *
     * @param pubURL 文件路径
     * @throws Exception 加载公钥时产生的异常
     */
    public void readPublicKey(String pubURL) throws Exception {
        try {
            BufferedReader br = new BufferedReader(new FileReader(pubURL));
            String readLine = null;
            StringBuilder sb = new StringBuilder();
            while ((readLine = br.readLine()) != null) {
                if (readLine.charAt(0) == '-') {
                    continue;
                } else {
                    sb.append(readLine);
                    sb.append('\r');
                }
            }
            loadPublicKey(sb.toString());
        } catch (IOException e) {
            throw new Exception("公钥数据流读取错误");
        } catch (NullPointerException e) {
            throw new Exception("公钥输入流为空");
        }
    }

    /**
     * 从字符串中加载公钥
     *
     * @param publicKeyStr 公钥数据字符串
     * @throws Exception 加载公钥时产生的异常
     */
    public void loadPublicKey(String publicKeyStr) throws Exception {
        try {
            BASE64Decoder base64Decoder = new BASE64Decoder();
            byte[] buffer = base64Decoder.decodeBuffer(publicKeyStr);
            KeyFactory keyFactory = KeyFactory.getInstance("RSA");
            X509EncodedKeySpec keySpec = new X509EncodedKeySpec(buffer);
            this.publicKey = (RSAPublicKey) keyFactory.generatePublic(keySpec);
        } catch (NoSuchAlgorithmException e) {
            throw new Exception("无此算法");
        } catch (InvalidKeySpecException e) {
            throw new Exception("公钥非法");
        } catch (IOException e) {
            throw new Exception("公钥数据内容读取错误");
        } catch (NullPointerException e) {
            throw new Exception("公钥数据为空");
        }
    }

    /**
     * 从文件中加载私钥
     *
     * @param pubURL 私钥文件名
     * @return 是否成功
     * @throws Exception
     */
    public void readPrivateKey(String pubURL) throws Exception {
        try {
            BufferedReader br = new BufferedReader(new FileReader(pubURL));
            String readLine = null;
            StringBuilder sb = new StringBuilder();
            while ((readLine = br.readLine()) != null) {
                if (readLine.charAt(0) == '-') {
                    continue;
                } else {
                    sb.append(readLine);
                    sb.append('\r');
                }
            }
            System.out.println(sb.toString());
            loadPrivateKey(sb.toString());
        } catch (IOException e) {
            throw new Exception("私钥数据读取错误");
        } catch (NullPointerException e) {
            throw new Exception("私钥输入流为空");
        }
    }


    public void loadPrivateKey(String privateKeyStr) throws Exception {
        try {
            byte[] e = Base64.decodeBase64(privateKeyStr);
            PKCS8EncodedKeySpec priPKCS8 = new PKCS8EncodedKeySpec(e);
//            RSAPrivateKeyStructure asn1PrivKey = new RSAPrivateKeyStructure((ASN1Sequence) ASN1Sequence.fromByteArray(e));
//            RSAPrivateKeySpec rsaPrivKeySpec = new RSAPrivateKeySpec(asn1PrivKey.getModulus(), asn1PrivKey.getPrivateExponent());
            KeyFactory keyFactory = KeyFactory.getInstance("RSA");
            this.privateKey = keyFactory.generatePrivate(priPKCS8);
        } catch (NoSuchAlgorithmException e) {
            throw new Exception("无此算法");
        } catch (InvalidKeySpecException e) {
            throw new Exception("私钥非法");
        } catch (NullPointerException e) {
            throw new Exception("私钥数据为空");
        }
    }

    /**
     * RSA签名
     *
     * @param content
     *            待签名数据
     * @param priKey
     *            商户私钥
     * @param encode
     *            字符集编码
     * @return 签名值
     */
    public static String  sign(String content, PrivateKey priKey, String encode) {
        try {
            Signature signature = Signature.getInstance(SIGN_ALGORITHMS);
            signature.initSign(priKey);
            signature.update(content.getBytes(encode));
            byte[] signed = signature.sign();
            return new String(Base64.encodeBase64(signed));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    /**
     * RSA验签名检查
     *
     * @param content
     *            待签名数据
     * @param sign
     *            签名值
     * @param pubKey
     *            分配给开发商公钥
     * @param encode
     *            字符集编码
     * @return 布尔值
     */
    public static boolean doCheck(String content, String sign, RSAPublicKey pubKey, String encode) {
        try {
            java.security.Signature signature = java.security.Signature.getInstance(SIGN_ALGORITHMS);
            signature.initVerify(pubKey);
            signature.update(content.getBytes(encode));
            boolean bverify = signature.verify(Base64.decodeBase64(sign));
            return bverify;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }
    public static void main(String[] args) throws Exception {
        RSAEncrypt rsaEncrypt = new RSAEncrypt();
        rsaEncrypt.loadPrivateKey("MIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBALtTk5djlmU/PcBB" +
                "Ny/TfVsxDgNuon1jNVyi8+MzcLf+X12a0NPaF21RkanW7VS8eIjwKldvQ0Gx33V2" +
                "prvG5MJzs3E9CED5PotNBWK7TmsAhsjp64LeBX2ex/ZCLdquTkw/7fZUVr2ZMY9W" +
                "d46jv6RyJb/O1WW3VWe5qa1VWSt5AgMBAAECgYATtgehtmjs3mqxACu+bJKUNeUz" +
                "l0Ch0P6ccMkY7yC9O5btUo0GvbwZVKvvIx51/B7yydKqwJpjH0RUJ9gDijonzbwy" +
                "OGqyrr6JK8QV1y5UIKoS3TzuMiGu96GSYhraBTYQQjxrhT/0JB9D/+3rm6Wc6jUY" +
                "sCtS7AGAQJk37jX4AQJBAOeumM0zdL8VXQnaO1xojjsIsh2/zenXUEWXk2GtifFo" +
                "iYWwAzm+uypV1e34PzdVC80NhcsF619lHMO3z7UlsykCQQDO/SAiuthZmI2COyGb" +
                "U+uodHRfe3fPW98xX4gpEWMmBtHc0L4txM1rKwOvG7B6oFRYZe3KpADm664TSqTs" +
                "To/RAkEA5JBkYPTltWoPGpw4uebQgr8GccD7FTp9D9sE5HV/RDF8ku5dkEdxgMej" +
                "wRyKyTzW4pn3p56UYc1v/kpF2RFzWQJBALHpupR/e3TPflqBDure4EEED/7+NkYi" +
                "lp5uma+LBWjrFbmyJrVaYqKJ73m02CUe6ECvJAw4mZni29YzI70F7fECQG49VPbT" +
                "lW4XsaxpnkX8T5/BfAYyWNloiaaP5wVzDJLWJPGqz9oitsyD4LNPBfYF6lhFLxMW" +
                "RMfgoBcVAXDdMTg=");

        String sign = sign("39204360fb7f2eaa3685be"+"&2020-04-24 19:55:18", rsaEncrypt.getPrivateKey(), "utf-8");
        System.out.println(sign);


        // "token":"4f369769b300f4cb5fdc3f68af1507add7efac486ca075060e51ceae8bba23c7",
        // "uid":"39204360fb7f2eaa3685be",
        // "time":"2020-04-24 19:55:18",
        // "sign":"46ffbd1081bc14e80273f0431efad7862c7dcd57311feedf2f788247de8ede088e21eb3535fcae6afa5da02ab4d5baee"}
    }


    public static String jsonPost(String strURL, Map<String, String> params) {
        try {
            URL url = new URL(strURL);// 创建连接
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setDoOutput(true);
            connection.setDoInput(true);
            connection.setUseCaches(false);
            connection.setInstanceFollowRedirects(true);
            connection.setRequestMethod("POST"); // 设置请求方式
            connection.setRequestProperty("Accept", "application/json"); // 设置接收数据的格式
            connection.setRequestProperty("Content-Type", "application/json"); // 设置发送数据的格式
            connection.connect();
            OutputStreamWriter out = new OutputStreamWriter(connection.getOutputStream(), "UTF-8"); // utf-8编码
            out.append(JSON.toJSONString(params));
            out.flush();
            out.close();
            int code = connection.getResponseCode();
            InputStream is = null;
            if (code == 200) {
                is = connection.getInputStream();
            } else {
                is = connection.getErrorStream();
            }

            // 读取响应
            int length = (int) connection.getContentLength();// 获取长度
            if (length != -1) {
                byte[] data = new byte[length];
                byte[] temp = new byte[512];
                int readLen = 0;
                int destPos = 0;
                while ((readLen = is.read(temp)) > 0) {
                    System.arraycopy(temp, 0, data, destPos, readLen);
                    destPos += readLen;
                }
                String result = new String(data, "UTF-8"); // utf-8编码
                return result;
            }

        } catch (IOException e) {
            //LOG.error("Exception occur when send http post request!", e);
        }
        return "error"; // 自定义错误信息
    }

    /**
     * 发送HttpPost请求
     *
     * @param url    服务地址
     * @param params
     * @return 成功:返回json字符串<br/>
     */
    public static String doPost(String url, Map<String, String> params) {
        StringBuffer response = new StringBuffer();
        HttpClient client = new HttpClient();
        PostMethod method = new PostMethod(url);
        // 设置Http Post数据
        method.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
        if (params != null) {
            Set<String> keySet = params.keySet();
            NameValuePair[] param = new NameValuePair[keySet.size()];
            int i = 0;
            for (String key : keySet) {
                param[i] = new NameValuePair(key, params.get(key));
                i++;
            }
            method.setRequestBody(param);
        }
        InputStream responseBodyStream = null;
        InputStreamReader streamReader = null;
        BufferedReader reader = null;
        try {
            client.executeMethod(method);
            if (method.getStatusCode() == HttpStatus.SC_OK) {
                responseBodyStream = method.getResponseBodyAsStream();
                streamReader = new InputStreamReader(responseBodyStream, "utf-8");
                reader = new BufferedReader(streamReader);
                String line;
                while ((line = reader.readLine()) != null) {
                    response.append(line);
                }
            }
        } catch (IOException e) {
            System.out.println("执行HTTP Post请求" + url + "时，发生异常！");
        } finally {
            try {
                responseBodyStream.close();
                streamReader.close();
                reader.close();
            } catch (IOException e) {
                System.out.println("执行HTTP Post请求" + url + "时，发生异常,关闭流异常！");
                e.printStackTrace();
            }
            method.releaseConnection();
        }
        return response.toString();
    }
}
