package com.jewelry.app.api.model;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "jewelry_products", schema = "jwldba")
@Data
@NoArgsConstructor
public class jewelry {

	@Id
	@Column(name = "product_id")
	private long product_id;

	@Column(name = "product_desc")
	private String product_desc;

	@Column(name = "product_gram")
	private String product_gram;

	@Column(name = "product_stone")
	private String product_stone;

	@Column(name = "product_stone_weight")
	private String product_stone_weight;

	@Column(name = "product_size")
	private String product_size;

	@Column(name = "product_other1")
	private String product_other1;

	@Column(name = "product_other2")
	private String product_other2;

	@Column(name = "product_price")
	private String product_price;
	
	@Column(name = "product_image")
	private String product_image;

}
