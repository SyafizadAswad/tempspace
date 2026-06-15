import { Component, inject, signal, effect, computed } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TranslateService, TranslatePipe, TranslateDirective } from '@ngx-translate/core';

import { AuthService } from '../../services/auth-service/auth-service';

@Component({
  selector: 'app-user-navbar',
  imports: [ RouterLink, TranslatePipe, TranslateDirective ],
  templateUrl: './user-navbar.html',
  styleUrl: './user-navbar.css',
})
export class UserNavbar {
  private translate = inject(TranslateService);
  private readonly authApi = inject(AuthService);
  private readonly http = inject(HttpClient);

  public selectedLanguage = signal<string>(localStorage.getItem('preferredLang') ?? 'ja');

  protected readonly currentUser = this.authApi.currentUser;

  constructor() {
    effect(() => {
      localStorage.setItem('preferredLang', this.selectedLanguage());
      const savedLang = localStorage.getItem('preferredLang') ?? 'ja';
      this.translate.use(savedLang);

      const user = this.currentUser();
    })
  }

  updateLanguage(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedLanguage.set(selectElement.value);
    this.translate.use(selectElement.value);
  }


  logout(): void {
    this.authApi.logout();
  }
}
