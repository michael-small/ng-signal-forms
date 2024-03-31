import { Component, inject } from '@angular/core';
import { JsonPipe } from '@angular/common';
import {
  SignalFormBuilder,
  SignalInputDirective,
  createFormGroup,
  withErrorComponent,
} from '@ng-signal-forms';
import { CustomErrorComponent } from '../custom-input-error.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-values-form',
  standalone: true,
  imports: [JsonPipe, SignalInputDirective, FormsModule],
  template: `
    <div>
      <div>
        <label for="">Name</label>
        <input ngModel [formField]="form.controls.name" aria-label="Name" />
      </div>

      <div>
        <label>Age</label>
        <input
          type="number"
          ngModel
          [formField]="form.controls.age"
          aria-label="Age"
        />
      </div>
    </div>
    <button (click)="reset()">Reset form</button>
    <button (click)="prefill()">Prefill form</button>
    <p>form.value().name: {{ form.value().name }}</p>
    <p>form.value().age: {{ form.value().age }}</p>
  `,
  styles: [],
  providers: [withErrorComponent(CustomErrorComponent)],
})
export default class ValuesComponent {
  form = createFormGroup<{ name: string; age: number | null }>({
    name: 'Alice',
    age: null,
  });
  reset() {
    this.form.reset();
  }

  prefill() {
    // TODO: improve this API to set form groups
    this.form.controls.age.value.set(42);
    this.form.controls.name.value.set('Bob');
  }
}
