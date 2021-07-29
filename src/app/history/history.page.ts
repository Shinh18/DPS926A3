import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { HistoryService } from '../service/history.service';
import { History } from '../model';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {

  historyList: History[];
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private historyService: HistoryService, public alertController: AlertController) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
    this.historyList = this.historyService.getHistoryList();
    this.historyList.shift();
  })
  }

}
