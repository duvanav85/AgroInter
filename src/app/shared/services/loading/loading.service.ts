import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  requestQueue: Map<string, boolean> = new Map<string, boolean>();

  setLoading(loading: boolean, url: string): void {
    if (!url) {
      throw new Error('The request URL must be provided to the LoadingService.setLoading function');
    }

    if (loading === true) {
      this.requestQueue.set(url, loading);
      this.loading$.next(true);
    } else if (loading === false && this.requestQueue.has(url)) {
      this.requestQueue.delete(url);
    }

    if (this.requestQueue.size === 0) {
      this.loading$.next(false);
    }
  }

  Loading(loading: boolean): void {
    this.loading$.next(loading);
  }
}
