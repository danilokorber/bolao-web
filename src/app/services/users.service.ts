import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Urls } from 'src/environments/urls';
import { BonusBet } from '../interfaces/bet';
import { Profile } from '../interfaces/profile';

const BASE_URL = environment.configs.api.baseUrl;

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  getProfile(): Observable<Profile> {
    return this.http.get<Profile>(`${BASE_URL}${Urls.USERS_PROFILE}`);
  }

  acceptRules(guid: string): Observable<Profile> {
    return this.http.put<Profile>(
      `${BASE_URL}${Urls.USERS_ACCEPT_RULES.replace('{guid}', guid)}`,
      null
    );
  }

  acceptPreferences(guid: string, profile: Profile): Observable<Profile> {
    return this.http.put<Profile>(
      `${BASE_URL}${Urls.USERS_ACCEPT_PREFERENCES.replace('{guid}', guid)}`,
      profile
    );
  }

  acceptDataPrivacy(guid: string): Observable<Profile> {
    return this.http.put<Profile>(
      `${BASE_URL}${Urls.USERS_ACCEPT_DATA_PRIVACY.replace('{guid}', guid)}`,
      null
    );
  }

  bonusBets(guid: string, bets: BonusBet): Observable<Profile> {
    return this.http.put<Profile>(
      `${BASE_URL}${Urls.USERS_BONUS_BETS.replace('{guid}', guid)}`,
      bets
    );
  }

  confirmPayment(guid: string): Observable<Profile> {
    return this.http.put<Profile>(
      `${BASE_URL}${Urls.USERS_CONFIRM_PAYMENT.replace('{guid}', guid)}`,
      null
    );
  }
}
