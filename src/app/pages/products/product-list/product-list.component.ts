import {
  Component,
  inject,
  input,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { Product } from '../../../core/models/product.model';
import { ApiService } from '../../../core/services/api.service';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { SkeletonProductListLoadingComponent } from '../../shared/skeleton-loading/skeleton-product-list-loading.component';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-product-list',
  imports: [RouterLink, SkeletonProductListLoadingComponent, NgOptimizedImage],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent implements OnInit, OnDestroy {
  sectionTitle = input.required<string>();
  query = input.required<string>();
  queryCount = input<number>();
  loading = signal(true);
  products?: Product[];
  api = inject(ApiService);
  productsSub?: Subscription;
  private router = inject(Router);
  private title = inject(Title);
  ngOnInit(): void {
    const products$ =
      this.query() === 'allProducts'
        ? this.api.getProducts()
        : this.api.getProductsByCategory(this.query(), this.queryCount());
    products$.subscribe((products) => {
      this.products = products;
      if (this.router.url.includes('products')) {
        this.title.setTitle(`${this.products[0].category} - ngDuka`);
      }
      this.loading.set(false);
    });
  }

  ngOnDestroy(): void {
    this.productsSub?.unsubscribe();
  }
}
