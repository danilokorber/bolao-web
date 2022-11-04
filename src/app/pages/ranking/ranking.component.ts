import { Component, OnInit } from '@angular/core';
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

  ngOnInit(): void {
    this.loadRanking();
  }

  loadRanking(): void {
    this.rankingService.get().subscribe({
      next: (data: Ranking[]) => {
        this._ranking = data;
      },
    });
  }

  get language(): string {
    return this.authService.language;
  }
}
