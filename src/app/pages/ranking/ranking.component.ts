import { Component, OnInit } from '@angular/core';
import { Bet } from '@interfaces/bet';
import { Ranking } from 'src/app/interfaces/ranking';
import { AuthService } from 'src/app/services/auth.service';
import { RankingService } from 'src/app/services/ranking.service';

@Component({
  selector: 'bolao-ranking',
  templateUrl: './ranking.component.html',
  styles: [],
})
export class RankingComponent implements OnInit {
  constructor(
    private rankingService: RankingService,
    private authService: AuthService
  ) {}

  private _ranking: Ranking[] = [];
  public get ranking(): Ranking[] {
    return this._ranking.sort((a, b) => b.points - a.points);
  }
  public set ranking(value: Ranking[]) {
    this._ranking = value;
  }

  private _last: Ranking | undefined;
  public get last(): Ranking | undefined {
    return this._last;
  }
  public set last(value: Ranking | undefined) {
    this._last = value;
  }

  ngOnInit(): void {
    this.loadRanking();
  }

  loadRanking(): void {
    this.rankingService.get().subscribe({
      next: (data: Ranking[]) => {
        this._ranking = data;
        this.defineLast();
      },
    });
  }

  get language(): string {
    return this.authService.language;
  }

  defineLast(): void {
    let ranking: Ranking[] = this.ranking;
    let last: Ranking | undefined = undefined;

    ranking.forEach((r: Ranking) => {
      let firstStage: Bet[] = r.bets.filter((bet: Bet) => bet.matchId <= 48);
      let koStage: Bet[] = r.bets.filter((bet: Bet) => bet.matchId >= 49);
      console.log(
        r.user.firstName,
        r.user.lastName,
        firstStage.length,
        koStage.length
      );
      if (firstStage.length >= 40 && koStage.length >= 15) last = r;
    });

    this.last = last;
  }
}
