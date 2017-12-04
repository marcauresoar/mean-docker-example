import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse, HttpEventType } from '@angular/common/http';

import { AccessoriesService } from '../accessories.service';

@Component({
  selector: 'app-accessories-list',
  templateUrl: './accessories-list.component.html',
  styleUrls: ['./accessories-list.component.css']
})
export class AccessoriesListComponent implements OnInit {
  list;

  constructor(private accService: AccessoriesService) { }

  ngOnInit() {
    this.accService.listImportLog().subscribe((event: HttpResponse<string>) => {
      if(event.status == 200) {
        this.list = event.body;
      }
    });
  }

}
