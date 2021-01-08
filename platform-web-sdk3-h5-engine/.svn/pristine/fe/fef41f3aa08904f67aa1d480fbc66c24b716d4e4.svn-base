package com.paojiao.sdk3.common.util;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.apache.commons.beanutils.Converter;

public class DateConvert implements Converter {

	public Object convert(Class arg0, Object arg1) {
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String p = null;
		if (arg1 instanceof Date) {
			return arg1;
		} else
			p = (String) arg1;
		if (p == null || p.trim().length() == 0) {
			return null;
		}
		try {
			return df.parse(p.trim());
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}

	}

}