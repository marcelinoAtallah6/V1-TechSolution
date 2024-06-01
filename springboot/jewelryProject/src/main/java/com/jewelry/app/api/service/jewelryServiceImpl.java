package com.jewelry.app.api.service;

import java.math.BigInteger;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.TypedQuery;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.jewelry.app.api.dao.jewelryDto;
import com.jewelry.app.api.model.jewelry;
import com.jewelry.app.api.repository.jewelryRepository;
import com.jewelry.common.CustomResponse;
import com.jewelry.common.model.dynamicSearch;
import com.jewelry.common.repository.dynamicSearchRepository;

@Service
public class jewelryServiceImpl implements jewelryService {

	@PersistenceContext
	private EntityManager entityManager;
//	
	@Autowired
	jewelryRepository rep;

	@Autowired
	dynamicSearchRepository dynRep;

//	@Override
//	public List<jewelry> getAllRecords() {
//
////		List<jewelry> jew = rep.findAll();
//		List<jewelry> jew = rep.getAllRecords();
//		return jew;
//	}

	@Override
	public CustomResponse insertProduct(jewelryDto jewelryDto) {
		// TODO Auto-generated method stub

		CustomResponse response = new CustomResponse();
		jewelry jewelry = new jewelry();
		
		
		Integer cnt = rep.findByName(jewelryDto.getProduct_desc());
		if(cnt>0)
		{
			response.setStatus("exists");
		}
		else
		{
			BeanUtils.copyProperties(jewelryDto, jewelry);
			rep.save(jewelry);
			response.setStatus("success");
		}

		return response;
	}

	@Override
	public CustomResponse updateProduct(Integer product_id, jewelryDto jewelryDto) {

		CustomResponse response = new CustomResponse();

		jewelry jewelry = new jewelry();
		jewelry = rep.getById((long) product_id);
		Integer cnt = rep.findByNameOnUpdate(jewelryDto.getProduct_desc(),jewelry.getProduct_desc());
		
		if(cnt>0)
		{
			response.setStatus("exists");
		}
		else
		{
			BeanUtils.copyProperties(jewelryDto, jewelry);
			rep.save(jewelry);
			response.setStatus("success");
		}
		

		return response;
	}

	@Override
	public CustomResponse deleteProduct(Integer product_id) {

		CustomResponse response = new CustomResponse();

		jewelry jewelry = new jewelry();
		jewelry = rep.getById((long) product_id);
		rep.delete(jewelry);

		return response;
	}

	@Override
	public jewelryDto getAllRecordsByProduct(Integer product_id) {

		jewelry jew = rep.getById((long) product_id);
		jewelryDto jewelryDto = new jewelryDto();
		BeanUtils.copyProperties(jew, jewelryDto);

		return jewelryDto;
	}

	@Override
	public List<jewelry> exportExcel(List<Long> product_id) {

		List<jewelry> jew = rep.findByIdIn(product_id);

		return jew;
	}

	@Override
	public String getProductName(Integer product_id) {
		jewelry jewelry = new jewelry();
		jewelry = rep.getById((long) product_id);
		return jewelry.getProduct_desc();
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<jewelry> searchProducts(String filter) {
		return entityManager.createQuery("SELECT j FROM jewelry j " + filter + "  order by j.product_id desc")
				.getResultList();
	}

	@Override
	public List<dynamicSearch> getDynamicSearchFilters(String menuName) {
		return dynRep.getDynamicSearchFilters(menuName);
	}

//	@Override
//	public List<jewelry> getMoreRecords(int startOffset, int pageSize) {
//		 String nativeQuery = "SELECT * FROM (SELECT j.*, ROW_NUMBER() OVER (ORDER BY j.product_id) as rownum FROM jewelry.jewelry_products j) as subquery WHERE rownum >= :startOffset AND rownum <= :endOffset ORDER BY product_id";
//		    Query query = entityManager.createNativeQuery(nativeQuery, jewelry.class);
//		    query.setParameter("startOffset", startOffset);
//		    query.setParameter("endOffset", pageSize);
//System.out.println(" query.getResultList() >> "+query.getResultList());
//System.out.println(" query.size() >> "+query.getResultList().size());
//
//		return query.getResultList();
//
//	}
	
	
//	@Override
//	public List<jewelry> getMoreRecordsPageable(int offset, int limit) {
//	    Pageable pageable = PageRequest.of(offset, limit);
//	    return rep.findAll(pageable).getContent();
//	}

	@Override
	public List<jewelry> getAllProductsRecords(String filter, int offset, int limit) {
		
		
		List<Long> products = entityManager.createQuery("SELECT j.product_id FROM jewelry j " + filter + " ")
				.getResultList();
		System.out.println("products >> "+products);
        Sort sort = Sort.by(Sort.Direction.ASC, "product_desc");
	    Pageable pageable = PageRequest.of(offset, limit,sort);
	    Page<jewelry> jewelryPage = rep.findByIdInWithPageable(products, pageable);
	    List<jewelry> jewelry = jewelryPage.getContent();
		System.out.println("jewelry >> "+jewelry);

		return jewelry;
	}

}