import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http:HttpClient) { }
  
  postMethod(reqUrl: string, reqData: any, token: boolean = false, httpOption: any = {}): Observable<any> {
    return this.http.post(reqUrl, reqData, token ? httpOption : {});
  }

  postMethodToken(reqUrl: string, reqData: any, token: boolean = true, httpOption: any = {}): Observable<any> {
    return this.http.post(reqUrl, reqData, token ? httpOption : {});
  }

  get(reqUrl: string, token: boolean = false, httpOption: any = {}): Observable<any> {
    return this.http.get(reqUrl, token ? httpOption : {});
  }
  

}
