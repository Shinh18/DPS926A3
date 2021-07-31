import { Component, OnInit } from '@angular/core';
import { Order, History, Pizza } from '../model';
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
  pizza: Pizza;
  

  constructor(private activatedRoute: ActivatedRoute, private datePipe: DatePipe, private router: Router, public alertController: AlertController, private orderService: OrderService, public historyService: HistoryService) { }

  ngOnInit() {
    //this.m_topping = this.currOrder.
  
    this.activatedRoute.paramMap.subscribe(paramMap => {
  
      this.currOrder = this.orderService.getOrder();
     // this.currOrder.pizzaList.shift();
      console.log(this.currOrder);
      // console.log("this is currOrder " + this.currOrder.totalPrice + " " + this.currOrder.totalQuantity + " ");
      // for(let pz of this.currOrder.pizzaList) {
      //   console.log(pz.size + " " + pz.quantity + " " + pz.price + " " + pz.topping);
      //   console.log("next pizza");
      // }
      // this.currOrder.pizzaList.shift();

    //   this.historyList = this.historyService.getHistoryList();
      this.history = this.historyService.getHistory();

    //   this.m_totalQty = 0;
    //   this.m_totalPrice = 0;
    // //  // this.historyId = 0;
    //   for(let order of this.currOrder.pizzaList){
    //     this.m_totalQty += order.quantity;
    //     this.m_totalPrice += order.price;
    //   }
    })
  }

  async showAlert(){
    const alert = await this.alertController.create({
      header: 'Remove from current order',
      message: 'Do you want to remove this item from your order?',
      buttons: [{
        text: 'Yes',
        handler: () => {
          this.orderService.removeFromOrder(this.pizza);
        }
      }, 'No']
    });
    await alert.present();
  }

  async placeOrder() {

 
    //this.historyId++;
    //this.history.id = this.historyId.toString();
    this.history.totalQuantity = this.currOrder.totalQuantity;
    this.history.totalPrice = this.currOrder.totalPrice;
    this.history.date = new Date();
    this.historyService.pushHistory(this.history);
    
   //this.m_date = new Date();
   // this.dateOrder = this.datePipe.transform(this.date, 'yyyy-MM-dd hh:mm:ss');

    //this.history.date = this.m_date;

    // this.historyService.pushHistory(this.history);
    // this.historyList = this.historyService.getHistoryList();
    //this.orderService.clearOrderList();
    //this..clearPizzaOrderList();

    if(this.currOrder.pizzaList.length>0){
      const alert = await this.alertController.create({
        header: 'Successful',
        message: 'Thank you for your order!',
        buttons: ['OK']
      });
      await alert.present();
      this.router.navigate(['manager']);
    }
    else{
      const alert = await this.alertController.create({
        header: 'Unsuccessful',
        message: 'No order present to place',
        buttons: ['OK']
      });
      await alert.present();
    }
    

 

    
  }

  removeItem(pz){
    for(let i = 0; i < this.currOrder.pizzaList.length; i++) {

      if(this.currOrder.pizzaList[i] == pz){
        this.currOrder.pizzaList.splice(i, 1);
      }

    }
  }
}
