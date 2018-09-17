import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ObjectToQuery } from '../helpers/common';
import { Services } from '../models/services.model';
import { AuthService } from './auth.service';
@Injectable({ providedIn: 'root' })
export class ServicesService {
  _baseUrl = this.baseUrl + 'api/services';
  items: Services[];
  item: Services = new Services();
  app_key = '';
  query = {
    filter: '',
    flag: 1
  };
  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') public baseUrl: string,
    public _auth: AuthService
  ) {}
  select() {
    if (this.app_key)
      return this.http.get(
        `${this._baseUrl}/GetByKey/${this.app_key}${ObjectToQuery(this.query)}`,
        this._auth.options
      );
    else
      return this.http.get(
        this._baseUrl + ObjectToQuery(this.query),
        this._auth.options
      );

    // .subscribe(data => {
    //   this.items = data;
    // });
  }
  selectById(id: number) {
    return this.http.get<Services>(
      `${this._baseUrl}/${id}`,
      this._auth.options
    );
    // .subscribe((data: Services) => {
    //   this.item = data;
    // });
  }
  insert() {
    this.item.app_key = this.app_key;
    return this.http.post(this._baseUrl, this.item, this._auth.options);
  }
  update() {
    this.item.app_key = this.app_key;
    return this.http.put(`${this._baseUrl}`, this.item, this._auth.options);
  }
  delete(data) {
    const _data = [];
    data.forEach(i => {
      _data.push({ group_id: i.group_id, flag: i.flag });
    });
    return this.http.put(`${this._baseUrl}/Delete`, _data, this._auth.options);
  }
  remove(data) {
    const _data = [];
    data.forEach(i => {
      _data.push({ group_id: i.group_id, flag: i.flag });
    });
    return this.http.put(`${this._baseUrl}/Remove`, _data, this._auth.options);
  }
  removeOne(model: Services) {
    return this.http.delete(
      `${this._baseUrl}/${model.group_id}`,
      this._auth.options
    );
  }
  pushItems(item) {
    return new Promise((resolve, reject) => {
      this.items.push(item);
      console.log(this.items);
    });
  }
  UpdateItems() {
    return new Promise((resolve, reject) => {
      const index = this.items.findIndex(
        x => x.group_id === this.item.group_id
      );
      this.items.splice(index, 1, this.item);
    });
  }
}
