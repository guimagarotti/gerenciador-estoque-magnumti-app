import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-produto-form',
  templateUrl: './produto-form.component.html',
  styleUrls: ['./produto-form.component.css']
})
export class ProdutoFormComponent {

  produtoForm: FormGroup | any;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.produtoForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      status: [true],
      //ENUM
      category: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      code: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      manufacturer: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      quantity: [null, [Validators.required, Validators.min(1)]],
      date: [null, Validators.required],
      minimumLevel: [null, [Validators.required, Validators.min(1)]],
      maximumLevel: [null, [Validators.required, Validators.min(1)]]
    })
  }
}