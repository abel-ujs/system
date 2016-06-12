package org.system.core;

import java.util.List;

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
	public List<Computer> getComputer(String current,String size){
		int _current = Integer.valueOf(current);
		int _size = Integer.valueOf(size);
		return computerMapper.selectAll((_current-1)*_size,_size);
	}
	public int getTotal(){
		return computerMapper.total();
	}
}
