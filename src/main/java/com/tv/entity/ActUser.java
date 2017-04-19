package com.tv.entity;

import java.sql.Timestamp;

public class ActUser 
{
	private int id;
	private String userName;
	private String pwd;
	private String phone;
	private int role;
	private String channel;
	private Timestamp tsp;
	public ActUser() 
	{
		super();
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	
	public String getPwd() {
		return pwd;
	}
	public void setPwd(String pwd) {
		this.pwd = pwd;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public int getRole() {
		return role;
	}
	public void setRole(int role) {
		this.role = role;
	}
	public Timestamp getTsp() {
		return tsp;
	}
	public void setTsp(Timestamp tsp) {
		this.tsp = tsp;
	}
	public String getChannel() {
		return channel;
	}
	public void setChannel(String channel) {
		this.channel = channel;
	}
	
	
}
