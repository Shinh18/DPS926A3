import { Component, OnInit } from '@angular/core';
import { Router}  from '@angular/router';
import { OrderService } from '../service/order.service';
import { PizzaService } from '../service/pizza.service';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.page.html',
  styleUrls: ['./manager.page.scss'],
})
export class ManagerPage implements OnInit {

  constructor( private router: Router, private orderService: OrderService, private pizzaService: PizzaService ) { }

  ngOnInit() {
  }

  newOrder(){
    this.orderService.clearCurrOrder();
    //this.orderService.clearOrderList();
   // this.pizzaService.clearPizza();
    this.router.navigate(['home']);
  }
}
