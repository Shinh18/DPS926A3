import { Component, OnInit } from '@angular/core';
import { Order, History, Pizza } from '../model';
import { OrderService } from '../service/order.service';
import { AlertController } from '@ionic/angular';
import { Router}  from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HistoryService } from '../service/history.service';

@Component({
  selector: 'app-current-order',
  templateUrl: './current-order.page.html',
  styleUrls: ['./current-order.page.scss'],
})
export class CurrentOrderPage implements OnInit {

  m_date: Date;
  m_totalQty: number;
  m_totalPrice: number;
  history: History;
  historyList: History[];
  pizza: Pizza;
  currOrder: Order;
  
  constructor(private activatedRoute: ActivatedRoute, 
              private router: Router, 
              public alertController: AlertController, 
              private orderService: OrderService, 
              public historyService: HistoryService) { }

  ngOnInit() {

    this.activatedRoute.paramMap.subscribe(paramMap => { 
      this.currOrder = this.orderService.getOrder();
      console.log(this.currOrder);
      this.history = this.historyService.getHistory();
    })
  }

  async showAlert(){
    const alert = await this.alertController.create({
      header: 'Delete order',
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
    this.history.totalQuantity = this.currOrder.totalQuantity;
    this.history.totalPrice = this.currOrder.totalPrice;
    this.history.date = new Date();
    this.historyService.pushHistory(this.history);
    
    if(this.currOrder.pizzaList.length>1){
      const successAlert = await this.alertController.create({
        header: 'Successful!',
        message: 'Thank you for your order.',
        buttons: ['OK']
      });
      await successAlert.present();
      this.orderService.clearCurrOrder();
      this.router.navigate(['manager']);
    }
    else{
      const unsuccessAlert = await this.alertController.create({
        header: 'Unsuccessful!',
        message: 'No order present to place.',
        buttons: ['OK']
      });
      await unsuccessAlert.present();
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
