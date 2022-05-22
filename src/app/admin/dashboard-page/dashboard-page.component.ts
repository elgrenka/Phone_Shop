import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/shared/product.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent implements OnInit {

  products: any[] = [];
  pSub!: Subscription;
  rSub!: Subscription;
  productName: any;

  constructor(
    private productServ: ProductService
  ) { }

  ngOnInit(): void {
    this.pSub = this.productServ.getAll().subscribe(products => {
      console.log(products);
      this.products = products; 
    })
  }

  ngOnDestroy() {
    if (this.pSub) {
      this.pSub.unsubscribe();
    }

    if (this.rSub) {
      this.rSub.unsubscribe();
    }
  }

  remove(id: any) {
    this.rSub = this.productServ.remove(id).subscribe({
      next: (v) => {
        console.log(v);
        this.products = this.products.filter(product => product.id !== id);
      },
      error: (e) => console.log(e),
      complete: () => console.log('remove is complete')
    })
  }

}
