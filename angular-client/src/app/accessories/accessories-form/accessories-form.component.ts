import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-accessories-form',
  templateUrl: './accessories-form.component.html',
  styleUrls: ['./accessories-form.component.css']
})
export class AccessoriesFormComponent implements OnInit {
  brands: any[] = [
    { id: 'fiat', name: 'Fiat', models: [
        { id: '358', name: 'Argo' },
        { id: '195', name: 'Uno' },
        { id: '226', name: 'Toro' }
    ] },
    { id: 'jeep', name: 'Jeep', models: [
        { id: 'compass', name: 'Compass' },
        { id: 'renegade', name: 'Renegade' }
    ] },
  ];

  models: any[] = this.brands[0].models;

  initialBrand = this.brands[0];
  initialModel = this.brands[0].models[0];

  accessoriesForm: FormGroup;

  origin_file: File;
  sheet_file: File;

  constructor() { }

  ngOnInit() {
    this.accessoriesForm = new FormGroup({
      'brand': new FormControl(this.initialBrand.id, Validators.required),
      'model': new FormControl(this.initialModel.id, Validators.required),
      'origin_file': new FormControl(''),
      'sheet_file': new FormControl(''),
    });

    console.log(this.accessoriesForm);
  }

  onChangeBrand(event){
    const index = event.target.selectedIndex;
    this.models = this.brands[index].models;
    this.accessoriesForm.get('model').setValue(this.models[0].id);
  }

  selectOriginFile(event) {
    this.origin_file = event.target.files[0];
    console.log(this.origin_file);
  }

  selectSheetFile(event) {
    this.sheet_file = event.target.files[0];
  }



}
