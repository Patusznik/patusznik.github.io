import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'chuck-joke-form',
  templateUrl: './joke-form.component.html',
  styleUrls: ['./joke-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JokeFormComponent {
  @Input()
  categories: string[];

  category: FormControl = new FormControl('');
  impersonate: FormControl = new FormControl('');
}
