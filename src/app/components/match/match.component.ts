import { Component, HostListener, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faPen, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Layout } from 'src/app/enums/layout';
import { Bet } from 'src/app/interfaces/bet';
import { Match } from 'src/app/interfaces/match';
import { AuthService } from 'src/app/services/auth.service';
import { BetService } from 'src/app/services/bets.service';

const DATE = new Date(2022, 10, 22, 17, 1);

@Component({
  selector: 'bolao-match',
  templateUrl: './match.component.html',
  styles: [],
})
export class MatchComponent implements OnInit {
  @Input() match!: Match;
  @Input() layout: Layout = Layout.COMPACT;
  public get isLargeLayout(): boolean {
    return this.layout == Layout.LARGE;
  }
  public get isCompactLayout(): boolean {
    return this.layout == Layout.COMPACT;
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;
  }

  isDrawerOpen = false;
  isBetsOpen = false;
  isLoadingBets = true;
  iconEdit: IconDefinition = faPen;
  formBet!: FormGroup;
  faLoading: IconDefinition = faSpinner;
  allBets: Bet[] = [];

  private _innerWidth!: number;
  public get innerWidth(): number {
    return this._innerWidth;
  }
  public set innerWidth(value: number) {
    this._innerWidth = value;
  }

  constructor(
    private authService: AuthService,
    private betService: BetService
  ) {}

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    this.initForm();
  }

  initForm(): void {
    this.formBet = new FormGroup({
      matchId: new FormControl(this.match.id, Validators.required),
      scoreHome: new FormControl(this.bet?.scoreHome, Validators.required),
      scoreAway: new FormControl(this.bet?.scoreAway, Validators.required),
    });
    this.formBet.markAsPristine;
  }

  getAllBets(): void {
    this.betService.getBetsByMatch(this.match).subscribe({
      next: (bets) => {
        bets.sort((a, b) => b.points - a.points);
        this.allBets = bets;

        this.isLoadingBets = false;
      },
    });
  }

  get isMatchStarted(): boolean {
    return this.compareDate(new Date(), this.match.kickoff) > 0;
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
  /**
   * Compares two Date objects and returns e number value that represents
   * the result:
   * 0 if the two dates are equal.
   * 1 if the first date is greater than second.
   * -1 if the first date is less than second.
   * @param date1 First date object to compare.
   * @param date2 Second date object to compare.
   */
  compareDate(date1: Date, date2: Date): any {
    // With Date object we can compare dates them using the >, <, <= or >=.
    // The ==, !=, ===, and !== operators require to use date.getTime(),
    // so we need to create a new instance of Date with 'new Date()'
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

  openDrawer(): void {
    if (this.isMatchStarted) this.getAllBets();
    this.isDrawerOpen = true;
  }

  cancelDrawer(): void {
    if (this.formBet.dirty) {
      let response = confirm(
        'You changed the bet, but did not save it. Do you want to save it?'
      );
      if (response) {
        this.saveBet();
      } else {
        this.initForm();
      }
    }
    this.closeDrawer();
  }

  closeDrawer(): void {
    this.isDrawerOpen = false;
  }

  openBets(): void {
    this.isBetsOpen = true;
  }

  closeBets(): void {
    //if (this.isMatchStarted) this.isDrawerOpen = false;
    this.isBetsOpen = false;
  }

  saveBet(): void {
    let bet: Partial<Bet> = this.formBet.value;
    this.betService.create(bet).subscribe({
      next: (d: Bet) => {
        this.match.bets = [];
        this.match.bets.push(d);
        this.initForm();
        this.closeDrawer();
      },
    });
  }

  sortArray(unsortedArray: any[], field: string, sort: 'asc' | 'desc'): any[] {
    return unsortedArray.sort((obj1, obj2) => {
      if (obj1.cognome > obj2.cognome) {
        return sort == 'asc' ? 1 : -1;
      }

      if (obj1.cognome < obj2.cognome) {
        return sort == 'asc' ? -1 : 1;
      }

      return 0;
    });
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

  get language(): string {
    return this.authService.language;
  }
}
