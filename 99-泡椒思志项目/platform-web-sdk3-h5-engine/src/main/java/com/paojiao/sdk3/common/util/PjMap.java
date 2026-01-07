package com.paojiao.sdk3.common.util;

import java.util.HashMap;

import com.paojiao.sdk3.exceptions.ConvertException;

public class PjMap<K, V> extends HashMap<K, V> {

	/**
	 * 
	 */
	private static final long serialVersionUID = -3966565937149079411L;

	private Integer toInt(String value, Integer defaultValue) {
		try {
			if (value == null || "".equals(value.trim()))
				return defaultValue;
			value = value.trim();
			if (value.startsWith("N") || value.startsWith("n"))
				return -Integer.parseInt(value.substring(1));
			return Integer.parseInt(value);
		} catch (Exception e) {
			throw new ConvertException(101, "Can not parse the parameter \""
					+ value + "\" to Integer value.");
		}
	}

	public Integer getToInt(String name) {
		return toInt((String) get(name), null);
	}
}
