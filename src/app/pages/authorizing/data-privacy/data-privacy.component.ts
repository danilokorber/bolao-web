import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'authorizing-data-privacy',
  templateUrl: './data-privacy.component.html',
  styles: [],
})
export class DataPrivacyComponent {
  constructor(private authService: AuthService) {}

  get language(): string {
    return this.authService.language;
  }
}
