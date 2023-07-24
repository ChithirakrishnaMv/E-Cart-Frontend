import { Component,OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-wishlist-products',
  templateUrl: './wishlist-products.component.html',
  styleUrls: ['./wishlist-products.component.css']
})
export class WishlistProductsComponent implements OnInit {
  allWishlist:any=[];
  constructor(public api: ApiService){}
  ngOnInit(): void {
    this.api.getAllWishlist().subscribe((result:any) =>{
      console.log(result);
      this.allWishlist = result
    },(error:any) =>{
      console.log(error.error);
    }) 
  }

  // deleteWishlist product
  deleteWishlist(id:any){
    this.api.deleteWishlist(id).subscribe((result:any) =>{
      console.log(result); // remaining wishlist products after delete
      this.allWishlist = result;
    })
  }

  addToCart(product:any){
    //add quantity to cart
    Object.assign(product, { quantity:1 })
    this.api.addToCart(product).subscribe((result:any) =>{
      this.api.cartCount()
      this.deleteWishlist(product.id)
      alert(result);
    },(err:any) =>{
      alert(err.error)
    })
  }
}
