package com.jewelry.app.api.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.jewelry.app.api.model.jewelry;

@Repository
public interface jewelryRepository extends JpaRepository<jewelry, Long>{
	
	
	@Query("SELECT j FROM jewelry j where j.product_id in(:productIds) ")
	List<jewelry> findByIdIn(@Param("productIds") List<Long> product_id);
	
	@Query("SELECT j FROM jewelry j order by j.product_id desc")
	List<jewelry> getAllRecords();
	
    @Query("SELECT j FROM jewelry j WHERE j.product_id IN :ids")
    Page<jewelry> findByIdInWithPageable(@Param("ids") List<Long> ids, Pageable pageable);

    @Query("SELECT count(1) FROM jewelry j WHERE j.product_desc = :product_desc")
	Integer findByName(@Param("product_desc")  String product_desc);

    @Query("SELECT count(1) FROM jewelry j WHERE j.product_desc = :product_desc and j.product_desc != :product_desc2")
	Integer findByNameOnUpdate(@Param("product_desc") String product_desc, @Param("product_desc2")  String product_desc2);

	 
}
