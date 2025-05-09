import { Component } from '@angular/core';
import { BookService } from '../../Services/Book/book.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  searchTerm: string = '';
  bookService: any;
  

  onSearchChange(event: any) {
    this.bookService.setSearchText(event.target.value);
  }
  

}
