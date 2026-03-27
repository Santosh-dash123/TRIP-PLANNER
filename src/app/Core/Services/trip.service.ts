import { API_CONFIG } from '../Constants/Constant';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TripCreate } from '../../Models/trip.model';

@Injectable({
  providedIn: 'root',
})
export class tripService {
  constructor(private http: HttpClient) {}

  //Create Trip API
  createTrip(data: TripCreate): Observable<any> {
    return this.http.post(
      `${API_CONFIG.BASE_URL}${API_CONFIG.TRIP.CreateTrip}`,
      data,
    );
  }
}
