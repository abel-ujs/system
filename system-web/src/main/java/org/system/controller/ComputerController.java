package org.system.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.system.core.ComputerService;
import org.system.entity.Computer;
import org.system.utils.Page;
import org.system.utils.Response;

@Controller
public class ComputerController {
	
	@Autowired
	private ComputerService computerService;
	
	@RequestMapping("/computer/getAll.do")
	@ResponseBody
	public Response<Computer> getAll(String current,String size){
		Page page = new Page(current,size);
		int total = computerService.getTotal();
		page.setTotal(String.valueOf(total));
		List<Computer> computers = computerService.getComputer(current, size);
		Response<Computer> response = new Response<Computer>();
		response.setResult(computers);
		response.setPage(page);
		return response;
	}
	@RequestMapping("/computer/test.do")
	@ResponseBody
	public Response<Object> test(String current,String size){
		Response<Object> response = new Response<Object>();
		return response;
	}
	

}
