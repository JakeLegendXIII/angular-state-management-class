import { JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { form, FormField, FormRoot, required } from '@angular/forms/signals';

type ContactItem = { kind: string; value: string };
type LibraryCardRequest = {
  name: {
    first: string;
    last: string;
  };
  primaryEmail: string;
  contactMechanisms: ContactItem[];
};

@Component({
  selector: 'app-card-home',
  imports: [FormRoot, FormField, JsonPipe],
  template: `
    <form [formRoot]="cardForm" class="flex flex-col w-1/2 p-18">
      <fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend class="fieldset-legend">Your Name</legend>

        <label class="label">First</label>
        <input
          type="text"
          class="input input-primary"
          placeholder="First Name"
          [formField]="cardForm.name.first"
        />

        <label class="label">Last</label>
        <input type="text" class="input" [formField]="cardForm.name.last" placeholder="Last Name" />
      </fieldset>
      <fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend class="fieldset-legend">Primary Email</legend>

        <label class="label">Email</label>
        <input
          type="email"
          class="input input-info"
          placeholder="Primary Email"
          [formField]="cardForm.primaryEmail"
        />
      </fieldset>
      <fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend class="fieldset-legend">Additional Contact Mechanisms</legend>
        <div class="flex flex-row gap-2">
          <button (click)="addPhone()" class="btn btn-sm btn-primary">Add Phone</button>
          <button (click)="addEmail()" class="btn btn-sm btn-primary">Add Email</button>
        </div>
        @for (c of model().contactMechanisms; track $index; let i = $index) {
          <label class="label">{{ c.kind }}</label>
          <input type="text" class="input" [formField]="cardForm.contactMechanisms[i].value" />
        }
      </fieldset>
      <button type="submit" class="btn btn-primary">Sign Up For Card</button>
    </form>
    <pre>

        {{ model() | json }}
    </pre>
  `,
  styles: ``,
})
export class CardHome {
  model = signal<LibraryCardRequest>({
    name: {
      first: '',
      last: '',
    },
    primaryEmail: '',
    contactMechanisms: [{ kind: 'email', value: '' }],
  });

  cardForm = form(this.model, (schema) => {
    required(schema.name.first);
  });

  addPhone() {
    const newItem: ContactItem = { kind: 'phone', value: '' };
    this.model.update((m) => ({ ...m, contactMechanisms: [newItem, ...m.contactMechanisms] }));
  }
  addEmail() {
    const newItem: ContactItem = { kind: 'email', value: '' };
    this.model.update((m) => ({ ...m, contactMechanisms: [newItem, ...m.contactMechanisms] }));
  }
}
