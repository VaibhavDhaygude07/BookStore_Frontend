import { Component } from '@angular/core';
import { WishlistService } from '../../Services/Wishlist/wishlist.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-wishlist',
  standalone: false,
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent {
 wishlist: any[] = [];

  constructor(private wishlistService: WishlistService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.getWishlist();
  }



  getWishlist() {
    this.wishlistService.getWishlist().subscribe({
      next: (res: any) => {
        this.wishlist = res.data || [];
      },
      error: (err) => {
        console.error('Error fetching wishlist:', err);
        this.snackBar.open('Failed to load wishlist', '', { duration: 3000 });
      }
    });
  }

    addToWishlist(bookId: number) {
    this.wishlistService.addBookToWishlist(bookId).subscribe({
      next: (res) => {
        this.snackBar.open('Book added to wishlist!', '', { duration: 3000 });
        this.getWishlist(); 
      },
      error: (err) => {
        console.error('Add to wishlist failed:', err);
        this.snackBar.open('Failed to add to wishlist', '', { duration: 3000 });
      }
    });
  }

  removeFromWishlist(bookId: number) {
    this.wishlistService.removeFromWishlist(bookId).subscribe({
      next: () => {
        this.snackBar.open('Book removed from wishlist', '', { duration: 3000 });
        this.wishlist = this.wishlist.filter(item => item.bookId !== bookId);
      },
      error: (err) => {
        console.error('Remove failed:', err);
        this.snackBar.open('Failed to remove book', '', { duration: 3000 });
      }
    });
  }
}
