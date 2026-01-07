package com.infox.h5.utils;

import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;

public class ParamsUtils {
	
	public static Map<String, Object> getParams(Map<String, String[]> paraMap) {
		Map<String,Object> map = new HashMap<String,Object>();
		for(Entry<String, String[]> entry : paraMap.entrySet()) {
			try {
				map.put(entry.getKey(), entry.getValue()[0]);
			}catch(Exception e) {
				map.put(entry.getKey(), "");
			}
		}
		return map;
	}
}
