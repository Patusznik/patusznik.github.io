import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'chuck-jokes',
  templateUrl: './jokes.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JokesComponent {
  categories: string[] = this.route.snapshot.data.categories;

  constructor(private route: ActivatedRoute) {}
}
