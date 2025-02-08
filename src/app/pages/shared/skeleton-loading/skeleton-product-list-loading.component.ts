import { Component } from '@angular/core';

@Component({
  selector: 'app-skeleton-product-list-loading',
  imports: [],
  template: `
    <div class="max-width cards-loading">
      @for (item of [1,2,3,4]; track $index) {
      <div class="skeleton-wrapper">
        <div class="skeleton skeleton-image"></div>
        <div class="skeleton skeleton-title"></div>
        <div class="skeleton skeleton-text"></div>
        <div class="skeleton skeleton-text"></div>
      </div>
      }
    </div>
  `,
  styles: `
    .cards-loading {
      display: flex;
      gap: 1rem;
    }
  `,
})
export class SkeletonProductListLoadingComponent {}
