package com.jewelry.app.api.dao;

import java.math.BigInteger;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class jewelryDto {
	private long product_id;

	private String product_desc;

	private String product_gram;

	private String product_stone;

	private String product_stone_weight;

	private String product_size;

	private String product_other1;

	private String product_other2;

	private String product_price;
	
	private String product_image;

}
