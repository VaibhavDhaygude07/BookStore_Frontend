import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RefreshService {
  cartRefreshEvent: EventEmitter<void> = new EventEmitter<void>();

  emitCartRefresh(): void {
    this.cartRefreshEvent.emit();
  }
}
