import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-accessories-list-item',
  templateUrl: './accessories-list-item.component.html',
  styleUrls: ['./accessories-list-item.component.css']
})
export class AccessoriesListItemComponent implements OnInit {
  @Input() item: any;

  constructor() { }

  ngOnInit() {
  }

}
