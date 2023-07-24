import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient ) { 
    this.cartCount()
  }

  // BASE_URL = 'http://localhost:5000';

  BASE_URL = 'https://e-cart-backend-b1id.onrender.com'
  
  //to hold cart count 
  cartItemCount = new BehaviorSubject(0)
  // to hold search data
  searchTerm =  new BehaviorSubject('');
  // Get all products from mongodb
  getAllProducts(){
    return this.http.get(`${this.BASE_URL}/products/allProducts`)
  }
  // view particular products
  viewProduct(id:any){
    return this.http.get(`${this.BASE_URL}/products/viewProduct/${id}`)
  }
  // Add wishlist 
  addToWishlist(id:any, title:any, price:any, image:any){
    const body = { id ,title ,price , image }
    return this.http.post(`${this.BASE_URL}/products/addWishlist`,body)
  }
  getAllWishlist(){
    return this.http.get(`${this.BASE_URL}/products/viewWishlist`)
  }
  deleteWishlist(id:any){
    return this.http.delete(`${this.BASE_URL}/products/deleteWishlist/${id}`)
  }
  addToCart(product:any){
    const body = {
       id:product.id,
       title:product.title,
       price:product.price,
       image:product.image,
       quantity:product.quantity }
    return this.http.post(`${this.BASE_URL}/products/addToCart`,body)
  }
  getAllCart(){
    return this.http.get(`${this.BASE_URL}/products/viewCart`)
  }
  cartCount(){
    this.getAllCart().subscribe((result: any) => {
      this.cartItemCount.next(result.length); //5
    })
  }
  deleteCart(id:any){
    return this.http.delete(`${this.BASE_URL}/products/deleteCart/${id}`)
  }
  incrementCartCount(id:any){
    return this.http.get(`${this.BASE_URL}/products/increment/${id}`)
  }
  decrementCartCount(id:any){
    return this.http.get(`${this.BASE_URL}/products/decrement/${id}`)
  }
}
