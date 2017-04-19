package com.tv.entity;

import java.sql.Timestamp;

public class ActRole 
{
	private int id;
	private String name;
	private Timestamp tsp;
	public ActRole() 
	{
		super();
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Timestamp getTsp() {
		return tsp;
	}
	public void setTsp(Timestamp tsp) {
		this.tsp = tsp;
	}
	
	
}
