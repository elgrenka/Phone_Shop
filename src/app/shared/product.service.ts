import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { FbResponse, Product } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  create(product: any) {
    return this.http.post(`${environment.fbDbUrl}/products.json`, product)
    .pipe(map((res: FbResponse | any) => {
      return {
        ...product,
        id: res.name,
        date: new Date(product.date)
      }
    }))
  }

  getAll() {
    return this.http.get(`${environment.fbDbUrl}/products.json`)
    .pipe(map((res: any) => {
      return Object.keys(res)
      .map(key => ({
        ...res[key],
        id: key,
        date: new Date(res[key].date)
      }))
    }))
  }

  getById(id: any) {
    return this.http.get(`${environment.fbDbUrl}/products/${id}.json`)
    .pipe(map((res: Product | any) => {
      return {
        ...res,
        id,
        date: new Date(res.date)
      }
    }))
      
    
  }

}
