package com.tv.controller;

import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tv.service.interf.ActRoleService;
import com.tv.util.common.FrameUtil;

@Controller
@RequestMapping("/role")
public class ActRoleController 
{
	private static final Logger LOGGER = LoggerFactory.getLogger(ActRoleController.class);
	@Resource
	private ActRoleService roleService;
	@RequiresPermissions("role:view")
	@RequestMapping(value="getAllRoles" , produces = {"application/json", "application/xml" })
	@ResponseBody
	public Map<String,Object> getAllRoles(HttpServletRequest request)
	{
		try 
		{
			return FrameUtil.HttpSuccessResult(roleService.findAllRole());
		} 
		catch (Exception e) 
		{
			LOGGER.error("============={}",e);
			return FrameUtil.HttpSYstemErrorResult("");
		}
		
	}
}
