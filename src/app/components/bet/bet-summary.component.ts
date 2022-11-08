import { Component, Input, OnInit } from '@angular/core';
import { Bet } from 'src/app/interfaces/bet';
import { Profile } from 'src/app/interfaces/profile';

@Component({
  selector: 'bet-summary',
  templateUrl: './bet-summary.component.html',
  styles: [],
})
export class BetSummaryComponent {
  @Input() bet!: Bet;
  @Input() language: string = 'en';

  isVisible = false;
  constructor() {}

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  get userId(): string {
    let prof = sessionStorage.getItem('profile');
    let profile: Profile = prof ? JSON.parse(prof) : undefined;
    if (profile) {
      return profile.id;
    }
    return '';
  }
}
