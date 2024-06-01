package com.jewelry.app.api.action;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.data.web.SpringDataWebProperties.Sort;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;

import com.jewelry.app.api.dao.jewelryDto;
import com.jewelry.app.api.model.jewelry;
import com.jewelry.app.api.service.jewelryService;
import com.jewelry.common.CustomResponse;
import com.jewelry.common.dto.dynamicSearchDto;
import com.jewelry.common.model.dynamicSearch;
import com.jewelry.utils.StringUtils;

import io.swagger.v3.oas.annotations.Operation;
import org.springframework.web.bind.annotation.RequestBody;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "Test", description = "Testing .... ' exposed APIs.")
@RestController
@RequestMapping("/api")
public class jewelryRestControler{
	
	@Autowired
	private jewelryService service;
	
    @GetMapping("/storeItems")
    public RedirectView redirectToHome() {
        return new RedirectView("/"); // Redirect to the root URL
    }
	
//	@Operation(summary = "Get all records.")
//	@GetMapping("/getAllRecords")
//	public List<jewelry> getAllRecords(){
//
//		return service.getAllRecords();
//	}
//	
//	  @GetMapping("/getMoreRecords/{offset}/{limit}")
//	  public List<jewelry> getMoreRecords(@PathVariable("offset") int offset, @PathVariable("limit")  int limit) {
//	    return service.getMoreRecordsPageable(offset,limit);
//	  }
	  
	  @PostMapping("/getAllProductsRecords/{offset}/{limit}")
	  public List<jewelry> getAllProductsRecords(@RequestBody dynamicSearchDto dynamicSearchObject,@PathVariable("offset") int offset, @PathVariable("limit")  int limit) {
		String filter = dynamicSearchObject.getCondition();
	    return service.getAllProductsRecords(filter,offset,limit);
	  }
	
	@Operation(summary = "Get all records.")
	@GetMapping(path="/getAllRecordsByProduct/{product_id}", produces = "application/json")
	public jewelryDto etAllRecordsByProduct(@PathVariable("product_id") Integer product_id) {
		
		return service.getAllRecordsByProduct(product_id);
	}
	
	@Operation(summary = "Get all records.")
	@PostMapping(path="/searchProducts", produces = "application/json")
	public List<jewelry> searchProducts(@RequestBody dynamicSearchDto dynamicSearchObject) {
		String filter = dynamicSearchObject.getCondition();
		return service.searchProducts(filter);
	}
	
	@Operation(summary = "Get all records.")
	@GetMapping(path="/getDynamicSearchFilters/{menuName}", produces = "application/json")
	public List<dynamicSearch> getDynamicSearchFilters(@PathVariable("menuName") String menuName) {
		System.out.println("menuName =  "+menuName);
		return service.getDynamicSearchFilters(menuName);
	}
	
	@Operation(summary = "Get all records.")
	@GetMapping(path="/export/{product_id}", produces = "application/json")
	public List<jewelry> exportExcel(@PathVariable("product_id") String product_id) {
		
        List<Long> longList = StringUtils.convertStringToListOfLong(product_id);
        System.out.println(" longList >>> "+longList);
		return service.exportExcel(longList);
	}
	
	@Operation(summary = "insert Product.")
	@PostMapping("/insertProduct")
	public CustomResponse insertProduct(@RequestBody jewelryDto jewelryDto  ){
		System.out.println(" insert >>  "+jewelryDto);
		System.out.println("jewelryDto >> "+jewelryDto.getProduct_desc());

		return service.insertProduct(jewelryDto);
	}
	
	
	@Operation(summary = "update Product.")
	@GetMapping("/getProductName/{product_id}")
	public String getProductName(@PathVariable("product_id") Integer product_id ){

		return service.getProductName(product_id);
	}
	
	
	@Operation(summary = "update Product.")
	@PostMapping("/updateProduct/{product_id}")
	public CustomResponse updateProduct(@PathVariable("product_id") Integer product_id,@RequestBody jewelryDto jewelryDto  ){

		return service.updateProduct(product_id,jewelryDto);
	}
	
	
	@Operation(summary = "delete Product.")
	@GetMapping("/deleteProduct/{product_id}")
	public CustomResponse deleteProduct(@PathVariable("product_id") Integer product_id ){
		return service.deleteProduct(product_id);
	}
	
}
