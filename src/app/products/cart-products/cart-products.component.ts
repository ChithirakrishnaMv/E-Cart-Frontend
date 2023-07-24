import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormBuilder, Validators } from '@angular/forms';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';

@Component({
  selector: 'app-cart-products',
  templateUrl: './cart-products.component.html',
  styleUrls: ['./cart-products.component.css'],
})
export class CartProductsComponent implements OnInit {

  public payPalConfig?: IPayPalConfig;
  //to hold cart product
  allCart: any = [];
  CartCounts: string = '';
  totalPrice = 0; // to hold total price
  username: string = '';
  houseNo: string = '';
  streetName: string = '';
  state: string = '';
  phone: string = '';
  offerClicked: boolean = false;
  paymentStatus: boolean = false;
  discountClicks: boolean = false;
  discountedAmount: number = 0;
  discountPercentage: number = 0;
  showSuccess: boolean = false;
  showPayPalStatus: boolean = false;
  
  constructor(public api: ApiService, public Fb: FormBuilder) {}

  addressForm = this.Fb.group({
    username: ['', [Validators.required, Validators.pattern('[A-Za-z ]*')]],
    houseNo: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    streetName: ['', [Validators.required, Validators.pattern('[A-Za-z ]*')]],
    state: ['', [Validators.required, Validators.pattern('[A-Za-z ]*')]],
    phone: ['', [Validators.required, Validators.pattern('[0-9]*')]],
  });

  ngOnInit(): void {
    this.api.cartItemCount.subscribe((data: any) => {
      console.log(data);
      this.CartCounts = data;
      this.initConfig();
    });

    // this.initConfig();

    this.api.getAllCart().subscribe(
      (result: any) => {
        console.log(result);
        this.api.cartCount();
        this.allCart = result;
        this.getCartTotal();
      },
      (error: any) => {
        console.log(error.error);
      }
    );
  }
  //remove items from cart
  deleteCart(id: any) {
    this.api.deleteCart(id).subscribe(
      (result: any) => {
        console.log(result); // remaining wishlist products after delete
        this.api.cartCount();
        this.allCart = result;
        this.getCartTotal();
      },
      (err: any) => {
        alert(err.error);
      }
    );
  }

  getCartTotal() {
    let total = 0;
    this.allCart.forEach((result: any) => {
      total += result.grandTotal;
      this.totalPrice = Math.ceil(total);
    });
  }

  incrementCartTotal(id: any) {
    this.api.incrementCartCount(id).subscribe(
      (result: any) => {
        this.allCart = result;
        this.getCartTotal();
      },
      (err: any) => {
        alert(err.error);
      }
    );
  }

  decrementCartTotal(id: any) {
    this.api.decrementCartCount(id).subscribe(
      (result: any) => {
        this.allCart = result;
        this.getCartTotal();
        this.CartCounts;
      },
      (err: any) => {
        alert(err.error);
      }
    );
  }
  submitPay() {
    if (this.addressForm.valid) {
      this.username = this.addressForm.value.username || '';
      this.houseNo = this.addressForm.value.houseNo || '';
      this.streetName = this.addressForm.value.streetName || '';
      this.state = this.addressForm.value.state || '';
      this.phone = this.addressForm.value.phone || '';

      this.paymentStatus = true;

    } else {
      alert('Invalid Form');
    }
  }
  offerClick() {
    this.offerClicked = true;
    this.discountClicks = true

  }
  discount(value:any){
    this.totalPrice = (this.totalPrice * (100 - value)) / 100;
    this.discountedAmount = this.totalPrice * (value / 100);
    this.totalPrice -= this.discountedAmount;
    this.discountPercentage = value;
    this.offerClicked = false;

  }
  // paypal payment
  private initConfig(): void {
    this.payPalConfig = {
    currency: 'EUR',
    clientId: 'sb',
    createOrderOnClient: (data) => <ICreateOrderRequest>{
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'EUR',
            value: '9.99',
            breakdown: {
              item_total: {
                currency_code: 'EUR',
                value: '9.99'
              }
            }
          },
          items: [
            {
              name: 'Enterprise Subscription',
              quantity: '1',
              category: 'DIGITAL_GOODS',
              unit_amount: {
                currency_code: 'EUR',
                value: '9.99',
              },
            }
          ]
        }
      ]
    },
    advanced: {
      commit: 'true'
    },
    style: {
      label: 'paypal',
      layout: 'vertical'
    },
    onApprove: (data, actions) => {
      console.log('onApprove - transaction was approved, but not authorized', data, actions);
      actions.order.get().then((details:any) => {
        console.log('onApprove - you can get full order details inside onApprove: ', details);
      });
    },
    onClientAuthorization: (data) => {
      console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
      this.showSuccess = true;
    },
    onCancel: (data, actions) => {
      console.log('OnCancel', data, actions);
    },
    onError: err => {
      console.log('OnError', err);
    },
    onClick: (data, actions) => {
      console.log('onClick', data, actions);
    },
  };
  }
  // make a payment click event 
  payPalPay(){
    this.showPayPalStatus = true;
  }
  modalClose(){
    this.addressForm.reset();
    this.showPayPalStatus = false;
    this.showSuccess = false;
    this.paymentStatus = false;
  }
}
