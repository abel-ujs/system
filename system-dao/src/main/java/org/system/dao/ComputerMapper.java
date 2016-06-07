package org.system.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.system.entity.Computer;

public interface ComputerMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Computer record);

    int insertSelective(Computer record);

    Computer selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Computer record);

    int updateByPrimaryKey(Computer record);
    
    List<Computer> selectAll(@Param("start") Integer start,@Param("size") Integer size);
}