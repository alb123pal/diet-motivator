import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  // Allproducts powinny bc pobierane z api w ngOnInit -> trzeba wykonac request do backendu
  allProducts = [
    {
      'name': 'Kotlet',
      'kcal': 1200,
      'protein': 33,
      'carbo': 25,
      'fat': 13
    },
    {
      'name': 'Pierogi',
      'kcal': 1600,
      'protein': 33,
      'carbo': 225,
      'fat': 133
    }
  ]
  foundProduct: string;
  productFilter: Object;

  constructor(private _httpClient: HttpClient) { }

  ngOnInit() {
    this.getAllProducts().subscribe((data) => {
      console.log(data);
    })
  }

  getAllProducts() {
    const prawidlowyRequest = 'https://trackapi.nutritionix.com/v2/search/item?nix_item_id=513fc9e73fe3ffd40300109f';
    // let body =JSON.stringify({
    //   'query':"2 eggs",
    //   'timezone': "US/Eastern"
    // })
      return this._httpClient.get(`https://trackapi.nutritionix.com/v2/search/instant?query="banan"&detailed=True`,
        { headers: new HttpHeaders({
          'x-app-id': '727333ed',
          'x-app-key': '23c6b36f9b39112e54797023d2e74008',
          'x-remote-user-id': '0'
      }),
    observe: 'response',
    })
  }
  searchProduct(event) {
    this.productFilter = {};
    if (event.target.value === '') {
        this.productFilter = {};
    }
    this.productFilter = {
        'searchProduct': event.target.value
    };
  }

}
