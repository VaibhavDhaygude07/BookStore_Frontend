import { Injectable } from '@angular/core';
import { HttpService } from '../Http/http.service';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  

   private get token() {
    return localStorage.getItem('token'); 
  }
    constructor(private httpService:HttpService) {
       
     }
    

     addBookToWishlist(bookId: number) {
      
      const token = localStorage.getItem('token');

    const header = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`
      }
    };
    
    return this.httpService.postMethod(`https://localhost:7288/api/wishlist?bookId=${bookId}`, {}, true, header)
  }

    getWishlist(){
      const header=
      {headers:{
          'content-type':'application/json',
           Authorization: `Bearer ${this.token}`
        }
      }
      return this.httpService.get('https://localhost:7288/api/wishlist',true,header)
    }

    removeFromWishlist(bookId:number){
      let header={
        headers:{
          'content-type':'application/json',
          Authorization: `Bearer ${this.token}`
        }
      }
      return this.httpService.delete(`https://localhost:7288/api/wishlist?bookId=${bookId}`,true,header)
    }
}
