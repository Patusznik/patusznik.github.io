import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { Joke, JokeParams } from './models';

@Injectable({
  providedIn: 'root',
})
export class JokesService {
  private path = `${environment.apiUrl}/jokes`;

  constructor(private http: HttpClient) {}

  getRandomJoke(jokesParams?: JokeParams): Observable<Joke> {
    const params: HttpParams = new HttpParams({
      fromObject: this.getHttpParams(jokesParams),
    });
    return this.http
      .get<{ type: string; value: Joke }>(`${this.path}/random`, {
        params,
      })
      .pipe(map(({ type, value }) => value));
  }

  getRandomJokes(jokesParams: JokeParams, number: number): Observable<Joke[]> {
    const params: HttpParams = new HttpParams({
      fromObject: this.getHttpParams(jokesParams),
    });
    return this.http
      .get<{ type: string; value: Joke[] }>(`${this.path}/random/${number}`, {
        params,
      })
      .pipe(map(({ type, value }) => value));
  }

  private getHttpParams(jokesParams: JokeParams): { [key: string]: string } {
    return (
      jokesParams &&
      Object.keys(jokesParams)?.reduce((prev, curr) => {
        if (!!jokesParams[curr]) {
          prev[curr] = jokesParams[curr];
        }
        return prev;
      }, {})
    );
  }
}
