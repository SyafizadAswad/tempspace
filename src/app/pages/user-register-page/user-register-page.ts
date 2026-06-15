import { Component, inject} from '@angular/core';
import { RouterLink, Router} from '@angular/router';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateService, TranslatePipe, TranslateDirective } from '@ngx-translate/core';

import { LoginNavbarComponent } from '../../page-component/login-navbar/login-navbar';

import { AuthService } from '../../services/auth-service/auth-service';
import { IUserRequest } from '../../services/models/UserModel';

@Component({
  selector: 'app-user-register-page',
  imports: [
    RouterLink, 
    ReactiveFormsModule, 
    TranslatePipe,
    TranslateDirective,
    LoginNavbarComponent],
  templateUrl: './user-register-page.html',
  styleUrl: './user-register-page.css',
})
export class UserRegisterPageComponent {
  private translate = inject(TranslateService);
  private readonly http = inject(AuthService);
  private readonly fb = inject(NonNullableFormBuilder);
  private router = inject(Router);

  private readonly fullWidthChar: RegExp = /^[FF10-FF19]+$/;
  private readonly passComb: RegExp = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[\W_]).{1,}$/;
  private readonly userIdLength = 4;
  private readonly passMinLength = 8;
  private readonly usernameMaxLength = 30;

  // character validation specs:
  // (?=.*[a-zA-Z]) -> Checks for at least one letter
  // (?=.*[0-9])       -> Checks for at least one number
  // (?=.*[\W_])    -> Checks for at least one symbol (non-word character or underscore)
  // .{1,}          -> Ensures total length is at least 1 character


  // Form validation/input check
  readonly form = this.fb.group({
    userId: this.fb.control('', {
      validators: 
      [
        Validators.required, 
        Validators.maxLength(this.userIdLength),
        Validators.minLength(this.userIdLength),
        Validators.pattern(this.fullWidthChar)
      ],
    }),
    username: this.fb.control('', {
      validators: 
      [
        Validators.required, 
        Validators.maxLength(this.usernameMaxLength),
      ],
    }),
    password: this.fb.control('', {
      validators: [
        Validators.required,
        Validators.minLength(this.passMinLength),
        Validators.pattern(this.passComb),
      ]
    })
  })

  submit(){
    const u = this.form.getRawValue();

    const body: IUserRequest = {
      userId: u.userId,
      username: u.username,
      password: u.password
    };

    if (this.form.invalid){
      alert(`${this.translate.instant('alert.inputError')}`);
      return 0;
    }
      return this.http.register(body).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (err: unknown) => {
        this.httpStatus(err);
        this.errorLog(err);
        console.log(this.httpStatus(err));
        console.log(this.errorLog(err));
      }
    });
  }

  private httpStatus(err: unknown): number {
    if(err && typeof err === 'object' && 'status' in err) {
      const s = (err as {status?: number}).status;
      return typeof s === 'number' ? s : 0;
    }
    return 0;
  }

  private errorLog(err: unknown): string {
    if (err && typeof err === 'object' && 'message' in err) {
      return String((err as { message?: string}).message ?? err);
    }
    return 'Check API URL';
  }
}
