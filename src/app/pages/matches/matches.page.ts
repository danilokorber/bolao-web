import { Component, OnInit } from '@angular/core';
import { Match } from 'src/app/interfaces/match';
import { MatchesService } from 'src/app/services/matches.service';
import * as _ from 'lodash';
import { Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import {
  faLeftLong,
  faSpinner,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { Layout } from 'src/app/enums/layout';
import { Matchday } from 'src/app/interfaces/matchday';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'bolao-matches',
  templateUrl: './matches.page.html',
  styleUrls: ['./matches.page.scss'],
  host: { class: 'flex-1 w-full flex flex-col' },
})
export class MatchesPage implements OnInit {
  filters = [
    { label: 'A', group: 1, active: true, size: 1 },
    { label: 'B', group: 2, active: true, size: 1 },
    { label: 'C', group: 3, active: true, size: 1 },
    { label: 'D', group: 4, active: true, size: 1 },
    { label: 'E', group: 5, active: true, size: 1 },
    { label: 'F', group: 6, active: true, size: 1 },
    { label: 'G', group: 7, active: true, size: 1 },
    { label: 'H', group: 8, active: true, size: 1 },
    { label: '1/8', group: 9, active: true, size: 2 },
    { label: '1/4', group: 10, active: true, size: 2 },
    { label: '1/2', group: 11, active: true, size: 2 },
    { label: 'Endspiele', group: 12, active: true, size: 2 },
  ];

  _matches: Matchday[] = [];
  isLoadingMatches = true;
  faLoading: IconDefinition = faSpinner;

  constructor(
    private matchesService: MatchesService,
    private scroller: ViewportScroller,
    private authService: AuthService
  ) {}

  get language(): string {
    return this.authService.language;
  }

  ngOnInit(): void {
    this.isLoadingMatches = true;
    this.matchesService.get().subscribe((matches) => {
      const grouping = _.groupBy(
        matches,
        (singleMatch) =>
          new Date(
            new Date(singleMatch.kickoff).getFullYear(),
            new Date(singleMatch.kickoff).getMonth(),
            new Date(singleMatch.kickoff).getDate()
          )
      );

      this._matches = _.map(grouping, (items, date) => ({
        date: new Date(date),
        matches: _.orderBy(items, ['kickoff', 'id'], ['asc']),
      }));

      const today = new Date();
      const now: Date = new Date(
        Date.UTC(
          today.getFullYear(),
          today.getMonth(),
          today.getDate(),
          0,
          0,
          0,
          0
        )
      );
      let anchor = 'day' + now.toISOString().substring(0, 10);
      this.scroller.scrollToAnchor(anchor);
      this.isLoadingMatches = false;
    });
  }

  get matches(): { date: Date; matches: Match[] }[] {
    return this._matches;
  }

  get selectedFilters(): number[] {
    return this.filters
      .filter((filter1) => filter1.active)
      .map((filter2) => filter2.group);
  }

  dateToString(date: Date): string {
    return date.toISOString().substring(0, 10);
  }

  scroll() {
    this.scroller.scrollToAnchor('day' + this.dateToString(new Date()));
  }

  get layout(): Layout {
    return this.matchesService.layout;
  }

  get isLargeLayout(): boolean {
    return this.layout == Layout.LARGE;
  }
}
