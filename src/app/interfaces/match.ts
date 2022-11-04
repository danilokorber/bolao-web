import { Bet } from './bet';
import { Team } from './team';
import { Venue } from './venue';

export interface Match {
  id: number;
  tournamentMatchId: number;
  groupId: number;
  kickoff: Date;
  venue: Venue;
  home: Team;
  away: Team;
  scoreHome?: number;
  scoreAway?: number;
  psoHome?: number;
  psoAway?: number;
  url: string;
  bets: Bet[];
}
