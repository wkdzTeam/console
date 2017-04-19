package com.tv.entity;

import java.math.BigDecimal;
import java.sql.Timestamp;

public class ActChargeLog 
{
	private int id;
	private String deviceFlag;
	private String phone;
	private String account;
	private String channel;
	private BigDecimal amount;
	private int flag;
	private Timestamp tsp;
	public ActChargeLog() {
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
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getAccount() {
		return account;
	}
	public void setAccount(String account) {
		this.account = account;
	}
	public String getChannel() {
		return channel;
	}
	public void setChannel(String channel) {
		this.channel = channel;
	}
	public BigDecimal getAmount() {
		return amount;
	}
	public void setAmount(BigDecimal amount) {
		this.amount = amount;
	}
	public int getFlag() {
		return flag;
	}
	public void setFlag(int flag) {
		this.flag = flag;
	}
	public Timestamp getTsp() {
		return tsp;
	}
	public void setTsp(Timestamp tsp) {
		this.tsp = tsp;
	}
	
}
