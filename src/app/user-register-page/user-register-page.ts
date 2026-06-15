import { Component, inject } from '@angular/core';
import { RouterLink, Router} from '@angular/router';

import { LoginNavbarComponent } from '../login-navbar/login-navbar';

import { AuthService } from '../services/auth-service/auth-service';

@Component({
  selector: 'app-user-register-page',
  imports: [RouterLink, LoginNavbarComponent],
  templateUrl: './user-register-page.html',
  styleUrl: './user-register-page.css',
})
export class UserRegisterPageComponent {
  private readonly http = inject(AuthService);
  private router = inject(Router);

  userId = '';
  username = '';
  password = '';

  OnRegisterInputUserId(event: Event): void {
    const e = event.target as HTMLInputElement | null;
    this.userId = e?.value ?? '';
  }

  OnRegisterInputUsername(event: Event): void {
    const e = event.target as HTMLInputElement | null;
    this.username = e?.value ?? '';
  }

  OnRegisterInputPassword(event: Event): void {
    const e = event.target as HTMLInputElement | null;
    this.password = e?.value ?? '';
  }

  register(): void{
    const payload = {
      userId: this.userId,
      username: this.username,
      password: this.password
    }
    this.http.register(payload.userId, payload.username, payload.password).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
