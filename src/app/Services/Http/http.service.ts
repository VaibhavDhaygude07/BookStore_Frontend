import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http:HttpClient) { }
  
  PostMethod(reqUrl: string, reqData: any, token: boolean = false, httpOption: any = {}): Observable<any> {
    return this.http.post(reqUrl, reqData, token ? httpOption : {});
  }

  PostMethodToken(reqUrl: string, reqData: any, token: boolean = true, httpOption: any = {}): Observable<any> {
    return this.http.post(reqUrl, reqData, token ? httpOption : {});
  }

  GetMethod(reqUrl: string, token: boolean = false, httpOption: any = {}): Observable<any> {
    return this.http.get(reqUrl, token ? httpOption : {});
  }
  GetMethodToken(reqUrl: string, token: boolean = true, httpOption: any = {}): Observable<any> {
    return this.http.get(reqUrl, token ? httpOption : {});
  }
}
