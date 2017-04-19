package com.console.util;

import java.lang.reflect.Field;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * @author RuiChar
 *
 */
public class FrameReflectUtil 
{
	private static final Logger LOGGER = LoggerFactory.getLogger(FrameReflectUtil.class);
	
	/**
	 * @param obj
	 * @return String
	 * convert Object to specified String
	 */
	public static String toString(Object obj)
	{
		
		StringBuilder result = new StringBuilder("");
		result.append("properties is :");
		if(null == obj) return result.toString();
		try
		{
			Class<?> clazz = obj.getClass();
			Field[] fls = clazz.getDeclaredFields();
			if(null != fls && fls.length >0)
			{
				for(Field item : fls)
				{
					item.setAccessible(true);
					String key = item.getName();
					Object value = item.get(obj);
					result.append(key).append("=").append(value).append(",");
				}
			}
		}
		catch(Exception e)
		{
			LOGGER.error("============={}",e);
		}
		
		return result.toString();
	}
	
}
