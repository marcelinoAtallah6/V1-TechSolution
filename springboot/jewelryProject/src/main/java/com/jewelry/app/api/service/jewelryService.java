package com.jewelry.app.api.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.jewelry.app.api.dao.jewelryDto;
import com.jewelry.app.api.model.jewelry;
import com.jewelry.common.CustomResponse;
import com.jewelry.common.model.dynamicSearch;

public interface jewelryService {
	
//	List<jewelry> getAllRecords();

	CustomResponse insertProduct(jewelryDto jewelryDto);

	CustomResponse updateProduct(Integer product_id,jewelryDto jewelryDto);

	CustomResponse deleteProduct(Integer product_id);

	jewelryDto getAllRecordsByProduct(Integer product_id);

	String getProductName(Integer product_id);
	
	
	List<jewelry> exportExcel(List<Long> longList);

	List<jewelry> searchProducts(String filter);

	List<dynamicSearch> getDynamicSearchFilters(String menuName);

//	List<jewelry> getMoreRecordsPageable(int startOffset, int pageSize);

	List<jewelry> getAllProductsRecords(String filter, int offset, int limit);

	
	
}
