import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Urls } from '@env/urls';
import { Question } from '@interfaces/question';
import { Observable } from 'rxjs';

const BASE_URL = environment.configs.api.baseUrl;

@Injectable({
  providedIn: 'root',
})
export class SurveyService {
  constructor(private http: HttpClient) {}

  save(answer: Partial<Question>): Observable<Question> {
    console.log(answer);

    return this.http.put<Question>(`${BASE_URL}${Urls.SURVEY_PUT}`, answer);
  }

  get(): Observable<Question[]> {
    return this.http.get<Question[]>(`${BASE_URL}${Urls.SURVEY_GET}`);
  }
}
