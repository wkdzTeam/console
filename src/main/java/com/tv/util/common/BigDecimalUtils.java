package com.tv.util.common;

import java.math.BigDecimal;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.tv.model.ResultCode;

public class BigDecimalUtils 
{
	private static final Logger LOGGER = LoggerFactory.getLogger(BigDecimalUtils.class);
	/**
	 * @param bigDec
	 * @param d
	 * @return boolean
	 * if bigDec bigger than d or equal ,return true
	 */
	public static boolean compareDouble(BigDecimal bigDec,double d)
	{
		boolean result = false;
		if(null != bigDec && bigDec.compareTo(new BigDecimal(d))>=0 )
		{
			result  = true;
		}
		return result;
	}
	
	/**
	 * @param a
	 * @param b
	 * @return boolean
	 * if a bigger than b,return true else return false
	 */
	public static boolean bigThan(BigDecimal a,double b)
	{
		boolean result = false;
		if(null != a && a.compareTo(new BigDecimal(b))> 0 )
		{
			result  = true;
		}
		return result;
	}
	/**
	 * @param bigDec
	 * @param d
	 * @return boolean
	 * if bigDec bigger than d or equal ,return true
	 */
	public static boolean compareDouble(BigDecimal bigDec,BigDecimal d)
	{
		boolean result = false;
		if(null != bigDec && null!=d && bigDec.compareTo(d)>=0 )
		{
			result  = true;
		}
		return result;
	}
	/**
	 * @param a
	 * @param b
	 * @return boolean 
	 * if a less than b  return true else return false
	 */
	public static boolean isLess(BigDecimal a,BigDecimal b)
	{
		boolean result = false;
		if(null == a || null == b)
		{
			LOGGER.error("=================a={},b={}",a,b);
			throw new IllegalArgumentException(ResultCode.DATA_FORMAT_ERROR_MSG);
		}
		if(a.compareTo(b)<0)
		{
			result  = true;
		}
		return result;
	}
	
	/**
	 * @param a
	 * @param b
	 * @return a+b
	 */
	public static BigDecimal add(BigDecimal a,BigDecimal b)
	{
		if(null == a || null == b)
		{
			LOGGER.error("=================a={},b={}",a,b);
			throw new IllegalArgumentException(ResultCode.DATA_FORMAT_ERROR_MSG);
		}
		return a.add(b);
	}
	/**
	 * @param a
	 * @param b
	 * @return a-b
	 */
	public static BigDecimal sub(BigDecimal a,BigDecimal b)
	{
		if(null == a || null == b)
		{

			LOGGER.error("=================a={},b={}",a,b);
			throw new IllegalArgumentException(ResultCode.DATA_FORMAT_ERROR_MSG);
		}
		return a.subtract(b);
	}
	
	/**
	 * @param a
	 * @param b
	 * @return a*b
	 */
	public static BigDecimal multi(BigDecimal a,BigDecimal b)
	{
		if(null == a || null == b)
		{

			LOGGER.error("=================a={},b={}",a,b);
			throw new IllegalArgumentException(ResultCode.DATA_FORMAT_ERROR_MSG);
		}
		return a.multiply(b);
	}
	/**
	 * @param a
	 * @param b
	 * @return a/b
	 */
	public static BigDecimal divide(BigDecimal a,BigDecimal b)
	{
		if(null == a || null == b)
		{
			
			LOGGER.error("=================a={},b={}",a,b);
			throw new IllegalArgumentException(ResultCode.DATA_FORMAT_ERROR_MSG);
		}
		return a.divide(b,2,BigDecimal.ROUND_HALF_EVEN);
	}
	
	
	/**
	 * @param a
	 * @return |a|
	 */
	public static BigDecimal abs(BigDecimal a)
	{
		if(null == a)
		{
			
			LOGGER.error("=================a={}",a);
			throw new IllegalArgumentException(ResultCode.DATA_FORMAT_ERROR_MSG);
		}
		BigDecimal zero = new BigDecimal(0.0);
		if(a.compareTo(zero) <0 )
		{
			return zero.subtract(a);
		}
		return a;
	}
	
	/**
	 * @param a
	 * @return -|a|
	 */
	public static BigDecimal negative(BigDecimal a)
	{
		if(null == a)
		{
			
			LOGGER.error("=================a={}",a);
			throw new IllegalArgumentException(ResultCode.DATA_FORMAT_ERROR_MSG);
		}
		BigDecimal zero = new BigDecimal(0.0);
		return zero.subtract(BigDecimalUtils.abs(a));
	}
	/**
	 * @param a
	 * @param b
	 * @return a==b
	 */
	public static boolean isEqual(BigDecimal a,BigDecimal b)
	{
		boolean isOK = true;
		if(null == a || null == b)
		{
			isOK = false;
		}
		else if(a.compareTo(b) != 0)
		{
			isOK = false;
		}
		return isOK;
	}
	 
	/**
	 * @param a
	 * @return int
	 */
	public static int getBigDecimalSize(BigDecimal a)
	{
		if(null == a )
		{
			LOGGER.error("==============BigDecimal a is null");
			return 0;
		}
		else 
		{
			return a.toString().length();
		}
	}
	
	public static void main(String[] args) {
		BigDecimal a = new BigDecimal("1.20");
		BigDecimal b = new BigDecimal("1.21");
		System.out.println(b.compareTo(a));
	}
	
	
}
