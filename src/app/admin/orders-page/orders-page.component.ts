import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { OrderService } from 'src/app/shared/order.service';

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.css']
})
export class OrdersPageComponent implements OnInit {

  orders: any[] = [];
  pSub!: Subscription;
  rSub!: Subscription;

  constructor(
    private orderServ: OrderService
  ) { }

  ngOnInit(): void {
    this.pSub = this.orderServ.getAll().subscribe(orders => {
      this.orders = orders; 
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
    this.rSub = this.orderServ.remove(id).subscribe({
      next: () => {
        this.orders = this.orders.filter(order => order.id !== id);
      },
      error: (e) => console.log(e),
      complete: () => console.log('remove is complete')
    })
  }

}
