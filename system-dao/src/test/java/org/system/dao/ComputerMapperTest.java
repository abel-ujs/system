package org.system.dao;

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
public class ComputerMapperTest {

	@Autowired
	private ComputerMapper computerMapper;
	@Test
	public void test() {
		Computer selectByPrimaryKey = computerMapper.selectByPrimaryKey(32);
		assertNotNull(selectByPrimaryKey);
	}
	@Test
	public void selectAll() {
		List<Computer> selectAll = computerMapper.selectAll(0, 11);
		assertNotNull(selectAll);
	}

}
