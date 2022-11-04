import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Urls } from 'src/environments/urls';
import { Layout } from '../enums/layout';
import { Match } from '../interfaces/match';

const BASE_URL = environment.configs.api.baseUrl;

@Injectable({
  providedIn: 'root',
})
export class MatchesService {
  constructor(private http: HttpClient) {}

  get(): Observable<Match[]> {
    return this.http.get<Match[]>(`${BASE_URL}${Urls.MATCHES}`);
  }

  getNext(next: number): Observable<Match[]> {
    return this.http.get<Match[]>(`${BASE_URL}${Urls.MATCHES}`, {
      params: new HttpParams().set('next', next),
    });
  }

  getLive(): Observable<Match[]> {
    return this.http.get<Match[]>(`${BASE_URL}${Urls.MATCHES_LIVE}`);
  }

  get layout(): Layout {
    return <Layout>localStorage.getItem('layout') ?? Layout.LARGE;
  }

  set layout(layout: Layout) {
    localStorage.setItem('layout', layout.toString());
  }
}
