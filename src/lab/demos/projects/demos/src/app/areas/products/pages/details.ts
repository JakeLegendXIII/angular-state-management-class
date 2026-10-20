import { JsonPipe } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-products-details',
  imports: [JsonPipe],
  template: ` 
  <p>Showing the details for product {{ id() }}</p> 
  <pre>
    {{ productResource.value() | json }}
  </pre>
  `,
  styles: ``,
})
export class Details {
  id = input<number>();

  // first way - not so great, but non-experimental
  productResource = httpResource(() => `/api/products/${this.id()}`);
}
