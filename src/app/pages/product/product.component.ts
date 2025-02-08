import {
  Component,
  inject,
  input,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { Product } from '../../core/models/product.model';
import { ApiService } from '../../core/services/api.service';
import { ProductListComponent } from '../products/product-list/product-list.component';
import { ActivatedRoute } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { SkeletonProductListLoadingComponent } from '../shared/skeleton-loading/skeleton-product-list-loading.component';

@Component({
  selector: 'app-product',
  imports: [ProductListComponent, SkeletonProductListLoadingComponent],
  template: `
    <!-- product page-->

    <main class="max-width">
      @if(loading()){
      <div class="">
        <div class="skeleton-container">
          <div class="skeleton skeleton-image h-full"></div>
          <div class="skeleton skeleton-image h-full"></div>
        </div>
        <app-skeleton-product-list-loading />
      </div>

      }@else {
      <div>
        <div>
          <div class="product">
            <div class="image">
              <img [src]="product?.image" alt="product image" />
            </div>
            <div class="product-details">
              <h2>{{ product?.title }}</h2>
              <p>{{ product?.description }}</p>
              <p>Category: {{ product?.category }}</p>
              <p>Price: {{ product?.price }}</p>
              <p>Rating: {{ product?.rating?.rate }}</p>
              <p>Rating Count: {{ product?.rating?.count }}</p>

              <!-- action for cart and quantity -->
              <div class="action">
                <div>
                  <button (click)="qtyHandling('add')">+</button>
                  <span>{{ productQty() }}</span>
                  <button
                    (click)="qtyHandling('sub')"
                    [disabled]="productQty() === 1"
                  >
                    -
                  </button>
                </div>
                <button (click)="addToCart(product!)">Add to Cart</button>
              </div>
              <!-- total -->
              <hr />
              <div class="total">
                <p>
                  <strong>Total :</strong>
                  {{ product?.price! * productQty() }} $
                </p>
              </div>
            </div>
          </div>
        </div>
        <app-product-list
          sectionTitle="Aimeriez-vous ceci : "
          [query]="'allProducts'"
        />
      </div>
      }
    </main>
  `,
  styles: `

  .loading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 70vh;
    animation: bounce 2s infinite;

    @keyframes bounce {
      0% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-20px);
      }
      100% {
        transform: translateY(0);
      }
    }
  }

  .skeleton-container {
    display: flex;
    gap: 1rem;
    align-items: center;
    margin: 2rem 0;
    min-height: 40vh;
   .h-full{
      height: 100%;
   }
  }
    main {
      padding: 2rem;
  }
  .image {
    
    height: 100%;
    
  }
  
    .product {
      display: flex;
      gap: 2rem;
      width: 100%;
      min-height: 80vh;
      justify-content: space-between;
      align-items: center;
      margin: 2rem 0;

      .total{
        display: flex;
        justify-content: flex-end;
        margin-top: 1rem;
        border: 1px solid #ccc;
        padding: 1rem;
      }

      .action {
        display: flex;
        gap: 1rem;
        align-items: center;
        justify-content: space-between;
        margin-top: 1rem;
        button {
          padding: 0.5rem 1rem;
          border: none;
          background: #ff7f7f;
          color: white;
          cursor: pointer;

          &:disabled {
            background: #ccc;
            cursor: not-allowed;
          }
        }

        div {
          display: flex;
          gap: 1rem;
          align-items: center;
        }
      }
    }
    .product img {
      width: 50%;
    }
    .product-details {
      width: 50%;
    }
  `,
})
export default class ProductComponent implements OnInit, OnDestroy {
  product?: Product;
  private api = inject(ApiService);
  route = inject(ActivatedRoute);
  loading = signal(true);
  title = inject(Title);

  productQty = signal(1);

  routeSub?: Subscription;

  ngOnInit(): void {
    this.routeSub = this.route.params
      .pipe(switchMap(({ id }) => this.api.getOneProduct(+id)))
      .subscribe((product) => {
        this.product = product;
        this.title.setTitle(`${this.product.title} - ngDuka`);
        this.loading.set(false);
      });
  }

  qtyHandling = (type: string) => {
    if (type === 'add') {
      this.productQty.set(this.productQty() + 1);
    } else {
      this.productQty.set(this.productQty() - 1);
    }
  };

  addToCart = (product: Product) => {
    this.api.cartProductCount.update((count) => count + 1);
  };
  ngOnDestroy(): void {
    this.routeSub?.unsubscribe();
  }
}
