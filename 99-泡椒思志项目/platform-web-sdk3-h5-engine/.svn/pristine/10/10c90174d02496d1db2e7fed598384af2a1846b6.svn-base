package com.paojiao.sdk3.common.conf;

import java.util.List;

import javax.sql.DataSource;

import com.jfinal.plugin.activerecord.generator.Generator;
import com.jfinal.plugin.activerecord.generator.TableMeta;

public class MyGenerator extends Generator {
	protected MyMetaBuilder metaBuilder;

	public MyGenerator(DataSource dataSource, String baseModelPackageName,
			String baseModelOutputDir, String modelPackageName,
			String modelOutputDir) {
		super(dataSource, baseModelPackageName, baseModelOutputDir,
				modelPackageName, modelOutputDir);
		this.metaBuilder = new MyMetaBuilder(dataSource);
	}

	/**
	 * 添加要处理的数据表
	 */
	public void addIncludedTable(String... includedTables) {
		System.out.println("addIncludedTable:" + includedTables.length);
		metaBuilder.addIncludedTable(includedTables);
	}

	/**
	 * 设置 MappingKit文件名 mappingKitClassName
	 */
	public void setMappingKitClassName(String mappingKitClassName) {
		if (this.mappingKitGenerator != null) {
			this.mappingKitGenerator
					.setMappingKitClassName(mappingKitClassName);
		}
	}

	public void generate() {
		long start = System.currentTimeMillis();
		List<TableMeta> tableMetas = metaBuilder.build();
		for (TableMeta table : tableMetas) {
			System.out.println("baseModelName:" + table.baseModelName
					+ ",name:" + table.name);
		}
		if (tableMetas.size() == 0) {
			System.out.println("TableMeta 数量为 0，不生成任何文件");
			return;
		}

		baseModelGenerator.generate(tableMetas);

		if (modelGenerator != null) {
			modelGenerator.generate(tableMetas);
		}

		if (mappingKitGenerator != null) {
			mappingKitGenerator.generate(tableMetas);
		}

		if (dataDictionaryGenerator != null && generateDataDictionary) {
			dataDictionaryGenerator.generate(tableMetas);
		}

		long usedTime = (System.currentTimeMillis() - start) / 1000;
		System.out.println("Generate complete in " + usedTime + " seconds.");
	}
}
