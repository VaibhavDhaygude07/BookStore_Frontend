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

  searchBook(author: string): Observable<any> {
    const token = localStorage.getItem('token');
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  
    return this.httpclient.get(`https://localhost:7288/api/book/search?author=${encodeURIComponent(author)}`, { headers });
  }

  sortBooksByPrice(order: 'asc' | 'desc'): Observable<any> {
    const token = localStorage.getItem('token');
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  
    return this.httpclient.get(`https://localhost:7288/api/book/sort?price=${order}`, { headers });
  }

  getBookById(id: number): Observable<any> {
    const token = localStorage.getItem('token');
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.httpclient.get(`https://localhost:7288/api/book/${id}`, { headers });
  }
  
  
}