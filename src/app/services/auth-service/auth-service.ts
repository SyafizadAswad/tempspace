import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';

import { environment } from '../../../env/env';
import { IUser, IUserRequest, IUserResponse, JwtPayload } from '../models/UserModel';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly resourceAuth = `${environment.apiBaseUrl}/Auth`;

  nameClaimKey = 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name';

  public currentUser = signal<IUser | null>(null);
  public isAuthenticated = computed(() => this.currentUser() !== null);

  
  // authentication service
  constructor(private http: HttpClient) {
    this.loadUserFromToken();
  }

  login(userId: string, password: string): Observable<string> {
    return this.http.post(`${this.resourceAuth}/login`, { userId, password }, {responseType: 'text'})
    .pipe(
      tap(tokenString => {
        this.handleAuthResponse({ token: tokenString, user: this.parseJwt(tokenString)})
      })
    );
  }

  register(body: IUserRequest): Observable<IUserResponse> {
    return this.http.post<IUserResponse>(`${this.resourceAuth}/register`, body)
    .pipe(
      tap(response => this.handleAuthResponse(response))
    );
  }

  logout(): void {
    sessionStorage.removeItem('token');
    this.currentUser.set(null);
  }

  getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  private handleAuthResponse(response: any): void {
    const token = response.token || response;
    sessionStorage.setItem('token', token);
    this.currentUser.set(response.user);
    
    const payload = this.parseJwt(token);
    const decoded = jwtDecode<JwtPayload>(token);
    if (payload) {
      this.currentUser.set({
        userId: payload.sub,
        username: payload[this.nameClaimKey],
        password: payload.sub
      });
    }
  }

  private loadUserFromToken(): void {
    try {
      const token = sessionStorage.getItem('token');
      if(token) {
        const payload = this.parseJwt(token);
        const decoded = jwtDecode<JwtPayload>(token);
        console.log(decoded);
        if (payload) {
          this.currentUser.set({
            userId: payload.sub,
            username: payload[this.nameClaimKey],
            password: payload.sub
          });
        }
      }
    }
    catch (error)
    {
      sessionStorage.removeItem('token');
    }
  }
  
  private parseJwt(token: string): any {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) return null;
      const base64Url = parts[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      return JSON.parse(atob(base64));
    } catch {
      return null;
    }
  }
}
