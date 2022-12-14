import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Team } from 'src/app/interfaces/team';
import { TeamsService } from 'src/app/services/teams.service';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { UsersService } from 'src/app/services/users.service';
import { AuthService } from 'src/app/services/auth.service';
import { BonusBet } from 'src/app/interfaces/bet';

@Component({
  selector: 'authorizing-bonus-bets',
  templateUrl: './bonus-bets.component.html',
  styleUrls: ['./bonus-bets.component.scss'],
})
export class BonusBetsComponent implements OnInit {
  @Output() changed: EventEmitter<(Team | undefined)[]> = new EventEmitter<
    (Team | undefined)[]
  >();

  constructor(
    private usersService: UsersService,
    private teamsService: TeamsService,
    private authService: AuthService
  ) {}

  public deleteIcon: IconDefinition = faCircleXmark;

  public teams: Team[] = [];
  private teamsBackup: Team[] = [];

  public first: Team[] = [];
  public second: Team[] = [];
  public third: Team[] = [];
  public fourth: Team[] = [];

  ngOnInit(): void {
    this.teamsService.get().subscribe({
      next: (teams: Team[]) => {
        this.teamsBackup = teams;
        this.cloneTeams();
        this.loadBets();
      },
    });
  }

  onDrop(event: CdkDragDrop<Team[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    if (this.first.length > 1) this.first.splice(1);
    if (this.second.length > 1) this.second.splice(1);
    if (this.third.length > 1) this.third.splice(1);
    if (this.fourth.length > 1) this.fourth.splice(1);

    this.changed.emit(this.bets);
    this.setBets();

    this.cloneTeams();
  }

  cloneTeams(): void {
    this.teams = JSON.parse(
      JSON.stringify(this.teamsBackup)
    ) as typeof this.teamsBackup;
  }

  cancel(): void {
    this.authService.logout();
  }

  get language(): string {
    return this.authService.language;
  }

  get bets(): (Team | undefined)[] {
    return [this.first[0], this.second[0], this.third[0], this.fourth[0]];
  }
  @Input() bonusBets!: BonusBet;

  loadBets() {
    let first = this.team(this.bonusBets.first[0]);
    if (this.bonusBets.first && this.bonusBets.first.length == 1 && first)
      this.first = [first];

    let second = this.team(this.bonusBets.second[0]);
    if (this.bonusBets.second && this.bonusBets.second.length == 1 && second)
      this.second = [second];

    let third = this.team(this.bonusBets.third[0]);
    if (this.bonusBets.third && this.bonusBets.third.length == 1 && third)
      this.third = [third];

    let fourth = this.team(this.bonusBets.fourth[0]);
    if (this.bonusBets.fourth && this.bonusBets.fourth.length == 1 && fourth)
      this.fourth = [fourth];
  }

  get betsMissing(): boolean {
    return this.bets.includes(undefined);
  }

  team(shortName: string): Team | undefined {
    return this.teams.find((t) => t.shortName === shortName);
  }

  teamName(team: Team): string {
    switch (this.language) {
      case 'en':
        return team.en;
      case 'de':
        return team.de;
      case 'pt':
        return team.pt;
      default:
        return team.en;
    }
  }

  remove(i: number): void {
    switch (i) {
      case 1:
        this.first = [];
        break;
      case 2:
        this.second = [];
        break;
      case 3:
        this.third = [];
        break;
      case 4:
        this.fourth = [];
        break;
      default:
    }

    this.changed.emit(this.bets);
    this.setBets();
  }

  setBets(): void {
    if (
      this.first.length > 0 &&
      this.second.length > 0 &&
      this.third.length > 0 &&
      this.fourth.length > 0
    ) {
      let bets: BonusBet = {
        first: [this.first[0].shortName],
        second: [this.second[0].shortName],
        third: [this.third[0].shortName],
        fourth: [this.fourth[0].shortName],
      };

      if (this.authService.profile) {
        this.usersService
          .bonusBets(this.authService.profile.id, bets)
          .subscribe({
            next: (profile) => {
              this.authService.profile = profile;
            },
          });
      }
    }
  }
}
