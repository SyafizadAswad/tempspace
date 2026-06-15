import { Component, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { TranslateService, TranslatePipe, TranslateDirective } from '@ngx-translate/core';

import { UserNavbar } from '../../page-component/user-navbar/user-navbar';

import { DataBaseService } from '../../services/database_service/data-base';
import { IMachine, IMachineRequest } from '../../services/models/MachineModel';

@Component({
  selector: 'app-machine-register-page',
  imports: [
    RouterLink,
    ReactiveFormsModule,
    TranslatePipe,
    TranslateDirective, 
    UserNavbar],
  templateUrl: './machine-register-page.html',
  styleUrl: './machine-register-page.css',
})
export class MachineRegisterPageComponent {
  private translate = inject(TranslateService);
  private readonly http = inject(DataBaseService);
  private readonly fb = inject(NonNullableFormBuilder);
  private router = inject(Router);

  //error check here
  private readonly machineIdLength = 8;
  private readonly fullWidthChar: RegExp = /^[FF10-FF19]+$/;
  private readonly machineIdFormat: RegExp = /^[A-Z]{3}-[0-9]{4}$/;

  // Form validation/input check
  readonly form = this.fb.group({
    machineId: this.fb.control('', {
      validators:
      [
        Validators.required,
        Validators.maxLength(this.machineIdLength),
        Validators.minLength(this.machineIdLength),
        // Validators.pattern(this.fullWidthChar),
        Validators.pattern(this.machineIdFormat)
      ]
    }),
    machineName: this.fb.control('', {
      validators:
      [
        Validators.required,
      ]
    }),
    location: this.fb.control('', {
      validators:
      [
        Validators.required,
      ]
    }),
    installDate: this.fb.control('', {
      validators:
      [
        Validators.required,
      ]
    })
  })

  submit(){
    const m = this.form.getRawValue();
    const body: IMachineRequest = {
      machineId: m.machineId,
      machineName: m.machineName,
      location: m.location,
      installDate: m.installDate
    };

    if (this.form.invalid){
      alert(`${this.translate.instant('alert.inputError')}`);
      return 0;
    }
    if (confirm(`${this.translate.instant('alert.register')}`)){
      this.http.createMachine(body).subscribe({
        next: () => {
          this.router.navigate(['/machine']);
        },
        error: (err: unknown) => {
          this.httpStatus(err);
          this.errorLog(err);
          console.log(this.httpStatus(err));
          console.log(this.errorLog(err));
        }
      });
    }
    return;
  }

  private httpStatus(err:unknown): number {
    if(err && typeof err === 'object' && 'status' in err) {
      const s = (err as {status?:number}).status;
      return typeof s === 'number' ? s : 0;
    }
    return 0;
  }

  private errorLog(err: unknown): string {
    if (err && typeof err === 'object' && 'message' in err) {
      return String((err as { message?: string}).message ?? err);
    }
    return 'Check API URL'
  }
}

