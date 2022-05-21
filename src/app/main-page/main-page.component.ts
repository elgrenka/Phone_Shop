import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../shared/interfaces';
import { ProductService } from '../shared/product.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  products$!: Observable<Product[]>;

  constructor(
    private productServ: ProductService
  ) { }

  ngOnInit(): void {
    this.products$ = this.productServ.getAll();
  }

}
