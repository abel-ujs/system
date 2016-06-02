package org.system.dao;

import java.util.List;
import org.system.entity.Computer;
import org.system.entity.ComputerExample;

public interface ComputerMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Computer record);

    int insertSelective(Computer record);

    List<Computer> selectByExample(ComputerExample example);

    Computer selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Computer record);

    int updateByPrimaryKey(Computer record);
}