package com.tv.util.common;

import java.math.BigDecimal;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.commons.lang.StringUtils;

public class CheckUtils 
{
	public static boolean  isPhoneIllegal(String phone)
	{
		String regExp = "^1[3|4|5|7|8]\\d{9}$";  
		boolean result =  false;
		if(!StringUtils.isEmpty(phone))
		{
			Pattern p = Pattern.compile(regExp);  
			Matcher m = p.matcher(phone);  
			result = m.find();
		}
		return result;
	}
	public static boolean  isIdCardIllegal(String idCardNO)
	{
		String regExp = "^(\\d{15}$|^\\d{18}$|^\\d{17}(\\d|X|x))$";  
		boolean result =  false;
		if(!StringUtils.isEmpty(idCardNO))
		{
			Pattern p = Pattern.compile(regExp);  
			Matcher m = p.matcher(idCardNO);  
			result = m.find();
		}
		return result;
	}
	
	public static String getIllegalPhone(String phone)
	{
		String result = "";
		if(isPhoneIllegal(phone))
		{
			char[] chars  = phone.toCharArray();
			StringBuffer sbr = new StringBuffer();
			for(int i=0;i<chars.length;i++)
			{
				if(i>=3 && i<=6)
				{
					sbr.append("*");
				}
				else
				{
					sbr.append(chars[i]);
				}
				
			}
			result = sbr.toString();
		}
		return result;
	}
	public static String getIllegalIDCard(String idCardNO)
	{
		String result = "";
		if(isIdCardIllegal(idCardNO))
		{
			char[] chars  = idCardNO.toCharArray();
			StringBuffer sbr = new StringBuffer();
			for(int i=0;i<chars.length;i++)
			{
				if(i>=3 && i<=13)
				{
					sbr.append("*");
				}
				else
				{
					sbr.append(chars[i]);
				}
				
			}
			result = sbr.toString();
		}
		return result;
	}
	
	
	public static boolean isStringEmpty(String str)
	{
		boolean isEmpty = false;
		if(StringUtils.isEmpty(str) || "null".equals(str.trim()))
		{
			isEmpty = true;
		}
		return isEmpty;
	}
	
	public static boolean isIllegalNumberLength(BigDecimal a,int shouldLength)
	{
		boolean isOk = false;
		if(BigDecimalUtils.getBigDecimalSize(a)<=shouldLength)
		{
			isOk = true;
		}
		return isOk;
	}
	
	
//	public static void main(String[] args) {
//		System.out.println(CheckUtils.getIllegalPhone("18327589654"));
//		
//	}
}
