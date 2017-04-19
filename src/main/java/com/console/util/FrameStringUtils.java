package com.console.util;

public class FrameStringUtils 
{
	/**
	 * @param obj
	 * @return
	 * Convert Object to "" if null.
	 * Other,Object.toString
	 */
	public static String objectToString(Object obj)
	{
		if(null == obj)
		{
			return "";
		}
		else
		{
			return obj.toString();
		}
	}
}
