package com.console.mapper;

import java.util.List;

import com.console.entity.ActRole;

public interface ActRoleMapper 
{
	ActRole findRoleById(int id);
	void deleteRoleById(int id);
	void insertRole(ActRole role);
	void updateRole(ActRole role);
	List<ActRole>findAllRole();
}
