package com.tv.util.common;

import java.text.SimpleDateFormat;
import java.util.Date;

public class TimeUtils 
{
	public static long getNowSeconds()
	{
		return System.currentTimeMillis()/1000;
	}
	
	public static String getYYMMDDHHMMSS(Date date)
	{
		SimpleDateFormat f = new SimpleDateFormat("yyyy-MM-ddhhmmss");
		if(null == date)
		{
			return "";
		}
		return f.format(date);
	}
	
	public static void main(String[] args) {
		System.out.println(getYYMMDDHHMMSS(new Date()));
	}
	
}
