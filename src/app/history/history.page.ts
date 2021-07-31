import { Component, OnInit } from '@angular/core';
import { HistoryService } from '../service/history.service';
import { History } from '../model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {

  historyList: History[];
  constructor(private activatedRoute: ActivatedRoute,
              private historyService: HistoryService) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      this.historyList = this.historyService.getHistoryList();
    })
  }
}
