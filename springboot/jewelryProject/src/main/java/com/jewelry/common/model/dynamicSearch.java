package com.jewelry.common.model;

import java.math.BigInteger;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "jewelry_dyn_search", schema = "jwldba")
@Data
@NoArgsConstructor
public class dynamicSearch {

	@Id
	@Column(name = "id")
	private long id;

	@Column(name = "menu_name")
	private String menu_name;

	@Column(name = "column_name")
	private String name;

	@Column(name = "attribute_name")
	private String attribute_name;

	@Column(name = "column_type")
	private String type;
}
