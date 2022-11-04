import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Urls } from 'src/environments/urls';
import { Bet } from '../interfaces/bet';
import { Match } from '../interfaces/match';

const BASE_URL = environment.configs.api.baseUrl;

@Injectable({
  providedIn: 'root',
})
export class BetService {
  constructor(private http: HttpClient) {}

  create(bet: Partial<Bet>): Observable<Bet> {
    return this.http.post<Bet>(`${BASE_URL}${Urls.BETS_CREATE}`, bet);
  }

  getBetsByMatch(match: Match): Observable<Bet[]> {
    return this.http.get<Bet[]>(
      `${BASE_URL}${Urls.BETS_GET_BY_MATCH}/${match.id}`
    );
  }
}
