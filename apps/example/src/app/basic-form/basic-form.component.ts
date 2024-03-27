import { Component, effect, inject } from '@angular/core';
import {
  createFormGroup,
  SignalInputDebounceDirective,
  SignalInputDirective,
  SignalInputErrorDirective,
  withErrorComponent,
} from '@ng-signal-forms';
import { JsonPipe, NgFor, NgIf } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomErrorComponent } from '../custom-input-error.component';

@Component({
  selector: 'app-basic-form',
  template: `
    <div class="container">
      <div>
        <h2>Signal</h2>

        <div>
          <label>Name</label>
          <input ngModel [formField]="form.controls.name" />
        </div>

        <div>
          <label>Age</label>
          <input type="number" ngModel [formField]="form.controls.age" />
        </div>
      </div>

      <div [formGroup]="reactiveForm">
        <h2>Reactive</h2>
        <div>
          <label>Name</label>
          <input [formControl]="reactiveForm.controls.name" />
        </div>

        <div>
          <label>Age</label>
          <input type="number" [formControl]="reactiveForm.controls.age" />
        </div>
      </div>

      <div>
        <button (click)="reset()">Reset form</button>
        <button (click)="prefill()">Prefill form (each set)</button>
        <button (click)="prefillGroup()">Prefill form (form setter)</button>

        <h3>States</h3>
        <pre
          >{{
            {
              state: form.state(),
              dirtyState: form.dirtyState(),
              touchedState: form.touchedState(),
              valid: form.valid()
            } | json
          }}
    </pre>

        <h3>Value</h3>
        <pre>{{ form.value() | json }}</pre>

        <h2>Reactive Form</h2>
        <h3>States</h3>
        <pre
          >{{
            {
              state: reactiveForm.status === 'VALID' ? 'VALID' : 'INVALID',
              dirtyState: reactiveForm.dirty ? 'DIRTY' : 'PRISTINE',
              touchedState: reactiveForm.touched ? 'TOUCHED' : 'UNTOUCHED',
              valid: reactiveForm.valid ? 'VALID' : 'INVALID'
            } | json
          }}
    </pre>

        <h3>Value</h3>
        <pre>{{ reactiveForm.value | json }}</pre>

        <h3>Errors</h3>
        <pre>{{ form.errorsArray() | json }}</pre>
      </div>
    </div>
  `,
  standalone: true,
  imports: [
    JsonPipe,
    FormsModule,
    SignalInputDirective,
    SignalInputErrorDirective,
    NgIf,
    NgFor,
    SignalInputDebounceDirective,
    ReactiveFormsModule,
  ],
  providers: [withErrorComponent(CustomErrorComponent)],
})
export default class BasicFormComponent {
  form = createFormGroup<{ name: string; age: number | null }>({
    name: 'Alice',
    age: null,
  });

  fb = inject(FormBuilder);
  reactiveForm = this.fb.group<{ name: string; age: number | null }>({
    name: 'Alice',
    age: null,
  });

  formChanged = effect(() => {
    console.log('form changed:', this.form.value());
  });

  nameChanged = effect(() => {
    console.log('name changed:', this.form.controls.name.value());
  });

  ageChanged = effect(() => {
    console.log('age changed:', this.form.controls.age.value());
  });

  reset() {
    this.form.reset();
    this.reactiveForm.reset();
  }

  // Implemented for now to debug the form group value set function
  ngOnInit() {
    // this.form.setFormGroupValue({
    //   name: 'hi signal form',
    //   age: 50,
    // });
    // this.reactiveForm.setValue({
    //   name: 'hi reactive form',
    //   age: 50,
    // });
  }

  prefill() {
    // TODO: improve this API to set form groups
    this.form.controls.age.value.set(42);
    this.form.controls.name.value.set('Bob');

    this.reactiveForm.controls.age.setValue(42);
    this.reactiveForm.controls.name.setValue('Bob');
  }

  prefillGroup() {
    this.form.setFormGroupValue({
      name: 'Bob',
      age: 42,
    });
    this.reactiveForm.setValue({
      name: 'Bob',
      age: 42,
    });

    console.log(this.reactiveForm);
  }
}
