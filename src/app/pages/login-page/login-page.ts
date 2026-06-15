import { Component, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateService, TranslatePipe, TranslateDirective } from '@ngx-translate/core';

import { LoginNavbarComponent } from '../../page-component/login-navbar/login-navbar';

import { AuthService } from '../../services/auth-service/auth-service';

@Component({
  selector: 'app-login-page',
  imports: [
    RouterLink, 
    ReactiveFormsModule, 
    TranslatePipe, 
    TranslateDirective, 
    LoginNavbarComponent
  ],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPageComponent {
  private readonly http = inject(AuthService);
  private readonly fb = inject(NonNullableFormBuilder);
  private router = inject(Router);

  private translate = inject(TranslateService);

  constructor() {
    this.translate.addLangs(['ja', 'en']);
  }

  readonly form = this.fb.group({
    userId: this.fb.control('', {
      validators: [Validators.required]
    }),
    password: this.fb.control('', {
      validators: [Validators.required]
    })
  })

  submit() {
    if (this.form.invalid){
      alert(`${this.translate.instant('alert.inputError')}`);
      return 0;
    }
    return this.login();
  }

  login(): void {
    const u = this.form.getRawValue();
    this.http.login(u.userId, u.password).subscribe({
      next: () => {
        this.router.navigate(['/machine']);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
