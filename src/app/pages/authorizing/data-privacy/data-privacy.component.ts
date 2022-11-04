import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'authorizing-data-privacy',
  templateUrl: './data-privacy.component.html',
  styles: [],
})
export class DataPrivacyComponent {
  @Output() onAccept: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private usersService: UsersService,
    private authService: AuthService
  ) {}

  acceptDataPrivacy(): void {
    if (this.authService.profile) {
      this.usersService
        .acceptDataPrivacy(this.authService.profile.id)
        .subscribe({
          next: (profile) => {
            this.authService.profile = profile;
            console.log(this.authService.profile);
          },
        });
    }
  }

  get language(): string {
    return this.authService.language;
  }

  cancel(): void {
    this.authService.logout();
  }
}
