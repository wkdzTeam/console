package com.console.util;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;

import com.console.model.ActiveUser;
public class DefCookieUtil 
{
	public static ActiveUser getUserInCookie()
	{
		Subject subject = SecurityUtils.getSubject();
		ActiveUser user =  (ActiveUser) subject.getPrincipal();
		return user;
	}
}
