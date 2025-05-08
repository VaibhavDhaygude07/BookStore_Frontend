import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  searchTerm: string = '';

  onSearchChange(event: any): void {
    const input = event.target as HTMLInputElement;
    this.searchTerm = input.value;
  }

}
