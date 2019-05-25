import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, fromEvent  } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';


@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  @ViewChild('searchProductInput') searchProductInput: ElementRef;
  allProducts = []
  foundProduct: string;
  productFilter: Object;
  searchProductInputStreams: Observable<any>;
  private baseUrl = 'https://trackapi.nutritionix.com/v2/search/';

  constructor(private _httpClient: HttpClient) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.searchProductInputStreams = fromEvent(this.searchProductInput.nativeElement, 'keyup').pipe(
      debounceTime(1000),
      map((key) => key['target'].value),
    );

    this.searchProductInputStreams.subscribe((nameOfProduct: string) => {
      if (nameOfProduct === '') {
        this.allProducts = [];
        return ;
     }
 
     this.getProducts(nameOfProduct).subscribe((products) => {
       this.displayProducts(products);
      });
    });
  }

  getProducts(nameOfProduct: string): Observable<any> {
    return this._httpClient.get(this.baseUrl  + `instant?query="${nameOfProduct}"&detailed=True`, {
      headers: new HttpHeaders({
        'x-app-id': '727333ed',
        'x-app-key': '23c6b36f9b39112e54797023d2e74008',
        'x-remote-user-id': '0'
    }),
      observe: 'response',
    }).pipe(
      map((data) => {
        const productsList = data.body['branded'];
        
        return this.mapProductsToList(productsList);
      })
    );
  }

  displayProducts(productsList: Array<any>) {
      this.allProducts = productsList;
  }

  mapProductsToList(productsList: Array<any>) {
    const mappedProductsList = [];

    productsList.map((product) => {
      const productDetail = {
        'name': product.food_name,
        'kcal': product.nf_calories,
        'protein': product.full_nutrients[0].value,
        'fat': product.full_nutrients[1].value,
        'carbo': product.full_nutrients[2].value
      };
      mappedProductsList.push(productDetail);
    });
    return mappedProductsList;
  }
}
