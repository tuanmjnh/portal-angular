import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { options } from '../helpers/config';
import { Auth, Header } from '../models/auth.model';
import { Roles } from '../models/roles.model';
import * as Storage from '../helpers/storage';
@Injectable({ providedIn: 'root' })
export class AuthService {
  _baseUrl = this.baseUrl + 'api/auth';
  options: any = options;
  item: Auth = new Auth();
  header: Header = new Header();
  roles: Roles = new Roles();
  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') public baseUrl: string
  ) {}
  CheckToken() {
    return this.http.post(this._baseUrl + 'CheckToken', this.options);
  }
  Login() {
    return this.http.post(this._baseUrl, this.item, this.options);
  }
  Logout() {
    Storage.Remove(this.header.user, this.GetRemember());
    Storage.Remove(this.header.remember, this.GetRemember());
    Storage.Remove(this.header.token, this.GetRemember());
  }
  SetStorage(token: string) {
    Storage.Set(this.header.user, this.item.username, this.item.remember);
    Storage.Set(this.header.remember, this.item.remember, this.item.remember);
    Storage.Set(this.header.token, `Bearer ${token}`, this.item.remember);
  }
  GetRemember() {
    const remember = Storage.Get(this.header.remember, true);
    if (remember) this.item.remember = true;
    else this.item.remember = false;
    return this.item.remember;
  }
  GetStorage(key: string) {
    return Storage.Get(key, this.GetRemember());
  }
  isAuth() {
    const token = this.GetStorage(this.header.token);
    if (token) return true;
    return false;
  }
}
