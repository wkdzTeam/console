package com.console.mapper;

import java.util.List;
import java.util.Map;

import com.console.entity.ActUser;

public interface ActUserMapper 
{
	ActUser findSysUserByUsername(String userName);
	
	/**
	 * @param map
	 * (page,rows)
	 * @return
	 */
	List<ActUser> getAllManageUser(Map<String,Object> map);
	
	ActUser getUserById(int id);
	void inserUser(ActUser u);
	
	void deleteUserById(int id);
	
	void updateUser(ActUser u);
	
}
