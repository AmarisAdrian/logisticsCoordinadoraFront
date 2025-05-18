import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials = { email: '', password: '' };
  isLoading = false; 
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

onSubmit(): void {
  this.isLoading = true;
  this.errorMessage = '';

  this.authService.login(this.credentials).pipe(
    finalize(() => {
      this.isLoading = false;
    })
  ).subscribe({
    next: (response) => {
      this.authService.setToken(response.accessToken);
      this.router.navigate(['/dashboard']);
    },
    error: (err) => {
      console.error('Login error:', err);
      this.errorMessage = err.error?.message || 'Credenciales inválidas o error de servidor';
    }
  });
}

}