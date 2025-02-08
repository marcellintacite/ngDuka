import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'ng duka',
    loadComponent: () => import('./pages/home/home.component'),
  },
  {
    path: 'products/:category',
    loadComponent: () => import('./pages/products/products.component'),
    title: 'Products',
  },
  {
    path: 'product/:id',
    loadComponent: () => import('./pages/product/product.component'),
    title: 'Product',
  },
];
