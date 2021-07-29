import { Injectable } from '@angular/core';
import { Pizza } from '../model';

@Injectable({
  providedIn: 'root'
})
export class PizzaService {

  constructor() { }

  private pizza: Pizza = {
    size: '',
    topping: '',
    quantity: 0,
    price: 0
  }

  getPizza(){
    return this.pizza;
  }

  clearPizza() {
    this.pizza.size = '';
    this.pizza.topping = '';
    this.pizza.quantity = 0;
    this.pizza.price = 0;
  }
}
