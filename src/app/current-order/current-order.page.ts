import { Component, OnInit } from '@angular/core';
import { Order, History } from '../model';
import { OrderService } from '../service/order.service';
import { AlertController } from '@ionic/angular';
import { Router}  from '@angular/router';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HistoryService } from '../service/history.service';

@Component({
  selector: 'app-current-order',
  templateUrl: './current-order.page.html',
  styleUrls: ['./current-order.page.scss'],
  providers: [DatePipe]
})
export class CurrentOrderPage implements OnInit {

  currOrder: Order;
  // m_topping: string;
  // m_size: string;
  // m_qty: number;
  m_date: Date;
  m_totalQty: number;
  m_totalPrice: number;
  history: History;
  historyList: History[];
  

  constructor(private activatedRoute: ActivatedRoute, private datePipe: DatePipe, private router: Router, public alertController: AlertController, private orderService: OrderService, public historyService: HistoryService) { }

  ngOnInit() {
    //this.m_topping = this.currOrder.
  
    this.activatedRoute.paramMap.subscribe(paramMap => {
  
      this.currOrder = this.orderService.getOrder();
      this.currOrder.pizzaList.shift();

      this.historyList = this.historyService.getHistoryList();
      this.history = this.historyService.getHistory();

      this.m_totalQty = 0;
      this.m_totalPrice = 0;
     // this.historyId = 0;
      for(let order of this.currOrder.pizzaList){
        this.m_totalQty += order.quantity;
        this.m_totalPrice += order.price;
      }
    })
  }

  async placeOrder() {

 
    //this.historyId++;
    //this.history.id = this.historyId.toString();
    this.history.totalQuantity = this.m_totalQty;
    this.history.totalPrice = this.m_totalPrice;

    this.m_date = new Date();
   // this.dateOrder = this.datePipe.transform(this.date, 'yyyy-MM-dd hh:mm:ss');

    this.history.date = this.m_date;

    this.historyService.pushHistory(this.history);
    this.historyList = this.historyService.getHistoryList();
    this.orderService.clearOrderList();
    //this..clearPizzaOrderList();

    const alert = await this.alertController.create({
      header: 'Success!!',
      message: 'Thank you for your order!',
      buttons: ['OK']
    });
    await alert.present();
    

 

    this.router.navigate(['manager']);
  }

  removeItem(pz){
    for(let i = 0; i < this.currOrder.pizzaList.length; i++) {

      if(this.currOrder.pizzaList[i] == pz){
        this.currOrder.pizzaList.splice(i, 1);
      }

    }
  }
}
