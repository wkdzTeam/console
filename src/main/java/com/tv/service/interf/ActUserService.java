package com.tv.service.interf;

import java.util.List;
import java.util.Map;

import com.tv.entity.ActUser;

public interface ActUserService 
{

	ActUser findSysUserByUsername(String username);
	
	List<ActUser> getAllManageUser(Map<String, Object> map);
	void inserUser(ActUser u);
	void deleteUserById(int id);
	ActUser getUserById(int id);
	void updateUser(ActUser u);
}
