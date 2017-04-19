package com.tv.util.common;

import java.util.Random;

public class RandomCode 
{
	/**
	 * @param nm
	 * @return String
	 * get the random String which is consist of integer  by the given  length
	 */
	public static String getSpecifiedStr(int length)
	{
		StringBuilder result = new StringBuilder("");
		for(int i=0;i<length;i++)
		{
			result.append(getRandomInt(10));
		}
		return result.toString();
	}
	
	/**
	 * @param minVal
	 * @param maxVal
	 * @return int
	 * get the random integer value between zero and maxVal
	 */
	private static int getRandomInt(int maxVal)
	{
		Random random = new Random();
		return random.nextInt(maxVal);
	}
	
//	public static void main(String[] args) {
//		System.out.println(getSpecifiedStr(6));
//	}
}
