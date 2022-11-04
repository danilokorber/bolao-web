export interface Bet {
  id: string;
  matchId: number;
  userId: string;
  user: Bet_User;
  scoreHome: number;
  scoreAway: number;
  points: number;
  betPlacedOn: string;
  url: string;
  active: boolean;
}

export interface Bet_User {
  id: string;
  firstName: string;
  lastName: string;
  picture: string;
}

export interface BonusBet {
  first: string[];
  second: string[];
  third: string[];
  fourth: string[];
}
