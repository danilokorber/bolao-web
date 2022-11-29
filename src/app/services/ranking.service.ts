import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Urls } from 'src/environments/urls';
import { Position, Ranking } from '../interfaces/ranking';

const BASE_URL = environment.configs.api.baseUrl;

@Injectable({
  providedIn: 'root',
})
export class RankingService {
  constructor(private http: HttpClient) {}

  get(): Observable<Ranking[]> {
    return this.http.get<Ranking[]>(`${BASE_URL}${Urls.RANKING}`);
  }
  getPosition(): Observable<Position> {
    return this.http.get<Position>(`${BASE_URL}${Urls.USERS_RANKING}`);
  }
  getHistory(): Observable<any> {
    return this.http.get<any>(`${BASE_URL}${Urls.USERS_HISTORY}`);
  }
}
