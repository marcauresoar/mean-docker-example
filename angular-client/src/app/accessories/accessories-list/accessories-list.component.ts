import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accessories-list',
  templateUrl: './accessories-list.component.html',
  styleUrls: ['./accessories-list.component.css']
})
export class AccessoriesListComponent implements OnInit {
  list: number[] = [1,2,3];

  constructor() { }

  ngOnInit() {
  }

}
