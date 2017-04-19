package com.console.service.interf;

import java.util.List;
import java.util.Map;

import com.console.entity.ActPermission;

public interface ActPermissionService 
{

	List<ActPermission> findOwnMenus(int id);

	List<ActPermission> findOwnPermission(Map<String, Object> params);

}
