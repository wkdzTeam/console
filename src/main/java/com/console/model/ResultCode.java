package com.console.model;

import java.io.Serializable;


public class ResultCode implements Serializable {

    private static final long serialVersionUID = -1659648311860514594L;
	
	public static final String SUCCESS = "0000"; //成功
	public static final String SUCCESS_MSG = "成功";
	
	public static final String REPEAT = "0003"; //重复调用
	public static final String REPEAT_MSG = "重复调用";
	
	public static final String ERROR_PARAM = "0004"; //无效参数
	public static final String ERROR_PARAM_MSG = "无效参数";
	
	public static final String DATA_UNCOMPLETE = "0005"; //无效参数
	public static final String DATA_UNCOMPLETE_MSG = "数据不完整";
	
	public static final String ERROR_STATUS = "0005"; //无效状态
	public static final String ERROR_STATUS_MSG = "无效状态"; //无效状态
	
	public static final String NO_LOGIN = "0007"; //用户没有登录
	public static final String NO_LOGIN_MSG = "用户没有登录";
	
	public static final String LOGIN_ERROR = "0009"; //
	public static final String LOGIN_ERROR_MSG = "登录错误超过10次";
	
	public static final String UNKNOW_ERROR = "9998"; //系统错误代码
	public static final String UNKNOW_ERROR_MSG = "未知异常"; //系统错误代码
	public static final String SYS_ERROR = "9999"; //系统错误代码
	
	public static final String ERROR_MSG = "系统繁忙，请稍后重试"; //系统消息 
	public static final String USER_ID_NOT_EXIST_MSG = "用户id不存在";

	public static final Object ERROR_NOT_LOGIN_MSG = "您未登录";

	public static final String DATA_FORMAT_ERROR_MSG = "数据格式错误";

	public static final String ERROR_LOGIN_MSG = "用户名或密码错误";


	public static final String PERMISSION_DENIED_MSG = "权限不足";
	
	public static final String PWD_NOT_EMPTY_MSG = "密码不能为空";  
	public static final String PWD_TWICE_DIFF_MSG = "两次输入密码不相同";  
	public static final String PWD_NEW_OLD_SAME_MSG = "新密码不能和老密码相同";  
	public static final String PWD_LOGIN_ERROR_MSG = "登录密码输入错误";  
	
	/**
	 * 成功构造方法<默认构造函数>
	 */
	public ResultCode(Object data){
	    this.code = SUCCESS;
        this.data = data;
        this.msg = SUCCESS_MSG;
	}
	

	/**
	 * 构造方法
	 */
    public ResultCode(String code, String msg, Object data) {
        this.code = code;
        this.data = data;
        this.msg = msg;
    }
    
    /**
     * 返回代码
     */
    public String code;
    
    /**
     * 错误信息
     */
    public String msg;
    
    /**
     * 返回数据
     */
    public Object data;
    
    public ResultCode setCode(String code) {
    	this.code = code;
    	return this;
    }
    
    public ResultCode setMsg(String msg) {
    	this.msg = msg;
    	return this;
    }
    
    public ResultCode setData(Object data) {
    	this.data = data;
    	return this;
    }

    /**
     * 返回执行结果代码
     * @return 结果代码
     */
    public String getCode() {
        return code;
    }

    /**
     * 返回错误消息
     * @return 错误消息
     */
    public String getMsg() {
        return msg;
    }

    /**
     * 返回执行结果数据
     * @return 结果数据，具体类型要看接口定义
     */
    public Object getData() {
        return data;
    }
    
    /**
     * 接口执行是否成功
     * @return 成功返回true，失败返回false
     */
    public boolean isSuccess() {
    	return SUCCESS.equals(code);
    }


    @Override
    public String toString() {
        return "Result [code=" + code + ", msg=" + msg + "]";
    }
    
    public static ResultCode result(String msg) {
    	return result(null,msg,null);
    }
    
    public static ResultCode result(String code, String msg) {
    	return result(code,msg,null);
    }
    
    public static ResultCode result(String code, String msg, Object data) {
    	ResultCode result = new ResultCode(code, msg, data);
    	return result;
    }
    
}


