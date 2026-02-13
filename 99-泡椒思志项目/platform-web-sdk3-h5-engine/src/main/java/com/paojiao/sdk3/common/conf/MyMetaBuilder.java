package com.paojiao.sdk3.common.conf;

import java.util.Set;
import java.util.TreeSet;

import javax.sql.DataSource;

import com.jfinal.plugin.activerecord.generator.MetaBuilder;

public class MyMetaBuilder extends MetaBuilder {
	protected Set<String> includedTables = new TreeSet<String>(
			String.CASE_INSENSITIVE_ORDER);

	public MyMetaBuilder(DataSource dataSource) {
		super(dataSource);
	}

	public void addIncludedTable(String[] includedTables2) {
		for (String table : includedTables2) {
			this.includedTables.add(table);
		}
	}

	protected boolean isSkipTable(String tableName) {
		// System.out.println("tableName:" + tableName + ",excludedTables size:"
		// + excludedTables.size() + ",includedTables size:"
		// + includedTables.size() + ","
		// + includedTables.contains(tableName));
		boolean result = true;
		if (excludedTables.size() > 0)
			result = false;
		if (includedTables.size() > 0 && includedTables.contains(tableName)) {
			result = false;
		}
		return result;
	}
}
