import { Component, OnInit } from '@angular/core';
import { Topping, Size, Pizza, Order} from '../model';
import { ToppingsService } from '../service/toppings.service';
import { SizesService } from '../service/sizes.service';
import { PizzaService } from '../service/pizza.service';
import { OrderService } from '../service/order.service';
import { HistoryService } from '../service/history.service';
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

  

  constructor( public alertController: AlertController,
                private router: Router, 
                private toppingsService: ToppingsService, 
                private sizeService: SizesService, 
                private pizzaService: PizzaService, 
                private orderService: OrderService,
                private historyService: HistoryService) {}

  ngOnInit(){
    // this.m_pizzaPrice = 0;
    // this.m_pizzaId = 0;
    // this.m_totalQty = 0;
    // this.m_totalPrice = 0;
    this.m_totalPrice = 0;
    this.m_totalQty = 0;
    this.toppings = this.toppingsService.getAllToppings();
    this.sizes = this.sizeService.getAllSizes();
    this.pizza = this.pizzaService.getPizza();
  //  this.order = this.orderService.getOrder();
  }

  setSize(size: string){
    this.m_size = size;
    //this.pizza.size = size;
  }

  setTopping(topping: string){
    this.m_topping = topping;
    //this.pizza.topping = topping;
  }

  setQty(quantity: number){
    this.m_qty = quantity;
    //this.pizza.quantity = quantity;
    //console.log(this.m_qty + "is clicked");
  }

  manager(){
    //this.pizzaService.clearPizza();
    this.m_size = '';
    this.m_topping = ''; 
    this.m_qty = null;
    this.router.navigate(['manager']);
  }

  reset(){
    //console.log("reset clicked");
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
    // console.log(sz);
    // console.log(this.m_tpPrice);
    // console.log(this.m_szPrice);
    this.pizza.price = this.m_price;
  }

  async addOrder(){

    if(this.m_size == '' || this.m_topping == '' || this.m_qty == 0 || this.m_qty == null){
      const alert = await this.alertController.create({
        header: 'Unsuccessful',
        message: 'Please add all the information to add the order.',
        buttons: ['OK']
      });
      await alert.present();
    }
    else{
      //setting values of pizza 
      this.pizza.size = this.m_size;
      this.pizza.topping = this.m_topping;
      this.pizza.quantity = this.m_qty;
      // console.log(this.pizza.size);
      // console.log(this.pizza.topping);
      // console.log(this.pizza.quantity);

      this.calPrice(this.pizza.topping, this.pizza.size);
       this.orderService.addToOrder(this.pizza);
      this.order = this.orderService.getOrder();
    //  console.log(this.order.pizzaList)
    
      for(let pz of this.order.pizzaList){
        // 
        this.m_totalQty += pz.quantity;
        this.m_totalPrice += pz.price;
        console.log("total qty, price " + this.m_totalQty + " " + this.m_totalPrice);
      }
      console.log( this.m_totalPrice);
      this.order.totalPrice = this.m_totalPrice;
      this.order.totalQuantity = this.m_totalQty;
      
      // this.m_totalPrice = 0;
      // this.m_totalQty = 0;
    
      // this.m_pizzaCount
    }

    const alert2 = await this.alertController.create({
      header: 'Successful',
      message: 'Your order has now ' + this.m_totalQty + ' pizzas , the total is ' + this.m_totalPrice + ' CND',
      buttons: ['OK']
    });
    await alert2.present()

    this.pizzaService.clearPizza();
    this.pizza.quantity = 0;
    this.pizza.size ='';
    this.pizza.topping ='';
    this.pizza.price = 0;
    //console.log("add clicked" + this.pizza.price);
    //console.log(this.pizza.size + " " + this.pizza.quantity + " " + this.pizza.topping + " " + this.pizza.price + " " + this.pizza.id);
    // this.pizza.size = this.m_size;
    // this.pizza.topping = this.m_topping;
    // this.pizza.quantity = this.m_qty;
    // if(this.m_size != "" && this.m_topping !="" && this.m_qty != null){
    //   this.pizzaService.newPizza(this.m_size, this.m_topping, this.m_qty);
    // }
  //  console.log(this.pizzaService.getPizza());
   // this.pizzaService.setPizza();  
  }
}
