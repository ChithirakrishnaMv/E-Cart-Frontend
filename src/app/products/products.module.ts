import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { AllProductsComponent } from './all-products/all-products.component';
import { ViewProductsComponent } from './view-products/view-products.component';
import { CartProductsComponent } from './cart-products/cart-products.component';
import { WishlistProductsComponent } from './wishlist-products/wishlist-products.component';
import { HttpClientModule } from '@angular/common/http';
import { FilterPipe } from './pipes/filter.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPayPalModule } from 'ngx-paypal';



@NgModule({
  declarations: [
    ProductsComponent,
    AllProductsComponent,
    ViewProductsComponent,
    CartProductsComponent,
    WishlistProductsComponent,
    FilterPipe
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPayPalModule
  ]
})
export class ProductsModule { }
