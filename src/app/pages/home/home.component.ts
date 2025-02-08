import { Component } from '@angular/core';
import { ProductListComponent } from '../products/product-list/product-list.component';

@Component({
  selector: 'app-home',
  imports: [ProductListComponent],
  template: `
    <!-- hero section -->
    <section align="center" class="hero-section">
      <div class="max-width">
        <h2>Bienvenue sur ngDuka</h2>
        <h3>Une boutique en lignbe pour la demo Http client en Angular</h3>
        <input type="text" placeholder="Rechercher un produit" type="search" />
      </div>
    </section>
    <section class="max-width cards">
      <br />
      <app-product-list
        sectionTitle="Electroniques"
        query="electronics"
        [queryCount]="4"
      />
      <br />
      <app-product-list
        sectionTitle="Bijoux"
        query="jewelery"
        [queryCount]="4"
      />
      <br />
      <app-product-list
        sectionTitle="Habillement pour hommes"
        query="men's clothing"
        [queryCount]="4"
      />
      <br />
      <app-product-list
        sectionTitle="Habillement pour femmes"
        query="women's clothing"
        [queryCount]="4"
      />
    </section>
  `,
  styles: `
    .hero-section {
      padding: 2rem;
      background: linear-gradient(90deg, #ff7f7f, #ffb6c1);
      margin: 20px 0;

      input {
        padding: 1rem 0.5rem ; 
        border: none;
        margin-top: 1rem;
        width: 50vw
      }
    }

    .cards{
      padding: 2rem;
    }

  `,
})
export default class HomeComponent {}
