import { Component, Input } from '@angular/core';
import { Profile, ProfileAttributes } from '@interfaces/profile';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'four-flags',
  templateUrl: './four-flags.component.html',
  styles: [],
})
export class FourFlagsComponent {
  @Input() small: boolean = false;
  @Input() attributes: ProfileAttributes | undefined;

  constructor(private authService: AuthService) {}

  get profile(): Profile | undefined {
    return this.authService.profile;
  }
}
