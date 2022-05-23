import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OrderService } from '../shared/order.service';
import { ProductService } from '../shared/product.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {

  cartProducts: any[] = [];
  totalPrice: number = 0;
  form!: FormGroup;
  submitted = false;
  added = '';

  constructor(
    private productServ: ProductService,
    private orderServ: OrderService
  ) { }

  ngOnInit(): void {
    this.cartProducts = this.productServ.cartProducts
    for (let i = 0; i < this.cartProducts.length; i++) {
      this.totalPrice += Number(this.cartProducts[i].price);
    }

    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      phone: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      payment: new FormControl('Cash'),
    })
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;

    const order = {
      name: this.form.value.name,
      phone: this.form.value.phone,
      address: this.form.value.address,
      payment: this.form.value.payment,
      orders: this.cartProducts,
      price: this.totalPrice,
      date: new Date()
    }

    this.orderServ.create(order).subscribe({
      next: () => {
        this.form.reset();
        this.added = 'Delivery is framed';
        this.submitted = false;
      },
      error: (e) => {
        console.log(e)
        this.submitted = false;
      },
      complete: () => console.log('order is complete')
    });
  }

  delete(product: any) {
    this.totalPrice -= Number(product.price);
    this.cartProducts.splice(this.cartProducts.indexOf(product), 1);
  }

}
