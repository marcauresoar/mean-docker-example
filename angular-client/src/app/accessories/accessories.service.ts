import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';

@Injectable()
export class AccessoriesService {

  constructor(private http: HttpClient) {}

  importFiles(brand: string, origin_file: File, sheet_file: File){
    let formdata: FormData = new FormData();

    formdata.append('brand', brand);
    formdata.append('origin_file', origin_file);
    formdata.append('sheet_file', sheet_file);

    const req = new HttpRequest('POST', 'http://localhost:3000/upload', formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }

}
