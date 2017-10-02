import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SettingsService } from '../services/settings.service';

@Injectable()
export class RegisterGuard implements CanActivate {

  constructor(
    private settingsService: SettingsService,
    private router: Router
  ) {}

  canActivate():boolean {
    let allowRegistration = this.settingsService.getSettings().allowRegistration;
    if (allowRegistration) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

}
