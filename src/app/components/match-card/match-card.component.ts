import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  faPencil,
  faRectangleList,
  IconDefinition,
  faSave,
  faEllipsis,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import { MatchesService } from '@services/matches.service';
import { Bet } from 'src/app/interfaces/bet';
import { Match, MatchStatus } from 'src/app/interfaces/match';
import { AuthService } from 'src/app/services/auth.service';
import { BetService } from 'src/app/services/bets.service';

@Component({
  selector: 'match-card',
  templateUrl: './match-card.component.html',
  styleUrls: ['./match-card.component.scss'],
})
export class MatchCardComponent implements OnInit, OnDestroy {
  @Input() match!: Match;

  iconEdit: IconDefinition = faPencil;
  iconList: IconDefinition = faRectangleList;
  iconSave: IconDefinition = faSave;
  iconMore: IconDefinition = faEllipsis;
  iconLoading: IconDefinition = faSpinner;
  formBet!: FormGroup;
  isDisplayingBets: boolean = false;
  isLoadingBets = true;
  allBets: Bet[] = [];

  updateScore$!: any;

  constructor(
    private authService: AuthService,
    private betService: BetService,
    private matchesService: MatchesService
  ) {}

  ngOnInit() {
    this.initForm();
    this.updateScore$ = setInterval(() => {
      if (this.match.live) {
        this.matchesService.getById(this.match.id).subscribe({
          next: (m) => {
            this.match = m;
            console.log(this.match);
            // STATUS: PAUSED, IN_PLAY, FINISHED, TIMED
          },
        });
      }
    }, 10_000);
  }

  ngOnDestroy() {
    clearInterval(this.updateScore$);
  }

  initForm(): void {
    this.formBet = new FormGroup({
      matchId: new FormControl(this.match.id, Validators.required),
      scoreHome: new FormControl(this.bet?.scoreHome, Validators.required),
      scoreAway: new FormControl(this.bet?.scoreAway, Validators.required),
    });
    this.formBet.markAsPristine();
  }

  saveBet(): void {
    if (this.formBet.valid) {
      let bet: Partial<Bet> = this.formBet.value;
      this.betService.create(bet).subscribe({
        next: (d: Bet) => {
          this.match.bets = [];
          this.match.bets.push(d);
          this.initForm();
        },
      });
    }
  }

  displayBets() {
    if (this.isMatchStarted) {
      this.isDisplayingBets = true;
      this.getAllBets();
    }
  }

  getAllBets(): void {
    this.isLoadingBets = true;
    this.betService.getBetsByMatch(this.match).subscribe({
      next: (bets) => {
        bets.sort((a, b) => b.points - a.points);
        this.allBets = bets;
        this.isLoadingBets = false;
      },
    });
  }

  public get bet(): Bet | undefined {
    let foundBet: Bet | undefined;
    try {
      let userId: string | undefined = this.authService.profile?.id;
      if (userId) {
        foundBet = this.match.bets.find(
          (bet) => bet.userId == userId && bet.active
        );
      }
    } catch (e) {
      //
    }
    return foundBet;
  }

  get language(): string {
    return this.authService.language;
  }

  get isMatchStarted(): boolean {
    return this.compareDate(new Date(), this.match.kickoff) > 0;
  }

  compareDate(date1: Date, date2: Date): any {
    let d1 = new Date(date1);
    let d2 = new Date(date2);

    // Check if the dates are equal
    let same = d1.getTime() === d2.getTime();
    if (same) return 0;

    // Check if the first is greater than second
    if (d1 > d2) return 1;

    // Check if the first is less than second
    if (d1 < d2) return -1;
  }

  public fullTeamName(homeAway: 'home' | 'away') {
    switch (this.language) {
      case 'en':
        return this.match[homeAway].en;
      case 'de':
        return this.match[homeAway].de;
      case 'pt':
        return this.match[homeAway].pt;
    }
    return '';
  }

  groupName(groupId: number): string {
    switch (groupId) {
      case 1:
        return 'groupA';
      case 2:
        return 'groupB';
      case 3:
        return 'groupC';
      case 4:
        return 'groupD';
      case 5:
        return 'groupE';
      case 6:
        return 'groupF';
      case 7:
        return 'groupG';
      case 8:
        return 'groupH';
      case 9:
        return 'roundOf16';
      case 10:
        return 'quarter';
      case 11:
        return 'semi';
      case 12:
        return 'final';
      default:
        return '';
    }
  }

  get bg(): string {
    if (this.isMatchStarted) {
      if (this.bet) {
        return (
          'bg-opacity-20 bg-rainbow-' +
          (this.bet.points == 0 ? 50 : this.bet.points + '00')
        );
      } else {
        return 'bg-opacity-20 bg-rainbow-50';
      }
    } else {
      return 'bg-slate-200';
    }
  }

  public get argentinaLost(): boolean {
    if (
      this.match.home.shortName == 'ARG' &&
      (this.match.scoreAway ?? 0) > (this.match.scoreHome ?? 0)
    ) {
      return true;
    } else if (
      this.match.away.shortName == 'ARG' &&
      (this.match.scoreAway ?? 0) < (this.match.scoreHome ?? 0)
    ) {
      return true;
    } else {
      return false;
    }
  }

  public get isInPlay(): boolean {
    return (
      this.match.status == MatchStatus.IN_PLAY ||
      this.match.status == MatchStatus.PAUSED
    );
  }
}
