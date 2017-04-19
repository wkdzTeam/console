package com.console.manage;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class StartCompentConfListener implements ServletContextListener {
	private static final Logger LOGGER = LoggerFactory.getLogger(StartCompentConfListener.class);

	public void contextInitialized(ServletContextEvent sce) {
		LOGGER.info("====================servlet container start successfully......");
		
		
	}

	public void contextDestroyed(ServletContextEvent sce) {
		LOGGER.info("====================servlet container is ended");
	}

//	@Override
//	public void contextDestroyed(ServletContextEvent arg0) {
//		LOGGER.info("====================servlet container is ended");
//	}
//
//	@Override
//	public void contextInitialized(ServletContextEvent arg0) {
//		LOGGER.info("====================servlet container start successfully......");
//	}

}
