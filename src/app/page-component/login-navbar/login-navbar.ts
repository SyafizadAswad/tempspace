import { Component, inject, signal, effect } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TranslateService, TranslatePipe, TranslateDirective } from '@ngx-translate/core';

@Component({
  selector: 'app-login-navbar',
  imports: [RouterLink, TranslatePipe, TranslateDirective],
  templateUrl: './login-navbar.html',
  styleUrl: './login-navbar.css',
})
export class LoginNavbarComponent{
  private translate = inject(TranslateService);

  public selectedLanguage = signal<string>(localStorage.getItem('preferredLang') ?? 'ja');

  constructor() {
    effect(() => {
      localStorage.setItem('preferredLang', this.selectedLanguage());
      const savedLang = localStorage.getItem('preferredLang') ?? 'ja';
      this.translate.use(savedLang);
    })
  }

  updateLanguage(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedLanguage.set(selectElement.value);
    this.translate.use(selectElement.value);
  }

}
