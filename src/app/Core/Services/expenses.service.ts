import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../Constants/Constant';
import { Observable } from 'rxjs';
import { Expense } from '../../Models/expense.model';

@Injectable({
  providedIn: 'root',
})
export class expensesService {
  constructor(private http: HttpClient) {}

  addExpenses(data: Expense): Observable<any> {
    return this.http.post(
      `${API_CONFIG.BASE_URL}${API_CONFIG.EXPENSE.AddExpense}`,
      data,
      { responseType: 'text' },
    );
  }

  getItemTypes(): Observable<any> {
    return this.http.get(
      `${API_CONFIG.BASE_URL}${API_CONFIG.EXPENSE.GetItemTypes}`,
    );
  }

  getTripSummary(tripId: number) {
    return this.http.get(`${API_CONFIG.BASE_URL}/expense/summary/${tripId}`);
  }
}
