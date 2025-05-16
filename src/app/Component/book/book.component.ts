import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
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
  @Input() searchTerm: string = '';
  books: Book[] = [];
  error: any;
 



  constructor(private bookService: BookService) {}

  ngOnInit(): void {
  this.fetchBooks();

  this.bookService.searchText$.subscribe((term: string) => {
    const trimmedTerm = term.trim();
    if (trimmedTerm.length > 0) {
      this.searchBooks(trimmedTerm);
    } else {
      this.fetchBooks();
    }
  });
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

    searchBooks(term: string): void {
    this.bookService.searchBook(term).subscribe({
      next: (res: any) => {
        this.books = res.data || [];
      },
      error: () => {
        this.error = 'Search failed';
      }
    });
  }


  sortBooks(order: 'asc' | 'desc'): void {
    this.bookService.sortBooksByPrice(order).subscribe({
      next: (res: any) => {
        if (res.success && res.data) {
          this.books = res.data;
        } else {
          this.books = [];
        }
      },
      error: (err) => {
        this.error = 'Sort failed';
        console.error(err);
      }
    });
  }

  onSortChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const sortOrder = selectElement.value;
  
    if (sortOrder === 'asc' || sortOrder === 'desc') {
      this.sortBooks(sortOrder);
    }
  }
   
}
