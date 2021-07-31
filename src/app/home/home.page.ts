import { Component, OnInit } from '@angular/core';
import { Topping, Size, Pizza, Order} from '../model';
import { ToppingsService } from '../service/toppings.service';
import { SizesService } from '../service/sizes.service';
import { PizzaService } from '../service/pizza.service';
import { OrderService } from '../service/order.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit{
  m_size : string;
  m_topping : string;
  m_qty : number;
  m_price : number;
  m_tpPrice : number;
  m_szPrice : number 
  m_totalQty : number;
  m_totalPrice : number;
  toppings : Topping[];
  sizes : Size[];
  pizza : Pizza;
  order : Order;

  constructor(public alertController: AlertController,
              private router: Router, 
              private toppingsService: ToppingsService, 
              private sizeService: SizesService, 
              private pizzaService: PizzaService, 
              private orderService: OrderService) {}

  ngOnInit(){
  
    this.m_totalPrice = 0;
    this.m_totalQty = 0;
    this.toppings = this.toppingsService.getAllToppings();
    this.sizes = this.sizeService.getAllSizes();
    this.pizza = this.pizzaService.getPizza();
  }

  setSize(size: string){
    this.m_size = size;
  }

  setTopping(topping: string){
    this.m_topping = topping;
  }

  setQty(quantity: number){
    this.m_qty = quantity;
  }

  manager(){
    this.m_size = '';
    this.m_topping = ''; 
    this.m_qty = null;
    this.router.navigate(['manager']);
  }

  reset(){
    this.m_qty = null;
    this.m_size = '';
    this.m_topping = '';
    this.pizza.size = null;
    this.pizza.topping = null;
    this.pizza.quantity = null;
  }

  calPrice(tp, sz){  
    this.m_tpPrice = this.toppingsService.getToppingPrice(tp);
    this.m_szPrice = this.sizeService.getSizePrice(sz);
    this.m_price = this.m_tpPrice + this.m_szPrice;
    if(this.pizza.quantity > 1){
      this.m_price += this.pizza.quantity;
    }
    this.pizza.price = this.m_price;
  }

  async addOrder(){

    if(this.m_size == '' || this.m_topping == '' || this.m_qty == 0 || this.m_qty == null){
      const unsuccessAlert = await this.alertController.create({
        header: 'Unsuccessful!',
        message: 'Please add all the information to add the order.',
        buttons: ['OK']
      });
      await unsuccessAlert.present();
    }
    else{
      this.pizza.size = this.m_size;
      this.pizza.topping = this.m_topping;
      this.pizza.quantity = this.m_qty;
      this.calPrice(this.pizza.topping, this.pizza.size);
      this.orderService.addToOrder(Object.assign({}, this.pizza));
      this.order = this.orderService.getOrder();

      const successAlert = await this.alertController.create({
        header: 'Successful!',
        message: 'Your order has now ' + this.order.totalQuantity + ' pizzas, the total is ' + this.order.totalPrice + 'CND',
        buttons: ['OK']
      });
      await successAlert.present()

      this.m_qty = null;
      this.m_size = "";
      this.m_topping = "";
      console.log(this.order);
    }
  }
}
