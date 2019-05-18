import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name: 'productFilter'
})
export class ProductFilterPipe implements PipeTransform {
    transform(products, filter: {[key: string]: any }) {
        if (!products || !filter) {
            return products;
        }
        if (filter['searchProduct'] !== undefined) {
            const filteredProduct = products.filter( (product: any) => {
                return product.name.toLowerCase().indexOf(filter.searchProduct.toLowerCase()) !== -1;
            });
            return filteredProduct;
        }
    }
}