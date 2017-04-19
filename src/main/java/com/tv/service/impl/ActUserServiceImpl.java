package com.tv.service.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.tv.entity.ActUser;
import com.tv.mapper.ActUserMapper;
import com.tv.service.interf.ActUserService;
@Service
public class ActUserServiceImpl implements ActUserService 
{
	@Resource
	private ActUserMapper userDao;
	public ActUser findSysUserByUsername(String username) 
	{
		return userDao.findSysUserByUsername(username);
	}
	@Override
	public List<ActUser> getAllManageUser(Map<String, Object> map) 
	{
		return userDao.getAllManageUser(map);
	}
	@Override
	public void inserUser(ActUser u) 
	{
		userDao.inserUser(u);
	}
	@Override
	public void deleteUserById(int id) 
	{
		userDao.deleteUserById(id);
	}
	@Override
	public ActUser getUserById(int id) {
		return userDao.getUserById(id);
	}
	@Override
	public void updateUser(ActUser u) {
		userDao.updateUser(u);
	}
	
}
