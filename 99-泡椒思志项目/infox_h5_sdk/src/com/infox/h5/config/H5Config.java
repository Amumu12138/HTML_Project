package com.infox.h5.config;

import com.infox.h5.action.ApiAction;
import com.infox.h5.action.IosAction;
import com.jfinal.config.Constants;
import com.jfinal.config.Handlers;
import com.jfinal.config.Interceptors;
import com.jfinal.config.JFinalConfig;
import com.jfinal.config.Plugins;
import com.jfinal.config.Routes;
import com.jfinal.plugin.activerecord.ActiveRecordPlugin;
import com.jfinal.plugin.c3p0.C3p0Plugin;
import com.jfinal.render.ViewType;


public class H5Config extends JFinalConfig{

	@Override
	public void configConstant(Constants me) {
		me.setDevMode(true);
		me.setViewType(ViewType.JSP);
		me.setEncoding("utf-8");
	}

	@Override
	public void configRoute(Routes me) {
		me.add("/api",ApiAction.class);
		me.add("/ios",IosAction.class);
	}

	@Override
	public void configPlugin(Plugins me) {
		super.loadPropertyFile("jdbc.properties");	
		C3p0Plugin c3p0Plugin3 = new C3p0Plugin(getProperty("ds.h5.jdbcUrl"), 
				getProperty("ds.h5.username"), getProperty("ds.h5.password"));
		me.add(c3p0Plugin3);
		ActiveRecordPlugin arp3 = new ActiveRecordPlugin("sdk",c3p0Plugin3);
		me.add(arp3);

		C3p0Plugin c3p0UcCenter = new C3p0Plugin(getProperty("ds.uc_center.jdbcUrl"),
				getProperty("ds.uc_center.username"), getProperty("ds.uc_center.password"));
		me.add(c3p0UcCenter);
		ActiveRecordPlugin ucCenter = new ActiveRecordPlugin("uc_center",c3p0UcCenter);
		me.add(ucCenter);
	}

	@Override
	public void configInterceptor(Interceptors me) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void configHandler(Handlers me) {
		// TODO Auto-generated method stub
		
	}
	
	/**
	 * JFinal启动后调用
	 */
	@Override
	public void afterJFinalStart() {
		
	}

}
