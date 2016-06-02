package org.system.dao;

import java.util.List;
import org.system.entity.Link;
import org.system.entity.LinkExample;

public interface LinkMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Link record);

    int insertSelective(Link record);

    List<Link> selectByExample(LinkExample example);

    Link selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Link record);

    int updateByPrimaryKey(Link record);
}