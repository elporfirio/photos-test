import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class PhotosService {
  private api = 'http://jsonplaceholder.typicode.com/';
  constructor(private _http: HttpClient) { }

  getPhotos(){
    return this._http.get(`${this.api}photos`);
  }
}
