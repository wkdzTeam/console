package com.console.service.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.console.entity.ActPermission;
import com.console.mapper.ActPermisssionMapper;
import com.console.service.interf.ActPermissionService;

@Service
public class ActPermissionServiceImpl implements ActPermissionService 
{

	@Resource
	private ActPermisssionMapper permissionMapper;
	public List<ActPermission> findOwnMenus(int id) 
	{
		
		return permissionMapper.findOwnMenus(id);
	}

	public List<ActPermission> findOwnPermission(Map<String, Object> params) 
	{
		return permissionMapper.findOwnPermission(params);
	}

}
