import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'authorizing-rules',
  templateUrl: './rules.component.html',
  styles: [],
})
export class RulesComponent {
  constructor(private authService: AuthService) {}

  get language(): string {
    return this.authService.language;
  }
}
