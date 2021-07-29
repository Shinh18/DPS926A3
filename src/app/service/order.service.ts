import { Injectable } from '@angular/core';
import { Pizza, Order } from '../model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor() { }

  private order: Order = {
    totalQuantity: 0,
    totalPrice: 0,
    pizzaList: [{
      size: '',
      topping: '',
      quantity: 0,
      price: 0
    }]
  }

  getOrder() {
    return this.order;
  }

  addToOrder(pizza: Pizza) {
    // this.order.totalQuantity = qty;
    // this.order.totalPrice = price;
    this.order.pizzaList.push(pizza);
  }

  clearOrderList() {
    this.order = null;
  }


}
