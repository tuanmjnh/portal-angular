import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { options } from '../helpers/config';
import { ObjectToQuery } from '../helpers/common';
import { Services } from '../models/services.model';
@Injectable({ providedIn: 'root' })
export class ServicesService {
  _baseUrl = this.baseUrl + 'api/services';
  options: any = options;
  items: Services[];
  item: Services = new Services();
  app_key = '';
  query = {
    filter: '',
    flag: 1
  };
  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') public baseUrl: string
  ) {}
  select() {
    if (this.app_key)
      return this.http.get(
        `${this._baseUrl}/GetByKey/${this.app_key}${ObjectToQuery(this.query)}`,
        options
      );
    else
      return this.http.get(this._baseUrl + ObjectToQuery(this.query), options);

    // .subscribe(data => {
    //   this.items = data;
    // });
  }
  selectById(id: number) {
    return this.http.get<Services>(`${this._baseUrl}/${id}`, options);
    // .subscribe((data: Services) => {
    //   this.item = data;
    // });
  }
  insert() {
    this.item.app_key = this.app_key;
    return this.http.post(this._baseUrl, this.item, options);
  }
  update() {
    this.item.app_key = this.app_key;
    return this.http.put(`${this._baseUrl}`, this.item, options);
  }
  delete(data) {
    const _data = [];
    data.forEach(i => {
      _data.push({ group_id: i.group_id, flag: i.flag });
    });
    return this.http.put(`${this._baseUrl}/Delete`, _data, options);
  }
  remove(data) {
    const _data = [];
    data.forEach(i => {
      _data.push({ group_id: i.group_id, flag: i.flag });
    });
    return this.http.put(`${this._baseUrl}/Remove`, _data, options);
  }
  removeOne(model: Services) {
    return this.http.delete(`${this._baseUrl}/${model.group_id}`, options);
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
