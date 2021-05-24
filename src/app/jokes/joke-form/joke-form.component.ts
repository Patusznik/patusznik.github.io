import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Output()
  submit: EventEmitter<{
    category?: string;
    firstName?: string;
    lastName?: string;
  }> = new EventEmitter();

  category: FormControl = new FormControl('');
  impersonate: FormControl = new FormControl('');

  onSubmit(): void {
    const params = {
      category: this.category?.value,
      firstName: this.impersonate.value.split(' ')[0],
      lastName: this.impersonate.value
        .split(' ')
        .filter((_, i) => i !== 0)
        .join(' '),
    };
    this.submit.emit(params);
  }
}
