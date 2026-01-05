package com.paojiao.sdk3.common.util;

import com.jfinal.kit.StrKit;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;

public class HttpServletUtil {

    public static  Map<String, Object> getParamMap(HttpServletRequest request) {
        Map<String, Object> paramMap = new HashMap<String, Object>();
        Map<String, String[]> requestMap = request.getParameterMap();
        Iterator<Entry<String, String[]>> it = requestMap.entrySet().iterator();
        while (it.hasNext()) {
            Entry<String, String[]> entry = it.next();
            if(entry.getValue().length==1){
                paramMap.put(entry.getKey(), entry.getValue()[0]);
            } else {
                String[] values = entry.getValue();
                String value = "";
                for(int i=0; i<values.length; i++){
                    value = values[i] + ",";
                }
                value = value.substring(0, value.length()-1);
                paramMap.put(entry.getKey(), value);
            }
        }
        return paramMap;
    }

}
