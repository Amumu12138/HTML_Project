package com.paojiao.sdk3.common.mongo;

import java.util.List;

import com.mongodb.BasicDBObject;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import com.paojiao.sdk3.common.PjConstants;

/**
 * Mongo数据集对象
 *
 * @author Van
 *
 */
public class MongoCollection {

	private DBCollection collection;

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
	public DBCollection getCollection() {
			return collection;
	}
	/**
	 * 移除
	 *
	 * @param o
	 */
	public void remove(BasicDBObject o) {
		collection.remove(o);
	}

	/**
	 * 移除
	 *
	 * @param o
	 */
	public void remove(DBObject o) {
		collection.remove(o);
	}

	/**
	 * 查找一条数据，通过随机负载去分配
	 *
	 * @param o
	 * @return
	 */
	public DBObject findOne(BasicDBObject o) {
		return collection.findOne(o);
	}
	public DBObject findOne(DBObject o) {
		return collection.findOne(o);
	}


	public DBObject findOne(DBObject query,DBObject sort) {
		return collection.findOne(query, null, sort);
	}

	/**
	 * 查找所有数据
	 * @return
	 */
	public DBCursor findAll() {
		return collection.find();
	}


	/**
	 * 保存数据
	 *
	 * @param o
	 */
	public void save(DBObject o) {
		collection.save(o);
	}

	/**
	 * 更新数据
	 *
	 * @param q
	 * @param o
	 */
	public void update(DBObject q, DBObject o) {
		collection.update(q, o);
	}

	/**
	 * 查找数据
	 *
	 * @param query
	 * @return
	 */
	public DBCursor find(BasicDBObject query) {
		return collection.find(query);
	}

	/**
	 * 查找数据
	 *
	 * @param query
	 * @return
	 */
	public DBCursor find(DBObject query) {
		return collection.find(query);
	}

	/**
	 * 插入数据
	 *
	 * @param o
	 */
	public void insert(DBObject o) {
		collection.insert(o);
	}

	/**
	 * 批量插入
	 * @param list
	 */
	public  void batchSave(List<DBObject> list){
		collection.insert(list);
	}


}
