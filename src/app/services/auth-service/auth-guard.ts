import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth-service';

export const AuthGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);
    // debug
    const hasToken = !!sessionStorage.getItem('token');

    console.log(authService.isAuthenticated());

    if (hasToken) return true;

    if (authService.isAuthenticated()) 
        { 
            console.log("here");
            return true;
        }

    return router.createUrlTree(['/login']);
}