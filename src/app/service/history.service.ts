import { Injectable } from '@angular/core';
import { History } from '../model';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  constructor() { }

  private history: History = {
    totalPrice: 0,
    totalQuantity: 0,
    pizzaList: [{
    size: '',
    topping: '',
    quantity: 0,
    price: 0
    }],
  date: new Date()
  };
  
  private historyList: History[] = [{
    totalPrice: 0,
    totalQuantity: 0,
    pizzaList: [{
      size: '',
      topping: '',
      quantity: 0,
      price: 0
    }],
    date: new Date()
  }];

  getHistoryList() {
    return [...this.historyList];
  }
  getHistory(){
    return this.history;
  }
  pushHistory(history: History){
    this.historyList.push(history);
  }
}
