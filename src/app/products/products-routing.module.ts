import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products.component';
import { AllProductsComponent } from './all-products/all-products.component';
import { ViewProductsComponent } from './view-products/view-products.component';
import { CartProductsComponent } from './cart-products/cart-products.component';
import { WishlistProductsComponent } from './wishlist-products/wishlist-products.component';

const routes: Routes = [
  { path: '', component: AllProductsComponent },
  { path: 'ViewProduct/:id', component: ViewProductsComponent},
  { path: 'Cart', component: CartProductsComponent },
  { path: 'Wishlist', component: WishlistProductsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
