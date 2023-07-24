import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.css']
})
export class ViewProductsComponent implements OnInit {
  productId:any;
  product: any={};
constructor(private viewActivateRouter:ActivatedRoute , private api:ApiService){}
  ngOnInit(): void {
    this.viewActivateRouter.params.subscribe((data:any) => {
      console.log(data); // id:"2"
      console.log(data.id); // 2
      this.productId = data.id;
      // view particular products details
      this.api.viewProduct(this.productId).subscribe((result:any) => {
        console.log(result); // id:"
        this.product = result
      })
    })
  }
  addToWishlist(){
    const{id,title,price,image} = this.product
    //api call 
    this.api.addToWishlist(id,title,price,image).subscribe((result:any) =>{
      alert(result);
    }, (err) =>{
      alert(err.error);
    })
  }
  addToCart(product:any){
    Object.assign(product,{quantity:1})
    console.log(product);  
    this.api.addToCart(product).subscribe((result:any)=>{
      this.api.cartCount()
      alert(result);
    },(err:any) =>{
      alert(err.error);
    })
  }
}
