package com.tv.entity;

import java.sql.Timestamp;

public class ActDevice 
{
	private int id;
	private String deviceFlag;
	private int isActive;
	private String phone;
	private String channel;
	private Timestamp tsp;
	public ActDevice() {
		super();
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getDeviceFlag() {
		return deviceFlag;
	}
	public void setDeviceFlag(String deviceFlag) {
		this.deviceFlag = deviceFlag;
	}
	public int getIsActive() {
		return isActive;
	}
	public void setIsActive(int isActive) {
		this.isActive = isActive;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getChannel() {
		return channel;
	}
	public void setChannel(String channel) {
		this.channel = channel;
	}
	public Timestamp getTsp() {
		return tsp;
	}
	public void setTsp(Timestamp tsp) {
		this.tsp = tsp;
	}
	
	
}
