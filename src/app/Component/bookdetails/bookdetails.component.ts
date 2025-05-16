import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../../Services/Book/book.service';
import { CartService } from '../../Services/Cart/cart.service';
import { WishlistService } from '../../Services/Wishlist/wishlist.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  selector: 'app-bookdetails',
  standalone: false,
  templateUrl: './bookdetails.component.html',
  styleUrl: './bookdetails.component.scss'
})
export class BookdetailsComponent implements OnInit {
  book: any;
  error: string | null = null;
  isAddedToBag: boolean = false;
  quantity: number = 1;


  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private cartService: CartService,
      private wishlistService: WishlistService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const bookId = Number(this.route.snapshot.paramMap.get('id'));
    if (bookId) {
      this.bookService.getBookById(bookId).subscribe({
        next: (res) => {
          if (res.success && res.data) {
            this.book = res.data;
            console.log('Book details:', this.book);
          } else {
            this.error = res.message || 'Book not found.';
          }
        },
        error: (err) => {
          this.error = 'Failed to load book.';
          console.error(err);
        }
      });
    } else {
      this.error = 'Invalid book ID';
    }
  }

  addToBag(): void {
    if (!this.book || !this.book.id) return;

    const reqData = {
      bookId: this.book.id
    };

    this.cartService.addBookToCart(reqData).subscribe({
      next: () => {
        this.isAddedToBag = true;
        this.quantity = 1;
        console.log('Book added to cart');
      },
      error: (err) => {
        console.error('Error adding to cart:', err);
        this.error = 'Could not add to cart.';
      }
    });
  }

  increaseQuantity(): void {
    if (this.book && this.quantity < this.book.quantity) {
      const reqData = {
        bookId: this.book.id
      };

      this.cartService.addBookToCart(reqData).subscribe({
        next: () => {
          this.quantity++;
          console.log('Quantity increased:', this.quantity);
        },
        error: (err) => {
          console.error('Error increasing quantity:', err);
        }
      });
    }
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

 addToWishlist(): void {
  if (!this.book || !this.book.id) return;

  this.wishlistService.addBookToWishlist(this.book.id).subscribe({
    next: () => {
      this.snackBar.open('Book added to wishlist!', '', { duration: 3000 });
      console.log('Book added to wishlist');
    },
    error: (err) => {
      console.error('Error adding to wishlist:', err);
      this.snackBar.open('Could not add to wishlist.', '', { duration: 3000 });
    }
  });
}

}
