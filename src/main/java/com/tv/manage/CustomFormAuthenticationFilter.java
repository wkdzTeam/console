package com.tv.manage;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Map;

import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.commons.io.IOUtils;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.apache.shiro.web.filter.authc.FormAuthenticationFilter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.tv.model.ResultCode;
import com.tv.util.common.FrameUtil;

public class CustomFormAuthenticationFilter extends FormAuthenticationFilter {
	private static final Logger LOGGER = LoggerFactory.getLogger(CustomFormAuthenticationFilter.class);

	/**
	 * 所有请求都会经过的方法。
	 */
	@Override
	protected boolean onAccessDenied(ServletRequest request, ServletResponse response) throws Exception {
		HttpServletRequest httpservletrequest = (HttpServletRequest) request;
		if (isLoginRequest(request, response)) {
			JSONObject reqJson = JSON.parseObject(IOUtils.toString(httpservletrequest.getInputStream(), "utf-8"));
			String username = reqJson.getString("userName");
			String password = reqJson.getString("pwd");
			// open the browser and the default login status is true
			boolean rememberMe = true;
			LOGGER.info("===========================login parmas username:{},password：{},rememberMe:{}",
					new Object[] { username, password, rememberMe });

				Subject subject = SecurityUtils.getSubject();
				UsernamePasswordToken token = new UsernamePasswordToken(username, password, rememberMe);
				try {
					subject.login(token); // 、凭证不匹配的时候要捕获异常，这样子才能确认是什么样的错误。
				} catch (Exception e) {
					String message = e.getClass().getSimpleName();
					LOGGER.info("==========================Exception{}", e);
					if ("IncorrectCredentialsException".equals(message)) {
						whriteJsonToResponse(response, FrameUtil.HttpErrorResult(null, ResultCode.SYS_ERROR,
								ResultCode.ERROR_LOGIN_MSG));
					} else if ("UnknownAccountException".equals(message)) {
						whriteJsonToResponse(response, FrameUtil.HttpErrorResult(null, ResultCode.SYS_ERROR,
								ResultCode.ERROR_LOGIN_MSG));
					} else if ("LockedAccountException".equals(message)) {
						whriteJsonToResponse(response, FrameUtil.HttpErrorResult(null, ResultCode.SYS_ERROR,
								ResultCode.ERROR_LOGIN_MSG));
					} else if ("UnauthorizedException".equals(message)) {
						whriteJsonToResponse(response, FrameUtil.HttpErrorResult(null, ResultCode.SYS_ERROR,
								ResultCode.PERMISSION_DENIED_MSG));
					} else {
						whriteJsonToResponse(response,
								FrameUtil.HttpErrorResult(null, ResultCode.SYS_ERROR, ResultCode.ERROR_MSG));
					}
				}
				return true;
		} else {
			whriteJsonToResponse(response, FrameUtil.HttpErrorResult(null, ResultCode.LOGIN_ERROR, "您未登录"));
			return false;
		}
	}

	private void whriteJsonToResponse(ServletResponse response, Map<String, Object> result) throws IOException {
		response.setContentType("application/json;charset=UTF-8");
		PrintWriter out = response.getWriter();
		out.print(JSON.toJSONString(result));
		out.flush();
		out.close();
	}
}
