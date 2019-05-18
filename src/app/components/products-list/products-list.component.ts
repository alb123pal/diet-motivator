import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
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
