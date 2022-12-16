import { Component, Input, OnInit } from '@angular/core';
import { Bet } from 'src/app/interfaces/bet';
import { Profile } from 'src/app/interfaces/profile';
import { Ranking } from 'src/app/interfaces/ranking';
import { RankingService } from 'src/app/services/ranking.service';

@Component({
  selector: 'ranking-item',
  templateUrl: './ranking-item.component.html',
  styles: [],
})
export class RankingItemComponent implements OnInit {
  @Input() rankingInfo!: Ranking;
  @Input() position: number = 0;
  @Input() last: Ranking | undefined;

  constructor(private rankingService: RankingService) {}

  ngOnInit(): void {}

  get bets(): Bet[] {
    return this.rankingInfo ? this.rankingInfo.bets : [];
  }

  get userId(): string {
    let prof = sessionStorage.getItem('profile');
    let profile: Profile = prof ? JSON.parse(prof) : undefined;
    if (profile) {
      return profile.id;
    }
    return '';
  }

  occurences(bets: Bet[], points: number): number {
    return bets.filter((bet) => bet.points == points).length;
  }

  get picture(): string {
    return (
      this.rankingInfo.user.attributes?.picture[0] ?? '/assets/img/al-rihla.png'
    );
  }
}
