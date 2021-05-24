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
  impersonated: boolean = false;

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

  getJoke({ category, firstName, lastName }): void {
    this.jokesService
      .getRandomJoke({ limitTo: category, firstName, lastName })
      .pipe(
        tap((val: Joke) => {
          this.joke = val.joke;
          this.impersonated = !!firstName || !!lastName;
        }),
        first()
      )
      .subscribe();
  }

  saveJokes({ category, firstName, lastName, number }): void {
    console.log({ category });
    console.log('hejo');
    this.jokesService
      .getRandomJokes({ limitTo: category, firstName, lastName }, number)
      .pipe(
        tap((val: Joke[]) => {
          console.log(val);
          const blob = new Blob([JSON.stringify(val, null, 2)], {
            type: 'text/plain',
          });
          this.downloadFile(blob, `${number}_chuck_norris_jokes.txt`);
        }),
        first()
      )
      .subscribe();
  }

  private downloadFile(blob: Blob, name: string) {
    if (window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(blob, name);
      return;
    }
    const downloadLink = document.createElement('a');
    downloadLink.href = window.URL.createObjectURL(blob);
    downloadLink.setAttribute('download', name);
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }
}
