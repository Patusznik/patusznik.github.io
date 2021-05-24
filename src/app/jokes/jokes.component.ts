import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first, tap } from 'rxjs/operators';
import { JokesService } from 'src/api';
import { Joke } from 'src/api/models';

@Component({
  selector: 'chuck-jokes',
  templateUrl: './jokes.component.html',
})
export class JokesComponent implements OnInit {
  categories: string[] = this.route.snapshot.data.categories;
  joke: string;

  constructor(
    private route: ActivatedRoute,
    private jokesService: JokesService
  ) {}

  ngOnInit(): void {
    this.jokesService
      .getRandomJoke()
      .pipe(
        tap((val: Joke) => {
          this.joke = val.joke;
        })
      )
      .subscribe();
  }

  getJoke({ category, firstName, lastName }) {
    this.jokesService
      .getRandomJoke({ limitTo: category, firstName, lastName })
      .pipe(
        tap((val: Joke) => {
          this.joke = val.joke;
        }),
        first()
      )
      .subscribe();
  }
}
