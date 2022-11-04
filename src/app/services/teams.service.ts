import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Urls } from 'src/environments/urls';
import { Team } from '../interfaces/team';

const BASE_URL = environment.configs.api.baseUrl;

@Injectable({
  providedIn: 'root',
})
export class TeamsService {
  constructor(private http: HttpClient) {}

  get(): Observable<Team[]> {
    return this.http.get<Team[]>(`${BASE_URL}${Urls.TEAMS}`);
  }
}
