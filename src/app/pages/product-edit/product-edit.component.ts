import { Product } from './../../types/Product';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-edit',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.css'
})
export class ProductEditComponent {
  productService = inject(ProductService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  productId!: string;
  addForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required, Validators.min(0)]),
    isShow: new FormControl('', [Validators.required]),
  });

  ngOnInit() {
    this.route.params.subscribe((param) => {
      this.productId = param['id']
      this.productService.getProduct(param['id']).subscribe({
        next: (data) => {
          this.addForm.patchValue(data);
        },
        error: () => { }
      });
    })

  }

  handleSubmit() {
    this.productService.getEdit(
      this.productId,
      this.addForm.value).subscribe({
        next: (data) => {
          console.log(data);
          alert('Sửa thành công');
          this.router.navigate(['/product/list']);
        },
        error: () => { }
      });
  }
}
