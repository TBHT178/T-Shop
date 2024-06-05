import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems: CartItem[] = [];

  totalPrice : Subject<number> = new Subject<number>();

  totalQuantity : Subject<number> = new Subject<number>();
  
  constructor() { }

  addToCart(theCartItem: CartItem){
    // check if item exist in cart
    let alreadyExistsInCart : boolean = false;
    let existingCartItem : CartItem = undefined!;

    if(this.cartItems.length > 0){
      // find the item in cart base on item id
      existingCartItem = this.cartItems.find(tempCartItem => tempCartItem.id === theCartItem.id)!;
    }

    alreadyExistsInCart = (existingCartItem != undefined);

    if(alreadyExistsInCart){
      existingCartItem.quantity++;
    } else {
      this.cartItems.push(theCartItem);
    }

    // compute cart total price and total quantity
    this.computeCartTotals();

  }

  computeCartTotals() {
    let totalPriceValue : number = 0;
    let totalQuantityValue : number = 0;

    for (let currentCartItem of this.cartItems){
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;
    }

    // publish new values, all subcribers will receive the data
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    //log for degugging
    this.logCartData(totalPriceValue, totalQuantityValue);
  }

  logCartData(totalPriceValue: number, totalQuantityValue: number) {
    console.log('Contents og the cart:');
    for (let tempCartItem of this.cartItems){
      const subTotalPrice = tempCartItem.quantity * tempCartItem.unitPrice;
      console.log(`Name: ${tempCartItem.name} - Quantity: ${tempCartItem.quantity} - unitPrice: ${tempCartItem.unitPrice} - subTotalPrice: ${subTotalPrice}`);
    }
    console.log(`totalPrice: ${totalPriceValue.toFixed(2)} - totalQuantity: ${totalQuantityValue}`);
    console.log('-----------------');
  }
}
