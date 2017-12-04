import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { HttpClient, HttpResponse, HttpEventType } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AccessoriesService } from '../accessories.service';

@Component({
  selector: 'app-accessories-form',
  templateUrl: './accessories-form.component.html',
  styleUrls: ['./accessories-form.component.css']
})
export class AccessoriesFormComponent implements OnInit {
  brands: any[] = [
    { id: 'fiat', name: 'Fiat' },
    { id: 'jeep', name: 'Jeep' },
  ];

  initialBrand = this.brands[0];

  accessoriesForm: FormGroup;

  origin_file: File;
  sheet_file: File;

  showProgress: boolean = false;
  progress: number = 50.0;
  showMessage: boolean = false;
  message: string = 'Uploading files...';

  constructor(private accService: AccessoriesService) { }

  ngOnInit() {
    this.accessoriesForm = new FormGroup({
      'brand': new FormControl(this.initialBrand.id, Validators.required),
      'origin_file': new FormControl(''),
      'sheet_file': new FormControl(''),
    });
  }

  selectOriginFile(event) {
    this.origin_file = event.target.files[0];
  }

  selectSheetFile(event) {
    this.sheet_file = event.target.files[0];
  }

  onSubmit(){
    this.reset();

    if(this.origin_file == null) {
      this.showMessage = true;
      this.message = 'Please, select a file for Car model file.'
      return;
    }

    if(this.sheet_file == null) {
      this.showMessage = true;
      this.message = 'Please, select a file for Accessories spreadsheet.'
      return;
    }

    this.showProgress = true;
    this.showMessage = true;
    this.message = 'Uploading files...';
    const brand = this.accessoriesForm.get('brand').value;
    this.accService.importFiles(brand, this.origin_file, this.sheet_file).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        this.message = (<HttpResponse<string>>event).body;
      } else {
        this.message = 'An error has occurred!';
        this.showProgress = false;
      }
    });
  }

  onClear(){
    this.accessoriesForm.reset();
    this.accessoriesForm.get('brand').setValue(this.brands[0].id);
    this.origin_file = null;
    this.sheet_file = null;
    this.reset();
  }

  reset(){
    this.showProgress = false;
    this.showMessage = false;
    this.progress = 0.0;
    this.message = '';
  }


}
