import { Component, Input, OnInit } from '@angular/core';
import { Bet } from '@interfaces/bet';

@Component({
  selector: 'bet-detail',
  templateUrl: './bet-detail.component.html',
  styles: [],
  host: { class: 'w-full px-2' },
})
export class BetDetailComponent implements OnInit {
  @Input() bet!: Bet;
  constructor() {}

  ngOnInit(): void {}
}
