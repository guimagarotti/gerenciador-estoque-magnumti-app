import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoryTypeEnum } from './Enums/CategoryTypeEnum.enum';

@Component({
  selector: 'app-produto-form',
  templateUrl: './produto-form.component.html',
  styleUrls: ['./produto-form.component.css']
})
export class ProdutoFormComponent {

  produtoForm!: FormGroup;
  produtoId: any;

  categoryType = CategoryTypeEnum;
  selectedCategoryType!: CategoryTypeEnum;

  errStatus: boolean = false;
  successStatus: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    public activatedRoute: ActivatedRoute
  ) {
    activatedRoute.params.subscribe((params: any) => this.produtoId = params['id'])
  }

  ngOnInit() {
    this.buildForm();

    if (this.produtoId)
      console.log(this.produtoId);
  }

  buildForm() {
    this.produtoForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      status: [true],
      //ENUM
      category: [null, Validators.required],
      code: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      manufacturer: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      quantity: [null, [Validators.required, Validators.min(1)]],
      date: [null, Validators.required],
      minimumLevel: [null, [Validators.required, Validators.min(1)]],
      maximumLevel: [null, [Validators.required, Validators.min(1)]]
    })
  }

  applyErrors(campo: string) {
    return {
      'is-invalid': this.verifyValidAndTouched(campo)
    }
  }

  verifyValidAndTouched(campo: string) {
    return !this.produtoForm.get(campo)?.valid && this.produtoForm.get(campo)?.touched;
  }

  cleanForm() {
    this.produtoForm.reset();
  }

  submitForm() {
    if (this.produtoForm.valid) {
      console.log(this.produtoForm.value);
      this.successStatus = true;

      setTimeout(() => {
        this.successStatus = false;
      }, 2000);
    }
    else {
      this.errStatus = true;

      setTimeout(() => {
        this.errStatus = false;
      }, 2000);
    }
  }
}