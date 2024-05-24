import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../common/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrl: './product-list.component.css'
})

export class ProductListComponent {

  products: Product[] = [];
  currentCategoryId: number = 1;
  currentCategoryName: string = "";

  constructor(private productService: ProductService,
              private route: ActivatedRoute){}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts(){
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if(hasCategoryId){
      //get param 'id' and convert to the number using "+" symbol
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
       // get the "name" param string
       this.currentCategoryName = this.route.snapshot.paramMap.get('name')!;
    }else{
      //default to category 1
      this.currentCategoryId = 1;
      this.currentCategoryName = 'Books';
    }

    this.productService.getProductList(this.currentCategoryId).subscribe(
      data => {
        this.products = data;
      }
    )
  }
}
