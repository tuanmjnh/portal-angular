import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class TransferDataService {
  private options = {
    headers: new HttpHeaders().set(
      'Authorization',
      'Bearer ' + '' // Cookie.get('access_token')
    )
  };
  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string
  ) {}
  transfer(table: string): Promise<Object> {
    return this.http
      .post(
        this.baseUrl + 'api/TransferData/TransferDataCuoc/' + table, // 'http://localhost:5000/TransferData',
        null,
        this.options
      )
      .toPromise();
    // return this.http
    //   .post(
    //     'http://localhost:5000/TransferData/TransferDataCuoc/groups',
    //     null,
    //     this.options
    //   )
    //   .toPromise();
  }
  // getRx(): Promise<Rx[]> {
  //   return this.http
  //     .get(this.rxUrl, {
  //       observe: 'response',
  //       headers: new HttpHeaders().set(
  //         'Authorization',
  //         'Bearer ' + Cookie.get('access_token')
  //       )
  //     })
  //     .toPromise()
  //     .then(this.extractData)
  //     .catch(err => {
  //       return Promise.reject(err.error || 'Server error');
  //     });
  // }
}
