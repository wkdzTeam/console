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

import com.tv.entity.ActDevice;
import com.tv.service.interf.ActDeviceService;
import com.tv.service.interf.ActRoleService;
import com.tv.util.common.FrameUtil;

@Controller
@RequestMapping("/device")
public class ActDeviceController 
{
	private static final Logger LOGGER = LoggerFactory.getLogger(ActDeviceController.class);
	@Resource
	private ActDeviceService deviceService;
	@RequiresPermissions("device:view")
	@RequestMapping(value="getAllDevices" , produces = {"application/json", "application/xml" })
	@ResponseBody
	public Map<String,Object> getAllDevices(HttpServletRequest request)
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
	@RequestMapping(value="addDevice" , produces = {"application/json", "application/xml" })
	@ResponseBody
	public Map<String,Object> addDevice(HttpServletRequest request,HttpEntity<ActDevice>entity)
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
