import { Component, inject, Input } from '@angular/core';
import { RouterLink, Router } from '@angular/router';

import { LoginNavbarComponent } from '../login-navbar/login-navbar';

import { AuthService } from '../services/auth-service/auth-service';

@Component({
  selector: 'app-login-page',
  imports: [RouterLink, LoginNavbarComponent],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPageComponent {
  private readonly http = inject(AuthService);
  private router = inject(Router);

  userId = "";
  password = "";

  onLoginInputUserId(event: Event): void {
    const e = event.target as HTMLInputElement | null;
    this.userId = e?.value ?? '';
  }

  onLoginInputPassword(event: Event): void {
    const e = event.target as HTMLInputElement | null;
    this.password = e?.value ?? '';
  }

  login(): void {
    const payload = {
      userId: this.userId,
      password: this.password
    };
    this.http.login(payload.userId, payload.password).subscribe({
      next: () => {
        this.router.navigate(['/machine']);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
