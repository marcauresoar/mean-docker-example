import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpResponse, HttpEventType } from '@angular/common/http';

import { AccessoriesService } from '../accessories.service';

import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-accessories-list',
  templateUrl: './accessories-list.component.html',
  styleUrls: ['./accessories-list.component.css']
})
export class AccessoriesListComponent implements OnInit, OnDestroy {
  list;
  listSub: Subscription;

  constructor(private accService: AccessoriesService) { }

  ngOnInit() {
    this.onRefreshList();
  }

  onRefreshList() {
    this.listSub = this.accService.listImportLog().subscribe((event: HttpResponse<string>) => {
      console.log(event);
      if(event.status == 200) {
        this.list = event.body;
      }
    });
  }

  ngOnDestroy(){
    this.listSub.unsubscribe();
  }

}
