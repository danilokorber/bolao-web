import { Bet } from './bet';
import { Profile } from './profile';

export interface Ranking {
  user: Partial<Profile>;
  bets: Bet[];
  points: number;
}

export interface Position {
  position: number;
  ranking: Ranking;
}
