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

  @Output()
  save: EventEmitter<{
    category?: string;
    firstName?: string;
    lastName?: string;
    number: number;
  }> = new EventEmitter();

  category: FormControl = new FormControl('');
  impersonate: FormControl = new FormControl('');
  number: FormControl = new FormControl(0);

  onSubmit(): void {
    const params = this.getParams();
    this.submit.emit(params);
  }

  onSave(): void {
    const params = this.getParams();
    console.log('onSave', params);
    this.save.emit(params);
  }

  private getParams(): any {
    return {
      category: this.category?.value,
      firstName: this.impersonate.value.split(' ')[0],
      lastName: this.impersonate.value
        .split(' ')
        .filter((_, i) => i !== 0)
        .join(' '),
      number: this.number.value,
    };
  }
}
