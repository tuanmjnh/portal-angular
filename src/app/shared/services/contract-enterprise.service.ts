import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ObjectToQuery } from '../helpers/common';
import { ContractEnterprise } from '../models/contract-enterprise.model';
import { AuthService } from './auth.service';
@Injectable({ providedIn: 'root' })
export class ContractEnterpriseService {
  _baseUrl = this.baseUrl + 'api/ContractEnterprise';
  items: ContractEnterprise[];
  item: ContractEnterprise = new ContractEnterprise();
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
    return this.http.get(
      this._baseUrl + ObjectToQuery(this.query),
      this._auth.options
    );

    // .subscribe(data => {
    //   this.items = data;
    // });
  }
  selectById(id: number) {
    return this.http.get<ContractEnterprise>(
      `${this._baseUrl}/${id}`,
      this._auth.options
    );
    // .subscribe((data: Services) => {
    //   this.item = data;
    // });
  }
  insert() {
    return this.http.post(this._baseUrl, this.item, this._auth.options);
  }
  update() {
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
    console.log(_data);
    return this.http.put(`${this._baseUrl}/Remove`, _data, this._auth.options);
  }
  removeOne(model: ContractEnterprise) {
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
