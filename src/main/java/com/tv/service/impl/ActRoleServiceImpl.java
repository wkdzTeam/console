package com.tv.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.tv.entity.ActRole;
import com.tv.mapper.ActRoleMapper;
import com.tv.service.interf.ActRoleService;

@Service
public class ActRoleServiceImpl implements ActRoleService
{

	@Resource
	private ActRoleMapper roleDao;
	@Override
	public ActRole findRoleById(int id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void deleteRoleById(int id) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void insertRole(ActRole role) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void updateRole(ActRole role) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public List<ActRole> findAllRole() {
		
		return roleDao.findAllRole();
	}
	 
}
