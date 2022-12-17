import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '@services/auth.service';
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

  constructor(
    private rankingService: RankingService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  get bets(): Bet[] {
    return this.rankingInfo ? this.rankingInfo.bets : [];
  }

  get language(): string {
    return this.authService.language;
  }

  get isLast(): boolean {
    return this.last ? this.last.user.id == this.rankingInfo.user.id : false;
  }

  get userId(): string {
    let prof = sessionStorage.getItem('profile');
    let profile: Profile = prof ? JSON.parse(prof) : undefined;
    if (profile) {
      return profile.id;
    }
    return '';
  }

  private _firstStage: number = 0;
  public get firstStage(): number {
    return this._firstStage;
  }
  public set firstStage(value: number) {
    this._firstStage = value;
  }

  private _koStages: number = 0;
  public get koStages(): number {
    return this._koStages;
  }
  public set koStages(value: number) {
    this._koStages = value;
  }

  get isQualifiedForLast(): boolean {
    this.firstStage = this.bets.filter((bet: Bet) => bet.matchId <= 48).length;
    this.koStages = this.bets.filter((bet: Bet) => bet.matchId >= 49).length;
    return this.firstStage >= 40 && this.koStages >= 15;
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
