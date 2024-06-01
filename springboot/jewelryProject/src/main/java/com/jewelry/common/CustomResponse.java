package com.jewelry.common;

import com.jewelry.utils.*;
import io.swagger.v3.oas.annotations.Hidden;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class CustomResponse {
	
	private String code;
	private String status;
	private String description;
	
	@Override
	public String toString() {
		return StringUtils.toJsonString(this);
	}
}
