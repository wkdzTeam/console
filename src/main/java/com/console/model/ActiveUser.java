package com.console.model;

import java.util.List;

import com.console.entity.ActPermission;

public class ActiveUser implements java.io.Serializable {
	private static final long serialVersionUID = 6362913425265769579L;
	private Integer id;//用户id（主键）
	private String userName;// 用户账号
	private String phone;
	private Integer role ;
	private List<ActPermission> menus;// 菜单
	private List<ActPermission> permissions;// 权限

	

	
	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public Integer getRole() {
		return role;
	}

	public void setRole(Integer role) {
		this.role = role;
	}

	public List<ActPermission> getMenus() {
		return menus;
	}

	public void setMenus(List<ActPermission> menus) {
		this.menus = menus;
	}

	public List<ActPermission> getPermissions() {
		return permissions;
	}

	public void setPermissions(List<ActPermission> permissions) {
		this.permissions = permissions;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}


	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	
}
