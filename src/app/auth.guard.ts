import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './tabs/components/auth/services/auth.service';  // Assuming your service is in this path

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const result = await this.authService.isAuthenticated();
    if(!result) {
        this.router.navigate(['/tabs/tab1']);
      }
      return result;
  }
}

