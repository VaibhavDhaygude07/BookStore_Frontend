import { Component } from '@angular/core';
import { BookService } from '../../Services/Book/book.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  searchTerm: string = '';
  username: string = 'User';
  dropdownOpen: boolean = false;


  constructor(private router: Router,private bookService: BookService) {}

  ngOnInit(): void {
    const storedName = localStorage.getItem('username');
    if (storedName) {
      this.username = storedName;
    }
  }

   
onSearchChange(event: any) {
  this.bookService.setSearchText(event.target.value);
}

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/auth']);
  }

  goToWishlist(): void {
  this.router.navigate(['/wishlist']);
  this.dropdownOpen = false; 
}

}
