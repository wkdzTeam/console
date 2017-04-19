package com.tv.controller;

import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tv.entity.ActChargeLog;
import com.tv.service.interf.ActChargeLogService;
import com.tv.service.interf.ActDeviceService;
import com.tv.util.common.FrameUtil;

@Controller
@RequestMapping("/charge")
public class ActChargeLogController 
{
	private static final Logger LOGGER = LoggerFactory.getLogger(ActChargeLogController.class);
	@Resource
	private ActChargeLogService chargeLogService;
	@RequiresPermissions("device:view")
	@RequestMapping(value="getAllChargeLogs" , produces = {"application/json", "application/xml" })
	@ResponseBody
	public Map<String,Object> getAllChargeLogs(HttpServletRequest request)
	{
		try 
		{
			return FrameUtil.HttpSuccessResult("");
		} 
		catch (Exception e) 
		{
			LOGGER.error("============={}",e);
			return FrameUtil.HttpSYstemErrorResult("");
		}
		
	}
	
	@RequiresPermissions("device:insert")
	@RequestMapping(value="addChargeLog" , produces = {"application/json", "application/xml" })
	@ResponseBody
	public Map<String,Object> addChargeLog(HttpServletRequest request,HttpEntity<ActChargeLog> entity)
	{
		try 
		{
			return FrameUtil.HttpSuccessResult("");
		} 
		catch (Exception e) 
		{
			LOGGER.error("============={}",e);
			return FrameUtil.HttpSYstemErrorResult("");
		}
		
	}
	
}
