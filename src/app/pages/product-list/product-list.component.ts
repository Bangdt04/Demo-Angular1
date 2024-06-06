import { RouterLink } from '@angular/router';
import { Product } from '../../types/Product';
import { ProductService } from './../../product.service';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {

  productService = inject(ProductService);
  products: Product[] = [];

  ngOnInit() {
    this.productService.getAll().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: () => { }
    });
  }
  handleDelete(id: string) {
    if (window.confirm('Bạn có chắc muốn xóa không?')){
      this.productService.getDelete(id).subscribe({
        next: () => {
          console.log('Xóa');
          this.products  = this.products.filter(product => product.id !== id);
        },
        error: () => {}
      });
    }
  }
}
