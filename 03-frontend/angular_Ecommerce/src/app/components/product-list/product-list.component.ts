import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../common/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  currentCategoryName: string = '';
  searchMode: boolean = false;

  // properties for pagination
  thePageNumber: number = 1;
  thePageSize: number = 5;
  theTotalElements: number = 0;

  previousKeyword: String = '';

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if (this.searchMode) {
      this.handleSearchProducts();
    } else {
      this.handleListProducts();
    }
  }

  handleSearchProducts() {
    const theKeyword: String = this.route.snapshot.paramMap.get('keyword')!;

    //if have different keyword, set thePageNumber to 1
    if (this.previousKeyword != theKeyword) {
      this.thePageNumber = 1;
    }

    this.previousKeyword = theKeyword;

    console.log(
      `keyword = ${theKeyword} - thePageNumber = ${this.thePageNumber}`
    );

    this.productService
      .searchProductPaginate(
        this.thePageNumber - 1,
        this.thePageSize,
        theKeyword
      )
      .subscribe(this.processResult());
  }

  handleListProducts() {
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      //get param 'id' and convert to the number using "+" symbol
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
      // get the "name" param string
      this.currentCategoryName = this.route.snapshot.paramMap.get('name')!;
    } else {
      //default to category 1
      this.currentCategoryId = 1;
      this.currentCategoryName = 'Books';
    }

    //if have different categoryId, set thePageNumber to 1
    if (this.previousCategoryId != this.currentCategoryId) {
      this.thePageNumber = 1;
    }
    this.previousCategoryId = this.currentCategoryId;
    console.log(
      `${this.currentCategoryId} - thePageNumber = ${this.thePageNumber}`
    );

    this.productService
      .getProductListPaginate(
        this.thePageNumber - 1,
        this.thePageSize,
        this.currentCategoryId
      )
      .subscribe(this.processResult());
  }

  updatePageSize(pageSize: String) {
    this.thePageSize = +pageSize;
    this.thePageNumber = 1;
    this.listProducts();
  }

  processResult(){
    return (data : any) =>{
      this.products = data._embedded.products;
      this.thePageNumber = data.page.number + 1;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
    };
  }

  addToCart(theProduct: Product){
    console.log(`Adding to cart: ${theProduct.name} - ${theProduct.unitPrice}`);
  }
}
