import { Component, OnInit } from '@angular/core';
import { Router}  from '@angular/router';
import { OrderService } from '../service/order.service';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.page.html',
  styleUrls: ['./manager.page.scss'],
})
export class ManagerPage implements OnInit {

  constructor(private router: Router,
              private orderService: OrderService) { }

  ngOnInit() { }

  newOrder(){
    this.orderService.clearCurrOrder();
    this.router.navigate(['home']);
  }
}
