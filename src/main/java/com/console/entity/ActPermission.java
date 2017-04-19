package com.console.entity;

import java.sql.Timestamp;

public class ActPermission 
{
	private int id;
	private String url;
	private String code;
	private String name;
	private Timestamp tsp;
	
	public ActPermission() {
		super();
		// TODO Auto-generated constructor stub
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public Timestamp getTsp() {
		return tsp;
	}
	public void setTsp(Timestamp tsp) {
		this.tsp = tsp;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
	
}
