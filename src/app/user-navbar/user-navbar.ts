import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { AuthService } from '../services/auth-service/auth-service';

@Component({
  selector: 'app-user-navbar',
  imports: [ RouterLink ],
  templateUrl: './user-navbar.html',
  styleUrl: './user-navbar.css',
})
export class UserNavbar {
  private readonly authApi = inject(AuthService);
  private readonly http = inject(HttpClient);

  logout(): void {
    this.authApi.logout();
  }
}
