package com.paojiao.sdk3.common.util;

import java.util.ArrayList;
import java.util.List;

/**
 * 分页
 * @author zhouzhenyi
 * @date 2016年11月22日
 * @param <T>
 * @param <record>
 */
public class PageModel<T> {
	
	/**数据源*/ 
	private List<T> records;
	
	/**偏移量*/
	private  int offset;
	
	/**页面大小*/
	private int limit;
	
	/**总页数*/
	public int getTotalPage() {
		return (records.size() + limit - 1)/limit;
	}
    
	/**记录总数*/
	public int getTotal() {
		return this.records.size();
	}
	
	public PageModel(List<T> records, int offset, int limit) {
		super();
		this.records = records;
		this.offset = offset;
		this.limit = limit;
	}

	/**分页结果*/ 
	public List<T> getResult() {  
		List<T> newRecord = new ArrayList<T>();
		  for (int i = this.offset; i < this.offset+this.limit; i++) {
			 T  record;
			 try{
			  record =this.records.get(i);
			 }catch(Exception ex){
				 record = null;
				//数组越界
			 }
			 if(null != record){
				 newRecord.add(record);
			 }
		}
		return newRecord;
	}
}
