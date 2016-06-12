package org.system.core;

import static org.junit.Assert.*;

import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.system.entity.Computer;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations={"classpath:spring.xml","classpath:spring-mybatis.xml"})
public class ComputerServiceTest {

	@Autowired
	private ComputerService computerService;
	
	@Test
	public void test() {
		Computer computer = computerService.getComputer();
		assertTrue(computer.getId()==32);
	}
	@Test
	public void testSelectPage(){
		List<Computer> computers = computerService.getComputer("1", "2");
		assertTrue(computers.size()==2);
	}

}
