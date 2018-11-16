import { HttpHeaders } from '@angular/common/http';
import { Header } from '../models/auth.model';
import * as Storage from './storage';
const header: Header = new Header();
export const RemoveStorage = function() {
  Storage.Remove(header.user, GetRemember());
  Storage.Remove(header.remember, GetRemember());
  Storage.Remove(header.token, GetRemember());
};
export const SetStorage = function({ token, username, remember }) {
  Storage.Set(header.user, username, this.item.remember);
  Storage.Set(header.remember, remember, this.item.remember);
  Storage.Set(header.token, `Bearer ${token}`, this.item.remember);
};
export const GetStorage = function(key: string) {
  return Storage.Get(key, GetRemember());
};
export const GetRemember = function() {
  const remember = Storage.Get(header.remember, true);
  if (remember) return true;
  else return false;
};
export const isAuth = function() {
  const token = GetStorage(header.token);
  if (token) return true;
  return false;
};

export const headers: HttpHeaders = new HttpHeaders()
  // .set('Content-Type', 'application/json')
  .set('Authorization', GetStorage(header.token)) // Cookie.get('access_token')
  .set('Author', GetStorage(header.user))
  .set('Remember', GetRemember() ? 'true' : 'false');

export const options = {
  headers: headers
};
