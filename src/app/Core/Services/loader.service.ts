import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

//Injectable Needed For This Service Available Globally
//Like Only One Instance Singleton
//You Don't want any multiple loaders every where we need one loader every time called one each API call so create this service and inject it globally ok
@Injectable({
  providedIn: 'root',
})
export class loaderService {
  private loading = new BehaviorSubject<boolean>(false);

  //I will convert this to asObservable means child component cannot able to direct changed it ok
  loading$ = this.loading.asObservable();

  show() {
    this.loading.next(true);
  }

  hide() {
    this.loading.next(false);
  }
}
