package com.console.manage;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.StringUtils;

import com.console.entity.ActPermission;
import com.console.entity.ActUser;
import com.console.model.ActiveUser;
import com.console.service.interf.ActPermissionService;
import com.console.service.interf.ActUserService;

public class CustomRealm extends AuthorizingRealm {
	private static Logger LOGGER = LoggerFactory.getLogger(CustomRealm.class);

	@Resource
	private ActUserService userService;

	@Resource
	private ActPermissionService permissionService;


	@Override
	public void setName(String name) {
		super.setName("customRealm");
	}

	@Override
	protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token) throws AuthenticationException {
		LOGGER.info("=========================================================doGetAuthenticationInfo");
		UsernamePasswordToken userToken = (UsernamePasswordToken) token;
		ActUser sysUser = null;
		try {
			sysUser = userService.findSysUserByUsername(userToken.getUsername());
		} catch (Exception e1) {
			LOGGER.error("========================{}", e1);
		}

		if (null == sysUser) {
			LOGGER.error("=======no user exist input userName:{}", userToken.getUsername());
			return null;
		}
		String password = sysUser.getPwd();

		ActiveUser activeUser = new ActiveUser();

		activeUser.setId(sysUser.getId());
		activeUser.setUserName(sysUser.getUserName());
		activeUser.setRole(sysUser.getRole());
		activeUser.setPhone(sysUser.getPhone());
		List<ActPermission> menus = null;
		try {
			menus = permissionService.findOwnMenus(sysUser.getId());
		} catch (Exception e) {
			LOGGER.error("===============exception:{}", e);
		}
		activeUser.setMenus(menus);
		SimpleAuthenticationInfo simpleAuthenticationInfo = new SimpleAuthenticationInfo(activeUser, password,
				this.getName());
		return simpleAuthenticationInfo;
	}

	// 用于授权
	@Override
	protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {
		ActiveUser activeUser = (ActiveUser) principals.getPrimaryPrincipal();
		List<ActPermission> permissionList = null;
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("id", activeUser.getId());
		try {
			permissionList = permissionService.findOwnPermission(params);
		} catch (Exception e) {
			LOGGER.error("===============exception:{}", e);
		}
		List<String> permissions = new ArrayList<String>();
		if (null != permissionList && !permissionList.isEmpty()) {
		for (ActPermission sysPermission : permissionList) {
				if (!StringUtils.isEmpty(sysPermission.getCode())) {
					permissions.add(sysPermission.getCode());
				}
			}
		}

		SimpleAuthorizationInfo simpleAuthorizationInfo = new SimpleAuthorizationInfo();
		simpleAuthorizationInfo.addStringPermissions(permissions);
		return simpleAuthorizationInfo;
	}

	// //清除缓存
	// public void clearCached() {
	// PrincipalCollection principals =
	// SecurityUtils.getSubject().getPrincipals();
	// super.clearCache(principals);
	// }

}
