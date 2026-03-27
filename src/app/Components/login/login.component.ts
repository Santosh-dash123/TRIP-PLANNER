import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthService } from '../../Core/Services/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}

  goToHome() {
    this.router.navigate(['/']);
  }

  onLogin() {
    const loginData = {
      email: this.email,
      password: this.password,
    };
    if (loginData.email == null || loginData.email == '') {
      Swal.fire('Warning', 'Email Is Required', 'warning');
      return;
    } else if (loginData.password == null || loginData.password == '') {
      Swal.fire('Warning', 'Password Is Required', 'warning');
      return;
    }

    this.authService.login(loginData).subscribe({
      next: (res) => {
        if (res.success) {
          this.authService.saveToken(res.token);

          Swal.fire('Success', 'Login Successfull', 'success');

          this.router.navigate(['/dashboardlayout/home']);
        }
      },
      error: (err) => {
        Swal.fire('Error', 'You are not a valid user for this.', 'error');
      },
    });
  }
}
