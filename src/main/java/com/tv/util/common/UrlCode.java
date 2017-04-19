package com.tv.util.common;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class UrlCode 
{
	private static final Logger LOGGER = LoggerFactory.getLogger(UrlCode.class);
	/**
     * 字符串编码
     *
     * @param sStr
     * @param sEnc
     * @return String
     */
    public final static String UrlEncoder(String sStr, String sEnc)
    {
        String sReturnCode = "";
        try
        {
            sReturnCode = URLEncoder.encode(sStr, sEnc);
        }
        catch (UnsupportedEncodingException ex)
        {
        	LOGGER.error("===================={}",ex);
        }
        return sReturnCode;
    }

    /**
     * 字符串解码
     *
     * @param sStr
     * @param sEnc
     * @return String
     */
    public final static String UrlDecoder(String sStr, String sEnc)
    {
        String sReturnCode = "";
        try
        {
            sReturnCode = URLDecoder.decode(sStr, sEnc);
        }
        catch (UnsupportedEncodingException ex)
        {
        	LOGGER.error("===================={}",ex);
        }
        return sReturnCode;
    }
    
}
