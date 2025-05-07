import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpService } from '../Http/http.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  token: any;

  constructor(private httpclient:HttpClient, private httpService: HttpService) { }

  getAllBooks(): Observable<any> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.httpclient.get('https://localhost:7288/api/book', { headers });
  }

  searchBook(auther: string): Observable<any> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.httpclient.get(`https://localhost:7288/api/book/search/${auther}`, { headers });
  }
}