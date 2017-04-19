package com.tv.mapper;

import java.util.List;
import java.util.Map;

import com.tv.entity.ActPefRole;

public interface ActPefRoleMapper 
{
	ActPefRole findById(int id);
	List<ActPefRole> findByCondition(Map<String,Object> map);
	void insert(ActPefRole item);
	void insertBatchRef(List<ActPefRole> list);
	void deleteByPKId(int id);
}
