import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { environment } from '../../../env/env';
import { IUser, IUserRequest, IUserResponse, IDisplaySetting } from '../models/UserModel';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly resourceUser = `${environment.apiBaseUrl}/User`;
  private readonly http = inject(HttpClient);  
  
  // user display setting service
  public getUserDisplaySetting(userId: string): Observable<IDisplaySetting> {
    const key = encodeURIComponent(userId);
    return this.http.get<IDisplaySetting>(`${this.resourceUser}/${key}`);
  }

  public updateUserDisplaySetting(userId: string, body: IDisplaySetting): Observable<void> {
    const key = encodeURIComponent(userId);
    return this.http.post<void>(`${this.resourceUser}/${key}`, body);
  }
}
