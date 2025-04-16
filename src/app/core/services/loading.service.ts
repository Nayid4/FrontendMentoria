import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  loading = signal<boolean>(false);

  loadingGuest = signal<boolean>(false);

  show() {
    this.loading.set(true);
  }

  showGuest() {
    this.loadingGuest.set(true);
  }

  hide() {
    this.loading.set(false);
  }

  hideGuest() {
    this.loadingGuest.set(false);
  }
}
