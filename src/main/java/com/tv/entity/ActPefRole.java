package com.tv.entity;

import java.sql.Timestamp;

public class ActPefRole 
{
	private int id;
	private int perfId;
	private int roleId;
	private Timestamp tsp;
	public ActPefRole() {
		super();
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getPerfId() {
		return perfId;
	}
	public void setPerfId(int perfId) {
		this.perfId = perfId;
	}
	public int getRoleId() {
		return roleId;
	}
	public void setRoleId(int roleId) {
		this.roleId = roleId;
	}
	public Timestamp getTsp() {
		return tsp;
	}
	public void setTsp(Timestamp tsp) {
		this.tsp = tsp;
	}
	
}
