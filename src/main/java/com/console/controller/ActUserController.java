package com.console.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.io.IOUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.apache.shiro.subject.Subject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.console.entity.ActUser;
import com.console.model.ActiveUser;
import com.console.model.Constants;
import com.console.model.ResultCode;
import com.console.service.interf.ActUserService;
import com.console.util.FrameReflectUtil;
import com.console.util.FrameUtil;

@Controller
@RequestMapping("/user")
public class ActUserController 
{
	private static final Logger LOGGER = LoggerFactory.getLogger(ActUserController.class);
	@Resource
	private ActUserService userService;
	@RequestMapping(value="login" , produces = {"application/json", "application/xml" })
	@ResponseBody
	public Map<String,Object> login(HttpServletRequest request)
	{
		
//		try
//		{
//			JSONObject json = JSON.parseObject(IOUtils.toString(request.getInputStream()));
//			int  = json.getIntValue("userFlag");
//			int userId = DefCookieUtil.getUserInCookie().getId();
//			return FrameUtil.HttpSuccessResult("");	
//		}
//		catch(Exception e)
//		{
//			LOGGER.error("======================exception{}",e);
//			return FrameUtil.HttpErrorResult("", ResultCode.ACCOUNT_ERROR, e.getMessage());
//		}
		LOGGER.info("===============login successfully==========");
		return FrameUtil.HttpSuccessResult("");
	}
	
	@RequestMapping(value="isLogin",  produces = {"application/json", "application/xml" })
	@ResponseBody
	public Map<String,Object> isLogin(HttpServletRequest request) throws Exception
	{
		Map<String, Object> map = new HashMap<>();
		Subject subject = SecurityUtils.getSubject();
		ActiveUser user =  (ActiveUser) subject.getPrincipal();
		if(user == null){
			map.put("code", ResultCode.SYS_ERROR);
			map.put("msg", ResultCode.ERROR_NOT_LOGIN_MSG);
			return map;
		}else{
			map.put("code", ResultCode.SUCCESS);
			map.put("userName", user.getUserName());
			return map;
		}
	}
	
	@RequiresPermissions("auth:logout")
	@RequestMapping(value="loginOut" , produces = {"application/json", "application/xml" })
	@ResponseBody
	public Map<String,Object> loginOut(HttpServletRequest request)
	{
		
		Map<String,Object> map = new HashMap<String,Object>();
		Subject subject = SecurityUtils.getSubject();
		map.put("code", ResultCode.SUCCESS);
		map.put("msg", ResultCode.SUCCESS_MSG);
		subject.logout();
		return map;
	}
	
	
	@RequiresPermissions("user:view")
	@RequestMapping(value="getUsers" , produces = {"application/json", "application/xml" })
	@ResponseBody
	public Map<String,Object> getUsers(HttpServletRequest request)
	{
		JSONObject obj;
		try 
		{
			obj = JSON.parseObject(IOUtils.toString(request.getInputStream()));
			int page = obj.getIntValue("page");
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("page", page);
			map.put("rows", Constants.TEN_ROWS);
			List<ActUser> list = userService.getAllManageUser(map);
			Map<String, Object> resultMap = new HashMap<String, Object>();
			resultMap.put("result", list);
			resultMap.put("page", page);
			
			return resultMap;
		} 
		catch (IOException e) 
		{
			LOGGER.error("============={}",e);
			return FrameUtil.HttpSYstemErrorResult("");
		}
		
	}
	
	@RequiresPermissions("user:delete")
	@RequestMapping(value="deleteUser" , produces = {"application/json", "application/xml" })
	@ResponseBody
	public Map<String,Object> deleteUser(HttpServletRequest request)
	{
		JSONObject obj;
		try 
		{
			obj = JSON.parseObject(IOUtils.toString(request.getInputStream()));
			int id = obj.getIntValue("id");
			if(id <= 0)
			{
				return FrameUtil.HttpErrorResult("", ResultCode.SYS_ERROR, ResultCode.USER_ID_NOT_EXIST_MSG);
			}
			userService.deleteUserById(id);
			return FrameUtil.HttpSuccessResult("");
		} 
		catch (Exception e) 
		{
			LOGGER.error("============={}",e);
			return FrameUtil.HttpSYstemErrorResult("");
		}
		
	}
	
	@RequiresPermissions("user:add")
	@RequestMapping(value="insertUser" , produces = {"application/json", "application/xml" })
	@ResponseBody
	public Map<String,Object> insertUser(HttpServletRequest request,HttpEntity<ActUser> entity)
	{
		
		try 
		{
			ActUser user = entity.getBody();
			if(null == user || user.getRole() <=0 || StringUtils.isEmpty(user.getChannel()))
			{
				return FrameUtil.HttpErrorResult(FrameReflectUtil.toString(user), ResultCode.SYS_ERROR, ResultCode.ERROR_PARAM_MSG);
			}
			 
			userService.inserUser(user);
			return FrameUtil.HttpSuccessResult("");
		} 
		catch (Exception e) 
		{
			LOGGER.error("============={}",e);
			return FrameUtil.HttpSYstemErrorResult("");
		}
		
	}
	
	
	@RequiresPermissions("user:update")
	@RequestMapping(value="updatetUser" , produces = {"application/json", "application/xml" })
	@ResponseBody
	public Map<String,Object> updatetUser(HttpServletRequest request)
	{
		try 
		{
			JSONObject obj = JSON.parseObject(IOUtils.toString(request.getInputStream()));
			int id = obj.getIntValue("id");
			String newPwd1 = obj.getString("newPwd1");
			String newPwd2 = obj.getString("newPwd2");
			String oldPwd = obj.getString("oldPwd");
			if(StringUtils.isEmpty(newPwd1) || StringUtils.isEmpty(newPwd2) ||StringUtils.isEmpty(oldPwd) )
			{
				return FrameUtil.HttpErrorResult("", ResultCode.SYS_ERROR, ResultCode.PWD_NOT_EMPTY_MSG);
			}
			if(!newPwd1.equals(newPwd2))
			{
				return FrameUtil.HttpErrorResult("", ResultCode.SYS_ERROR, ResultCode.PWD_TWICE_DIFF_MSG);
			}
			if(oldPwd.equals(newPwd1))
			{
				return FrameUtil.HttpErrorResult("", ResultCode.SYS_ERROR, ResultCode.PWD_NEW_OLD_SAME_MSG);
			}
			ActUser user = userService.getUserById(id);
			if(!oldPwd.equals(user.getPwd()))
			{
				return FrameUtil.HttpErrorResult("", ResultCode.SYS_ERROR, ResultCode.PWD_LOGIN_ERROR_MSG);
			}
			user.setPwd(newPwd1);
			userService.updateUser(user);
			return FrameUtil.HttpSuccessResult("");
		} 
		catch (Exception e) 
		{
			LOGGER.error("============={}",e);
			return FrameUtil.HttpSYstemErrorResult("");
		}
		
	}
}
