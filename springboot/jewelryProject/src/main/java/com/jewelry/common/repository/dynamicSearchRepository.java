package com.jewelry.common.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.jewelry.common.dto.dynamicSearchDto;
import com.jewelry.common.model.dynamicSearch;


@Repository
public interface dynamicSearchRepository extends JpaRepository<dynamicSearch, Long>{
	

@Query("SELECT j FROM dynamicSearch j where j.menu_name = :menuName  ")
	List<dynamicSearch> getDynamicSearchFilters(@Param("menuName") String  menuName);
	
}
