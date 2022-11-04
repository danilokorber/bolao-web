import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Auth } from '../classes/auth';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard extends Auth implements CanActivate {
  canActivate(): boolean {
    if (!this.isAdmin) {
      this.router.navigate(['/dashboard']);
    }
    return this.isAdmin;
  }
}
