import { Component } from '@angular/core';
import { Profile } from '@interfaces/profile';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'four-flags',
  templateUrl: './four-flags.component.html',
  styles: [],
})
export class FourFlagsComponent {
  constructor(private authService: AuthService) {}

  get profile(): Profile | undefined {
    return this.authService.profile;
  }
}
