import { Component, OnInit } from '@angular/core';
import { expensesService } from '../../Core/Services/expenses.service';
import { Expense } from '../../Models/expense.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AuthService } from '../../Core/Services/auth.service';

@Component({
  selector: 'app-admin',
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent {
  constructor(
    public expenseService: expensesService,
    private authService: AuthService,
    private router: Router,
  ) {}

  expense: Expense = {
    TripId: 0,
    AddedBy: 0,
    ItemName: null,
    ItemTypeId: 0,
    Amount: 0,
  };

  itemTypes: any[] = [];

  ngOnInit(): void {
    this.loadItemTypes();
  }

  loadItemTypes() {
    this.expenseService.getItemTypes().subscribe({
      next: (res: any) => {
        this.itemTypes = res;
      },
      error: () => {},
    });
  }

  saveExpenses() {
    if (
      !this.expense.ItemName ||
      this.expense.ItemTypeId == 0 ||
      !this.expense.Amount
    ) {
      Swal.fire('Error', 'Item Name, Type, Amount is required.', 'error');
      return;
    }

    const tripId = this.authService.getTripId();
    const userId = this.authService.getUserId();

    if (!tripId || !userId) {
      Swal.fire('Error', 'User or Trip not found', 'error');
      return;
    }

    this.expense.TripId = tripId;
    this.expense.AddedBy = userId;

    const payload = {
      TripId: this.expense.TripId,
      AddedBy: this.expense.AddedBy,
      ItemName: this.expense.ItemName,
      ItemTypeId: this.expense.ItemTypeId,
      Amount: this.expense.Amount,
    };

    this.expenseService.addExpenses(payload).subscribe({
      next: (res) => {
        Swal.fire('Success', res, 'success');
        this.resetForm();
        this.router.navigate(['/dashboardlayout/member']);
      },
      error: (err) => {
        Swal.fire('Error', err, 'error');
      },
    });
  }

  resetForm() {
    this.expense = {
      TripId: 0,
      AddedBy: 0,
      ItemName: null,
      ItemTypeId: 0,
      Amount: 0,
    };
  }
}
