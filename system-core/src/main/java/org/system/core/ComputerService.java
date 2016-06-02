package org.system.core;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.system.dao.ComputerMapper;
import org.system.entity.Computer;

@Service
public class ComputerService {
	@Autowired
	private ComputerMapper computerMapper;
	
	public Computer getComputer(){
		return computerMapper.selectByPrimaryKey(32);
	}
}
