import { CurrencyPipe } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { Component } from '@angular/core';
import { ResourceDisplay } from '../../shared/resource-display';
import { ProductModel } from '../types';
import { ResourceErrorDisplay } from '../../shared/error-display';

@Component({
  selector: 'app-products-index',
  imports: [ResourceDisplay, CurrencyPipe, ResourceErrorDisplay],
  template: `
    <p>Products Index Page</p>
    <app-shared-resource-display [resource]="productsResource">
      <div class="overflow-x-auto">
        <table class="table">
          <!-- head -->
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            <!-- row 1 -->
            @for (product of productsResource.value(); track product.id) {
              <tr>
                <th>{{ product.id }}</th>
                <td>{{ product.name }}</td>
                <td>{{ product.price | currency }}</td>
              </tr>
            }
            <!-- row 2 -->
          </tbody>
        </table>
      </div>
      <app-shared-resource-error-display>
        <p>Bummer! No Product List for you!</p>
      </app-shared-resource-error-display>
    </app-shared-resource-display>
  `,
  styles: ``,
})
export class Index {
  private readonly productsResource = httpResource<ProductModel[]>(() => '/api/products');
}
