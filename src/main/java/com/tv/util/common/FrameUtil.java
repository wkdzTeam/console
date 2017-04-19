package com.tv.util.common;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.tv.model.ResultCode;

public class FrameUtil 
{
	private static final Logger LOGGER = LoggerFactory.getLogger(FrameUtil.class);
	public static Map<String,Object> HttpSuccessResult(Object result)
	{
		Map<String,Object> map  = new HashMap<String,Object>();
		map.put("result", result);
		map.put("code", ResultCode.SUCCESS);
		map.put("msg", ResultCode.SUCCESS_MSG);
		return map;
	}
	public static Map<String,Object> HttpErrorResult(Object result,String code,String msg)
	{
		Map<String,Object> map  = new HashMap<String,Object>();
		map.put("result", result);
		map.put("code", code);
		map.put("msg", msg);
		return map;
	}
	public static Map<String,Object> HttpSYstemErrorResult(Object result)
	{
		Map<String,Object> map  = new HashMap<String,Object>();
		map.put("result", result);
		map.put("code", ResultCode.SYS_ERROR);
		map.put("msg", ResultCode.ERROR_MSG);
		return map;
	}
	
	@SuppressWarnings("unchecked")
	public static <T> T getRequestString(HttpServletRequest request,String name,Class<T> calss)
	{
		String result = request.getParameter(name);
		LOGGER.info("================name={},request.get(name)={}",name,result);
		if(!CheckUtils.isStringEmpty(result))
		{
			if(calss == int.class ||  calss == Integer.class)
			{
				calss  = (Class<T>) Integer.class;
				return calss.cast(Integer.valueOf(result));
			} 
			else if(calss == double.class ||  calss == Double.class)
			{
				calss  = (Class<T>) Double.class;
				return calss.cast(Integer.valueOf(result));
			}
			else if(calss == BigDecimal.class )
			{
				return calss.cast(new BigDecimal(result));
			}
			else
			{
				throw new  IllegalArgumentException("this compent is not suitable for "+calss);
			}
		}
		else
		{
			return null;
		}
		
	}
	public static void main(String[] args) {
		System.out.println(getRequestString(null, null, int.class));
	}
}
