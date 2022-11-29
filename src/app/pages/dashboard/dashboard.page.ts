import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Profile } from '@interfaces/profile';
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
    private authService: AuthService,
    private router: Router
  ) {}

  isLoadingMatches = true;
  isHistoryLoaded = false;
  faLoading: IconDefinition = faSpinner;

  private _liveMatches: Match[] = [];
  public get liveMatches(): Match[] {
    return this._liveMatches;
  }
  public set liveMatches(value: Match[]) {
    this._liveMatches = value;
  }

  private liveMatchesLoader: any;
  private liveRankingLoader: any;
  private livePositionLoader: any;
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
    this.liveMatchesLoader = setInterval(() => this.initLiveMatches(), 20_000);
    this.liveRankingLoader = setInterval(() => this.initRanking(), 20_000);
    this.livePositionLoader = setInterval(() => this.getPosition(), 20_000);
    this.initNextMatches();
    this.initRanking();
    this.getPosition();
    this.getHistory();
  }

  ngOnDestroy(): void {
    clearInterval(this.liveMatchesLoader);
    clearInterval(this.liveRankingLoader);
    clearInterval(this.livePositionLoader);
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

  goToAccount(): void {
    this.router.navigate(['/account']);
  }

  getPosition(): void {
    this.rankingService.getPosition().subscribe({
      next: (p) => (this.position = p),
    });
  }

  getHistory(): void {
    this.rankingService.getHistory().subscribe({
      next: (h) => {
        this.lineStylesData.labels = [];
        this.lineStylesData.datasets[0].data = [];

        for (let key in h) {
          let value = h[key];
          this.lineStylesData.labels.push(key);
          this.lineStylesData.datasets[0].data.push(value);
        }
        console.log(this.lineStylesData);
        this.isHistoryLoaded = true;
      },
    });
  }

  get language(): string {
    return this.authService.language;
  }

  get wcStarted(): boolean {
    let now = new Date();
    return now > new Date('2022-11-20T16:00:00.000+00:00');
  }

  get isRoundThreeNotStarted(): boolean {
    let now = new Date();
    let limit = new Date('2022-11-29T15:00:00Z');
    return limit.getTime() > now.getTime();
  }

  get profile(): Profile | undefined {
    return this.authService.profile;
  }

  lineStylesData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        data: [12, 51, 62, 33, 21, 62, 45],
        fill: true,
        borderColor: 'rgba(134, 20, 54, 0.6)',
        tension: 0.4,
        backgroundColor: 'rgba(134, 20, 54, 0.2)',
      },
    ],
  };

  basicOptions = {
    title: { display: false },
    labels: { display: false },
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
    elements: {
      point: {
        radius: 0,
      },
    },
  };
}
