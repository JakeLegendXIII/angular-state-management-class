import { Component, computed, effect, linkedSignal, signal } from '@angular/core';
import { Collapse } from '../../shared/widgets/collapse';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-signals-pages-index',
  imports: [Collapse],
  template: `
    <app-shared-collapse title="Signals Stuff">
      <p>
        <b>Signals</b> own some value, provide an immutable reference, and have methods to set them
        and update them.
      </p>
      <p><b>Computed</b> values are produced by one or more signals and a computation</p>
      <p><b>Linked Signal</b> Creates in essence a writeable computed</p>
      <p><b>Effect</b> returns void, does something based on a predicate on a signal or signals.</p>
      <p><b>Debounced Signals</b>May wait until the snapshot demo...</p>
    </app-shared-collapse>
    <div class="m-4">
      <button
        (click)="current.update((c) => c - countingBy())"
        class="btn btn-sm btn-circle btn-error"
      >
        -</button
      ><span class="font-mono text-2xl p-4 font-black">{{ current() }}</span>

      <button
        (click)="current.update((c) => c + countingBy())"
        class="btn btn-sm btn-circle btn-success"
      >
        +
      </button>
    </div>
    <div class="join">
      @for (b of byValues(); track b) {
        <button
          [aria-disabled]="countingBy() === b"
          (click)="countingBy.set(b)"
          class="btn join-item"
        >
          {{ b }}
        </button>
      }
    </div>
    <pre>{{ isEvenNumber() }}</pre>
  `,
  styles: ``,
})
export class Index {
  // angular 21-22.1 the reccomendation is protected readonly
  // (public is the default)

  constructor() {
    // you don't use these often - I'll show you something with routing later that I use it for.
    // you can do cleanup
    effect(() => {
      const countingBy = this.countingBy();
      const current = this.current();
      const val = JSON.stringify({ countingBy, current });
      localStorage.setItem('counting-stuff', val);
      console.log('changed something');
      if (this.current() > 100) {
        // call an api or something...
        // in other word DO something, don't calculte something.
        console.log('we have ourselves a big counter here, folks!');
      }
    });
  }
  private readonly current = signal(0);
  private readonly sortDirection = signal<'ascending' | 'descending'>('ascending');

  private readonly byValues = signal([2, 4, 8, 16]);

  // linkedSignal is like a computed, but you can write to it.
  private readonly countingBy = linkedSignal(() => this.byValues()[0]);
  // todo: fix this, jeff.
  // private readonly countingBy = linkedSignal<number, number[]>({
  //   source: this.byValues[0],
  //   computation: (old, newVal) => {
  //     console.log({ old, newVal });
  //     return newVal ?? 0;
  //   },
  // });

  private readonly isEvenNumber = computed(() => {
    // run this code anytime any of the signals captured in this function emit new values.
    return this.current() % 2 === 0;
  });
}
