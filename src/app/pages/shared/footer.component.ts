import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  template: `
    <footer class="">
      <div class="footer-container max-width">
        <div class="left-container">
          <div>
            <p>
              <b> PRODUITS </b>
            </p>
            <a routerLink="/products/electronics"> Électronique </a>
            <!-- lien pour : Bijoux (/products/jewery) -->
            <a routerLink="/products/jewelry"> Bijoux </a>
            <!-- lien pour : Vêtements hommes (/products/men's clothing) -->
            <a routerLink="/products/men's clothing"> Vêtements hommes </a>
            <!-- lien pour : Vêtements femmes (/products/w
            omen's clothing) -->
            <a routerLink="/products/women's clothing"> Vêtements femmes </a>
          </div>
          <div>
            <p>
              <b>LIENS</b>
            </p>
            <a routerLink="/about"> À propos </a>
            <a routerLink="/contact"> Contact </a>
            <a routerLink="/faq"> FAQ </a>
          </div>
        </div>
        <p class="right">
          <b>ngDuka {{ date.getFullYear() }}</b> <br />
          Developpé par Aksanti Tech, propulsé par Malaksi
        </p>
      </div>
    </footer>
  `,
  styles: `
    footer {
      background-color: #f8f8f8;
      padding: 1rem;
    }
    .footer-container {
      display: flex;
      justify-content: space-between;
    }
    .left-container {
      display: flex;
    }
    .left-container div {
      margin-right: 2rem;
    }
    a {
      color: #333;
      text-decoration: none;
      display: block;
      margin-bottom: 0.5rem;
    }
    a:hover {
      color: #007bff;
    }

    // make the right text align to the right and to the bottom
    .right {
      text-align: right;
      align-self: flex-end;
    }
  `,
})
export class FooterComponent {
  date = new Date();
}
