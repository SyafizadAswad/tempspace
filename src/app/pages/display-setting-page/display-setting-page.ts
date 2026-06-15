import { Component, inject, effect, signal } from '@angular/core';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { TranslateService, TranslatePipe, TranslateDirective } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

import { UserNavbar } from '../../page-component/user-navbar/user-navbar';

import { IDisplaySetting } from '../../services/models/UserModel';

import { UserService } from '../../services/user_services/user-service';
import { AuthService } from '../../services/auth-service/auth-service';

@Component({
  selector: 'app-display-setting-page',
  imports: [
    RouterLink, 
    UserNavbar,
    TranslatePipe,
    TranslateDirective,
    FormsModule
  ],
  templateUrl: './display-setting-page.html',
  styleUrl: './display-setting-page.css',
})
export class DisplaySettingPageComponent {
  private translate = inject(TranslateService);
  private readonly userApi = inject(UserService);
  private readonly authApi = inject(AuthService);
  private readonly route = inject(ActivatedRoute);

  protected readonly currentUser = this.authApi.currentUser;

  public dispSetting = signal<IDisplaySetting[]>([]);

  constructor() {
    effect(() => {
      const user = this.currentUser();
    })
  }

  ngOnInit():void {
    const userId = this.route.snapshot.paramMap.get('userId');
    if(userId !== null){
      this.getUserDisplaySetting(userId);
    }
  }

  getUserDisplaySetting(userId: string){
    this.userApi.getUserDisplaySetting(userId).subscribe({
      next: (rows) => {
        this.dispSetting.set([rows]);
      },
      error: (err: unknown) => {
        console.log(err);
      }
    });
  }


}
