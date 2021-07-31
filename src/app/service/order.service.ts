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
    this.order.pizzaList.push(pizza);
    this.order.totalQuantity += pizza.quantity;
    this.order.totalPrice += pizza.price;
  }

  clearCurrOrder() {
    this.order.totalQuantity = 0;
    this.order.totalPrice = 0;
    this.order.pizzaList.length = 1;
    for(let pz of this.order.pizzaList){
      pz.size = '';
      pz.topping = '';
      pz.quantity = 0;
      pz.price = 0;
    }
  }

  removeFromOrder(pizza){
    for(let i = 0; i < this.order.pizzaList.length; i++) {
      if(this.order.pizzaList[i] == pizza){
        this.order.pizzaList.splice(i, 1);
      }
    }
  }
}
