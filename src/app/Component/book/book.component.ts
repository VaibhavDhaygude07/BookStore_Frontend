import { Component, OnInit } from '@angular/core';
import { BookService } from '../../Services/Book/book.service';

interface Book {
  id: number;
  description: string;
  discountPrice: number;
  bookImage: string;
  adminUserId: string;
  bookName: string;
  author: string;
  quantity: number;
  price: number;
  createdAtDate: Date;
  updatedAtDate: Date;
}

@Component({
  selector: 'app-book',
  standalone: false,
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss'
})
export class BookComponent {
  books: Book[] = [];
  error: any;
  searchTerm: string = '';



  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.fetchBooks();
  }

  fetchBooks(): void {
    this.bookService.getAllBooks().subscribe({
      next: (response: any) => {
        if (response && response.success && response.data) {
          this.books = response.data;
        } else {
          this.error = 'Invalid response format';
        }
      },
      error: (err) => {
        this.error = 'Failed to fetch books';
        console.error('Fetch error:', err);
      }
    });
  }

  onSearchChange(): void {
    if (this.searchTerm.trim() === '') {
      this.fetchBooks();
      return;
    }
  
    this.bookService.searchBook(this.searchTerm).subscribe({
      next: (response: any) => {
        if (response && response.success && response.data) {
          this.books = response.data;
        }
      },
      error: (err) => {
        this.error = 'Search failed';
        console.error(err);
      }
    });
  }

 
  
}
