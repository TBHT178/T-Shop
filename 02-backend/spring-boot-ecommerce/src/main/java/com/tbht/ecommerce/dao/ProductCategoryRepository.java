package com.tbht.ecommerce.dao;

import com.tbht.ecommerce.entity.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;


@RepositoryRestResource(collectionResourceRel = "productCategory", path = "product-category")   //productCategory is name of json entry
public interface ProductCategoryRepository extends JpaRepository<ProductCategory, Long> {
}
