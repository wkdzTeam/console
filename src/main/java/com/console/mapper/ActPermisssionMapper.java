package com.console.mapper;

import java.util.List;
import java.util.Map;

import com.console.entity.ActPermission;

public interface ActPermisssionMapper 
{
	List<ActPermission>findOwnPermission(Map<String, Object> map);
	List<ActPermission>findOwnMenus(int id);
	void deletePermission(int id);
	void insertPermission(ActPermission item);
	void updatePermission(ActPermission item);
	void insertBatchPermRole(List<ActPermission> list);
	List<ActPermission> findPermissionByRoleId(int roleId);
	ActPermission findPermissionById(int id);
	void deleteRolePerm(int roleId);
}
