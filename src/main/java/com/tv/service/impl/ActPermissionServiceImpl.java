package com.tv.service.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.tv.entity.ActPermission;
import com.tv.mapper.ActPermisssionMapper;
import com.tv.service.interf.ActPermissionService;

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
