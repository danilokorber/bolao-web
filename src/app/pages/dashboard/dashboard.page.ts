import { Component, OnDestroy, OnInit } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Match } from 'src/app/interfaces/match';
import { Position, Ranking } from 'src/app/interfaces/ranking';
import { AuthService } from 'src/app/services/auth.service';
import { MatchesService } from 'src/app/services/matches.service';
import { RankingService } from 'src/app/services/ranking.service';

@Component({
  selector: 'bolao-home',
  templateUrl: './dashboard.page.html',
  styles: [],
})
export class DashboardPage implements OnInit, OnDestroy {
  constructor(
    private matchesService: MatchesService,
    private rankingService: RankingService,
    private authService: AuthService
  ) {}

  isLoadingMatches = true;
  faLoading: IconDefinition = faSpinner;

  private _liveMatches: Match[] = [];
  public get liveMatches(): Match[] {
    return this._liveMatches;
  }
  public set liveMatches(value: Match[]) {
    this._liveMatches = value;
  }

  private liveMatchesLoader: any;
  private _nextMatches: Match[] = [];
  public get nextMatches(): Match[] {
    return this._nextMatches;
  }
  public set nextMatches(value: Match[]) {
    this._nextMatches = value;
  }

  private _ranking: Ranking[] = [];
  public get ranking(): Ranking[] {
    return this._ranking;
  }
  public set ranking(value: Ranking[]) {
    this._ranking = value;
  }

  private _position: Position | undefined;
  public get position(): Position | undefined {
    return this._position;
  }
  public set position(value: Position | undefined) {
    this._position = value;
  }

  ngOnInit(): void {
    this.initLiveMatches();
    this.liveMatchesLoader = setInterval(() => this.initLiveMatches(), 60_000);
    this.initNextMatches();
    this.initRanking();
    this.getPosition();
  }

  ngOnDestroy(): void {
    clearInterval(this.liveMatchesLoader);
  }

  initLiveMatches(): void {
    this.matchesService.getLive().subscribe({
      next: (m) => (this.liveMatches = m),
    });
  }

  initNextMatches(): void {
    this.isLoadingMatches = true;
    this.matchesService.getNext(6).subscribe({
      next: (m) => {
        this.nextMatches = m;
        this.isLoadingMatches = false;
      },
    });
  }

  initRanking(): void {
    this.rankingService.get().subscribe({
      next: (r) => (this.ranking = r),
    });
  }

  getPosition(): void {
    this.rankingService.getPosition().subscribe({
      next: (p) => (this.position = p),
    });
  }

  get language(): string {
    return this.authService.language;
  }

  get wcStarted(): boolean {
    let now = new Date();
    return now > new Date('2022-11-20T16:00:00.000+00:00');
  }
}
