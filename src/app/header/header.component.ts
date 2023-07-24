import { Component,OnInit } from '@angular/core';
import { ApiService } from '../products/services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  CartCounts: string ='';

  constructor(private api: ApiService) {}
  ngOnInit(): void {
    this.api.cartItemCount.subscribe((data:any) => {
      console.log(data);  
      this.CartCounts = data
    })
  }

  Search(event: any) {
    console.log(event.target.value);
    this.api.searchTerm.next(event.target.value);
    //to assign new value to behavior subject uses next() method
  }
}
