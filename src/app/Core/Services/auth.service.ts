import { API_CONFIG } from '../Constants/Constant';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from '../../Models/login.request.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  //This Service For Called Login API
  login(data: LoginRequest): Observable<any> {
    return this.http.post(
      `${API_CONFIG.BASE_URL}${API_CONFIG.AUTH.Login}`,
      data,
    );
  }

  //SaveToken Code
  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  //Get Token Code
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  //LogOut Code
  logout() {
    localStorage.removeItem('token');
  }

  private getDecodeToken(): any {
    const token = this.getToken();
    if (!token) return null;

    try {
      return JSON.parse(atob(token.split('.')[1])); //Get Payload Value Only
    } catch {
      return null;
    }
  }

  getUserId(): number | null {
    const payload = this.getDecodeToken();
    return payload?.userId ? Number(payload.userId) : null;
  }

  getTripId(): number | null {
    const payload = this.getDecodeToken();
    return payload?.tripId ? Number(payload.tripId) : null;
  }

  //Get User Role
  getUserRole(): string | null {
    const token = this.getToken();
    if (!token) return null;

    const payload = JSON.parse(atob(token.split('.')[1]));
    return (
      payload.Role ||
      payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
    );
  }

  //Check User Token Is Valid Or Not
  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
