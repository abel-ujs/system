package com.fh.utils;


import java.io.IOException;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.commons.io.IOUtils;
import org.apache.http.HttpEntity;
import org.apache.http.HttpStatus;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.apache.log4j.Logger;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;

public class CrawlerUtil {
	private static final Logger LOGGER = Logger.getLogger(CrawlerUtil.class);
	private static CloseableHttpClient client = HttpClients.createDefault();
	/** 请求url */
	private static final String URL = "http://ip.phpddt.com/?ip=%s";

	/**
	 * 根据ip查询经纬度和国家
	 * 
	 * @param ip
	 * @return strs{纬度，经度，国家}
	 */
	public static String[] searchIp(String ip) {
		try{
			String[] strs = new String[3];
			String url = String.format(URL, ip);
			String responseStr = getExcute(url);
			if (responseStr.equals("")) {
				LOGGER.warn("response string is empty !");
				return strs;
			}
			Document doc = Jsoup.parse(responseStr);
			Elements resultEle = doc.select(".box_result strong:contains(查询参考【1】)");
			if (resultEle == null || resultEle.size() == 0) {
				LOGGER.warn("parse response error !");
				return strs;
			}
			String result = resultEle.text();
			LOGGER.info(result);
			Pattern p = Pattern.compile(".*=>\\s(.*)纬度(-{0,1}\\d+\\.*\\d*).*经度(-{0,1}\\d+\\.*\\d*)$");

			Matcher m = p.matcher(result);
			m.matches();
			String area = m.group(1);
			System.out.println(area);
			strs[2] = area.split(" ")[0];
			strs[0] = m.group(2);
			strs[1] = m.group(3);
			System.out.println(strs[0]);
			return strs;
		}catch(IllegalStateException e){
			return null;
		}
	}

	/**
	 * get请求
	 * 
	 * @param url
	 *            请求地址
	 * @param header
	 *            请求头部
	 * @return String 响应字符串
	 */
	private static String getExcute(String url) {
		HttpGet get = new HttpGet(url);
		CloseableHttpResponse response = null;
		HttpEntity entity = null;
		String responseStr = "";
		try {
			response = client.execute(get);
			if (response.getStatusLine().getStatusCode() != HttpStatus.SC_OK) {
				return responseStr;
			}
			entity = response.getEntity();
			// entity不可为null
			if (null == entity) {
				return responseStr;
			}
			// 将entity转化为字符串
			responseStr = EntityUtils.toString(entity, "UTF-8");
		} catch (ClientProtocolException e) {
			LOGGER.error("ClientProtocolException:client.execute error [" + e.getMessage() + "]");
		} catch (IOException e) {
			LOGGER.error(url + " : IOException [" + e.getMessage() + "]");
		} finally {
			// 消耗entity
			EntityUtils.consumeQuietly(entity);
			// 关闭response
			IOUtils.closeQuietly(response);
			// 释放get
			get.releaseConnection();
		}
		return responseStr;

	}

	public static void main(String[] args) {
		CrawlerUtil.searchIp("9.8.8.7");
	}
}
