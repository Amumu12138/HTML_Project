package com.paojiao.sdk3.common.mongo;

import com.paojiao.sdk3.common.PjConstants;

import java.util.List;

/**
 * Mongo数据集对象
 *
 * @author Van
 *
 */
public class MongoCollection {

	private com.pjmongodb.DBCollection collection;

	public MongoCollection(String collectionName,String host) {

		MongoDbFactory factory = new MongoDbFactory();
		if(host.equals(PjConstants.HOST_LOGIN_SESSION)){
			collection = factory.getMongoDB(PjConstants.HOST_LOGIN_SESSION).getCollection(collectionName);
		}else if(host.equals(PjConstants.HOST_LOGIN_SESSION)){
			collection = factory.getMongoDB(PjConstants.HOST_LOGIN_SESSION).getCollection(collectionName);
		}

	}


	/**
	 * 读取库
	 *
	 * @return
	 */
	public com.pjmongodb.DBCollection getCollection() {
			return collection;
	}
	/**
	 * 移除
	 *
	 * @param o
	 */
	public void remove(com.pjmongodb.BasicDBObject o) {
		collection.remove(o);
	}

	/**
	 * 移除
	 *
	 * @param o
	 */
	public void remove(com.pjmongodb.DBObject o) {
		collection.remove(o);
	}

	/**
	 * 查找一条数据，通过随机负载去分配
	 *
	 * @param o
	 * @return
	 */
	public com.pjmongodb.DBObject findOne(com.pjmongodb.BasicDBObject o) {
		return collection.findOne(o);
	}
	public com.pjmongodb.DBObject findOne(com.pjmongodb.DBObject o) {
		return collection.findOne(o);
	}


	public com.pjmongodb.DBObject findOne(com.pjmongodb.DBObject query,com.pjmongodb.DBObject sort) {
		return collection.findOne(query, null, sort);
	}

	/**
	 * 查找所有数据
	 * @return
	 */
	public com.pjmongodb.DBCursor findAll() {
		return collection.find();
	}


	/**
	 * 保存数据
	 *
	 * @param o
	 */
	public void save(com.pjmongodb.DBObject o) {
		collection.save(o);
	}

	/**
	 * 更新数据
	 *
	 * @param q
	 * @param o
	 */
	public void update(com.pjmongodb.DBObject q, com.pjmongodb.DBObject o) {
		collection.update(q, o);
	}

	/**
	 * 查找数据
	 *
	 * @param query
	 * @return
	 */
	public com.pjmongodb.DBCursor find(com.pjmongodb.BasicDBObject query) {
		return collection.find(query);
	}

	/**
	 * 查找数据
	 *
	 * @param query
	 * @return
	 */
	public com.pjmongodb.DBCursor find(com.pjmongodb.DBObject query) {
		return collection.find(query);
	}

	/**
	 * 插入数据
	 *
	 * @param o
	 */
	public void insert(com.pjmongodb.DBObject o) {
		collection.insert(o);
	}

	/**
	 * 批量插入
	 * @param list
	 */
	public  void batchSave(List<com.pjmongodb.DBObject> list){
		collection.insert(list);
	}


}
