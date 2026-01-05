package com.paojiao.sdk3.model.pojo;

import java.io.Serializable;

import org.bson.types.ObjectId;

/**
 * 基础实体。
 * @author Van
 *
 */
public class BaseEntity implements Serializable {
	protected static final long serialVersionUID = 1L;
	
	protected Integer id;
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	
	protected ObjectId _id;

	public ObjectId get_id() {
		return _id;
	}
	public void set_id(ObjectId _id) {
		this._id = _id;
	}
	
	

}
