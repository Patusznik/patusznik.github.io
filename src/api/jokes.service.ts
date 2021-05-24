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
  private readonly DEFAULT_CATEGORY = 'random';

  constructor(private http: HttpClient) {}

  getJokes(
    category = this.DEFAULT_CATEGORY,
    number = 1,
    jokesParams?: JokeParams
  ): Observable<Joke[]> {
    const firstNameParam = `${
      jokesParams?.firstName ? `firstName=${jokesParams.firstName}` : ``
    }`;
    const lastNameParam = `${
      jokesParams?.lastName ? `&lastName=${jokesParams.lastName}` : ``
    }`;

    const params: HttpParams = new HttpParams({
      fromString: firstNameParam + lastNameParam,
    });
    return this.http
      .get<{ type: string; value: Joke[] }>(
        `${this.path}/${category}/${number}`,
        { params }
      )
      .pipe(map(({ type, value }) => value));
  }
}
