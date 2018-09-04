import { HttpHeaders } from '@angular/common/http';
let headers: HttpHeaders = new HttpHeaders()
  // .set('Content-Type', 'application/json')
  .set('Authorization', 'Bearer ' + '') // Cookie.get('access_token')
  .set('Author', 'Admin')
  .set('Remember', 'true');
export const options = {
  headers: headers
};
