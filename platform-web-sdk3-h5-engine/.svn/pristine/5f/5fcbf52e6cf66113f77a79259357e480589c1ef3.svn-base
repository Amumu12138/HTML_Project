package com.paojiao.sdk3.common.conf;

import javax.sql.DataSource;

import com.jfinal.kit.Prop;
import com.jfinal.kit.PropKit;
import com.jfinal.plugin.c3p0.C3p0Plugin;

public class GeneratorModel {
	public static Prop prop = PropKit.use("config.properties");

	/**
	 * 
	 * @param mappingKitClassName
	 * @param includeTables
	 *            包含映射表
	 * @param baseModelPkg
	 *            基类包名
	 * @param baseModelDir
	 *            基类包目录
	 * @param modelPkg
	 *            model包名
	 * @param dbSource 数据源
	 */
	public static void generatorModel(String mappingKitClassName,
			String[] includeTables, String baseModelPkg, String baseModelDir,
			String modelPkg, String dbSource) {
		// model 文件保存路径
		String modelDir = baseModelDir + "/..";
		MyGenerator gernerator = new MyGenerator(getDataSource(dbSource),
				baseModelPkg, baseModelDir, modelPkg, modelDir);
		gernerator.setMappingKitClassName(mappingKitClassName);
		gernerator.addIncludedTable(includeTables);
		gernerator.generate();
	}

	public static DataSource getDataSource(String dbSource) {
		C3p0Plugin c3p0Plugin = new C3p0Plugin(
				PropKit.get("jdbcUrl" + dbSource), PropKit.get("user"
						+ dbSource), PropKit.get("password" + dbSource));

		c3p0Plugin.start();
		return c3p0Plugin.getDataSource();
	}
}
