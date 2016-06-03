package org.system.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class ComputerController {
	
	@RequestMapping("/api/test.do")
	@ResponseBody
	public Map<String,String> test(){
		HashMap<String,String> hashMap = new HashMap<String, String>();
		hashMap.put("data", "test");
		hashMap.put("code", "202");
		return hashMap;
	}
	@RequestMapping("/user/getPermission.do")
	@ResponseBody
	public List<String> getPermission(){
		List<String> arrayList = new ArrayList<String>();
		arrayList.add("login");
		arrayList.add("admin");
		return arrayList;
	}

}
