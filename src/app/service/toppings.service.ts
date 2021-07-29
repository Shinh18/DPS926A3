import { Injectable } from '@angular/core';
import { Topping } from '../model';

@Injectable({
  providedIn: 'root'
})
export class ToppingsService {

  constructor() { }

  private toppings: Topping[] = [
    { 
      title:'vegetables',
      price: 10
    },
    {
      title:'mushrooms',
      price: 12
    },
    { 
      title:'meatballs',
      price: 14
    },
    {
      title:'pepperoni',
      price: 16
    }
  ];

   getAllToppings() {
     return [...this.toppings];
   }

   getTopping(tp){
     return {...this.toppings.find(
       topping => { return topping.title === tp; }
       )
     }
    }

    getToppingPrice(tp){
      for(let topping of this.toppings){
        if(topping.title === tp)
          return topping.price;
      }
    }
}
