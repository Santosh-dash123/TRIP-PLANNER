import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MemberUI, TripCreate } from '../../Models/trip.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { tripService } from '../../Core/Services/trip.service';
import { AuthService } from '../../Core/Services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-super-admin',
  imports: [FormsModule, CommonModule],
  templateUrl: './super-admin.component.html',
  styleUrl: './super-admin.component.css',
})
export class SuperAdminComponent {
  constructor(
    private http: HttpClient,
    private tripService: tripService,
    private authService: AuthService,
  ) {
    this.trip.CreatedBy = this.authService.getUserId()!;
  }

  //Omit removes Members from trip create model
  trip: Omit<TripCreate, 'Members'> = {
    TripName: '',
    Location: '',
    TripDate: '',
    CreatedBy: 0,
  };

  //Empty Array For Member UI
  members: MemberUI[] = [];

  //Add Member Row
  addMemberRow() {
    if (this.members.length > 0) {
      const last = this.members[this.members.length - 1];
      if (!last.Name || !last.Email || !last.Address || !last.Role) {
        Swal.fire(
          'Error',
          'Please fill all fields in the last member row before adding new one.',
          'warning',
        );
        return;
      }
    }
    this.members.push({
      Name: '',
      Email: '',
      Address: '',
      Role: 'Member',
      isEdit: true,
    });
  }

  //Edit Member Row
  editMemberRow(index: number) {
    this.members[index].isEdit = true;
  }

  //Update Member Row
  updateMemberRow(index: number) {
    const m = this.members[index];

    if (!m.Name || !m.Email || !m.Address || !m.Role) {
      Swal.fire('Error', 'All member fields are required.', 'warning');
      return;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(m.Email)) {
      Swal.fire('Error', 'Invalid email format.', 'warning');
      return;
    }

    this.members[index].isEdit = false;
  }

  //Delete Member Row
  deleteMemberRow(index: number) {
    this.members.splice(index, 1);
  }

  //Reset Form
  resetMemberForm() {
    ((this.trip = {
      TripName: '',
      Location: '',
      TripDate: '',
      CreatedBy: 1,
    }),
      (this.members = []));
  }

  cancel() {
    this.resetMemberForm();
  }

  //Create Trip Code
  createTrip() {
    if (!this.trip.TripName || !this.trip.TripDate || !this.trip.Location) {
      Swal.fire(
        'Error',
        'Trip Name, Location and Date are required.',
        'warning',
      );
      return;
    }
    if (this.members.length < 2) {
      Swal.fire('Error', 'At least 2 members are required.', 'warning');
      return;
    }

    //Chcek If Any Row Still In Edit Mode
    const hasEditing = this.members.some((m) => m.isEdit);
    if (hasEditing) {
      Swal.fire(
        'Error',
        'Please update all member rows before submitting.',
        'warning',
      );
      return;
    }

    //Validate All Members Data
    for (let m of this.members) {
      if (!m.Name || !m.Email || !m.Address || !m.Role) {
        Swal.fire('Error', 'All members field is required.', 'warning');
        return;
      }
    }

    //Check Atleast One Admin Member Should Be Present
    const hasAdmin = this.members.some((m) => m.Role == 'Admin');
    if (!hasAdmin) {
      Swal.fire('Error', 'In trip atleast one admin is required!', 'warning');
      return;
    }

    const payload: TripCreate = {
      ...this.trip,
      TripDate: new Date(this.trip.TripDate).toISOString(), //This will convert normal date to UTC timezone format
      Members: this.members.map((m) => {
        return {
          Name: m.Name,
          Email: m.Email,
          Address: m.Address,
          Role: m.Role,
        };
      }),
    };

    this.tripService.createTrip(payload).subscribe({
      next: (res) => {
        Swal.fire('Success', 'Trip Created Successfully !', 'success');
        this.resetMemberForm();
      },
      error: (error) => {
        Swal.fire('Error', 'Something Went Wromg.', 'success');
      },
    });
  }
}
