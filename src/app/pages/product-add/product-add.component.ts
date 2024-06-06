import { ProductService } from './../../product.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-product-add',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './product-add.component.html',
  styleUrl: './product-add.component.css'
})
export class ProductAddComponent {
  productService = inject(ProductService);
  router = inject(Router);
  addForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required, Validators.min(0)]),
    isShow: new FormControl('', [Validators.required]),
  });

  handleSubmit() {
    this.productService.getAdd(this.addForm.value).subscribe({
      next: (data) => {
        console.log(data);
        alert('Thêm thành công!');
        this.router.navigate(['/product/list']);
      },
      error: () => { }
    });
  }
}
  