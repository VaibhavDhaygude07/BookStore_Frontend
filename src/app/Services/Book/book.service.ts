import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpService } from '../Http/http.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private searchTextSubject = new BehaviorSubject<string>('');
searchText$ = this.searchTextSubject.asObservable();

setSearchText(value: string) {
  this.searchTextSubject.next(value);
}

  
   private get token() {
    return localStorage.getItem('token'); 
  }

  constructor(private httpclient:HttpClient, private httpService: HttpService) { }

  getAllBooks(): Observable<any> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.httpclient.get('https://localhost:7288/api/book', { headers });
  }

 searchBook(searchText: string): Observable<any> {
  const token = localStorage.getItem('token');

  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });

  return this.httpclient.get(`https://localhost:7288/api/book/search?searchText=${encodeURIComponent(searchText)}`, { headers });
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

  getBookPagination(page: number, size: number): Observable<any> {
    const token = localStorage.getItem('token');
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  
    return this.httpclient.get(`https://localhost:7288/api/book/pagination?page=${page}&size=${size}`, { headers });
  }
  
  
}