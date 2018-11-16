import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Auth, Header } from '../models/auth.model';
import { Roles } from '../models/roles.model';
import * as Storage from '../helpers/storage';
@Injectable({ providedIn: 'root' })
export class AuthService {
  _baseUrl = this.baseUrl + 'api/auth';
  options: any;
  item: Auth = new Auth();
  header: Header = new Header();
  roles: Roles = new Roles();
  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') public baseUrl: string
  ) {
    this.options = {
      headers: new HttpHeaders()
        // .set('Content-Type', 'application/json')
        .set('Authorization', this.GetStorage(this.header.token))
        .set('Author', this.GetStorage(this.header.user))
        .set('Remember', this.GetRemember() ? 'true' : 'false')
    };
  }
  CheckToken() {
    return this.http.post(this._baseUrl + 'CheckToken', this.options);
  }
  Login() {
    return this.http.post(this._baseUrl, this.item);
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
  GetUser() {
    return Storage.Get(this.header.user, this.GetRemember());
  }
  GetToken(key: string) {
    return Storage.Get(this.header.token, this.GetRemember());
  }
  isAuth() {
    const token = this.GetStorage(this.header.token);
    if (token) return true;
    return false;
  }
}
