package org.system.core;

import static org.junit.Assert.*;

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
		Computer user = computerService.getComputer();
		assertTrue(user.getId()==32);
	}

}
