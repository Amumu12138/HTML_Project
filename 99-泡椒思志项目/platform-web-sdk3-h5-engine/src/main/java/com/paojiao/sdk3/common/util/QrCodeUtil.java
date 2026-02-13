package com.paojiao.sdk3.common.util;

import com.google.zxing.*;
import com.google.zxing.client.j2se.BufferedImageLuminanceSource;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.common.HybridBinarizer;
import com.google.zxing.qrcode.decoder.ErrorCorrectionLevel;
import org.apache.log4j.Logger;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Path;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

/**
 * 二维码工具
 * @author zhouzhenyi
 * @date 2018年11月28日
 */
public class QrCodeUtil {
	
    private final static Logger log = Logger.getLogger(QrCodeUtil.class);

	
	
	private static int WIDTH=300;
	private static int HEIGHT=300;
	private static String FORMAT="png";//二维码格式
	
	private static String ROOT_PATH = "/data/file/pay/qrcode/";
	
	
	/**
	 * 生成二维码并返回图片base64编码
	 * @param content
	 * @return
	 */
	public static String createQr2Base64(String content){
		try {
		     String fileName =  createQrCode(content);
		    String base64 =  getImageStr(fileName);
		    base64 = "data:image/png;base64,"+base64;
		    return base64;
		}catch (Exception e) { 
			log.error("二维码生成失败", e);
		}
		return null;
	}
	
	/**
	 * 生成二维码
	 * @param content 二维码内容
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public static String createQrCode(String content){
		//定义二维码参数
		Map hints=new HashMap();
		hints.put(EncodeHintType.CHARACTER_SET, "utf-8");//设置编码
		hints.put(EncodeHintType.ERROR_CORRECTION, ErrorCorrectionLevel.M);//设置容错等级
		hints.put(EncodeHintType.MARGIN, 2);//设置边距默认是5
		
		try {
			BitMatrix bitMatrix=new MultiFormatWriter().encode(content, BarcodeFormat.QR_CODE, WIDTH, HEIGHT, hints);
			File file  = new File(ROOT_PATH);
			if(!file.exists()) {
				file.mkdirs();
			}
			String fileName = ROOT_PATH + UUID.randomUUID().toString()+"."+FORMAT; 
			Path path = new File(fileName).toPath();
			MatrixToImageWriter.writeToPath(bitMatrix, FORMAT, path);//写到指定路径下
			return fileName;
		} catch (Exception e) {
			log.error("二维码生成失败", e);
		}
		
		return null;
	}

	/**
	 * 图片转二维码
	 * @param imgFile
	 * @return
	 */
	public static String getImageStr(String imgFile) {
	    InputStream inputStream = null;
	    byte[] data = null;
	    try {
	        inputStream = new FileInputStream(imgFile);
	        data = new byte[inputStream.available()];
	        inputStream.read(data);
	        inputStream.close();
	    } catch (IOException e) {
	    	log.error("二维码生成失败", e);
	    }
	    // 编码
	    return org.apache.commons.codec.binary.Base64.encodeBase64String(data);
	}

	
	//读取二维码
	public static void readZxingQrCode(String path){
		MultiFormatReader reader = new MultiFormatReader();
		File file = new File(path);
		try {
			BufferedImage image = ImageIO.read(file);
			BinaryBitmap binaryBitmap=new BinaryBitmap(new HybridBinarizer(new BufferedImageLuminanceSource(image)));
			Map hints=new HashMap();
			hints.put(EncodeHintType.CHARACTER_SET, "utf-8");//设置编码
			Result result= reader.decode(binaryBitmap,hints);
			System.out.println("解析结果:"+result.toString());
			System.out.println("二维码格式:"+result.getBarcodeFormat());
			System.out.println("二维码文本内容:"+result.getText());
		} catch (Exception e) {
			log.error("二维码读取失败", e);
		}
	}
	
	
	
	public static void main(String[] args) {
         String base64 = QrCodeUtil.createQr2Base64("weixin://wxpay/bizpayurl?pr=g0685zi");
         System.out.println(base64);
		
		
	}
	

}
