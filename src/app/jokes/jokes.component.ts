import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';
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
      .getJokes()
      .pipe(
        tap((val: Joke[]) => {
          this.joke = val[0].joke;
        })
      )
      .subscribe();
  }
}
