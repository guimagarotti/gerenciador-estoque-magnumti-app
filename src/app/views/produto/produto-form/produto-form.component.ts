import { DefaultLayoutService } from './../../../containers/default-layout/default-layout.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoryTypeEnum } from './Enums/CategoryTypeEnum.enum';
import { EstoqueService } from '../../estoque/estoque.service';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';

@Component({
  selector: 'app-produto-form',
  templateUrl: './produto-form.component.html',
  styleUrls: ['./produto-form.component.css'],
  providers: [DatePipe]
})
export class ProdutoFormComponent {

  produtoForm!: FormGroup;
  produtoId: any;

  categoryType = CategoryTypeEnum;
  selectedCategoryType!: CategoryTypeEnum;

  estoqueStatus: boolean = false;
  errStatus: boolean = false;
  errType: string = "danger";

  product: any;

  constructor(
    private formBuilder: FormBuilder,
    public activatedRoute: ActivatedRoute,
    private estoqueService: EstoqueService,
    private datePipe: DatePipe,
    private defaultLayoutService: DefaultLayoutService
  ) {
    activatedRoute.params.subscribe((params: any) => this.produtoId = params['id'])
  }

  ngOnInit() {
    this.defaultLayoutService.emitToggleSpinner(true);
    this.buildForm();

    if (this.produtoId)
      this.getProduct();
    else
      this.defaultLayoutService.emitToggleSpinner(false);

    this.produtoForm.get('minimumLevel')?.valueChanges.subscribe(() => {
      this.minimumMaximumLevelValidator();
      this.quantityWithinLevelsValidator();
    });
    this.produtoForm.get('maximumLevel')?.valueChanges.subscribe(() => {
      this.minimumMaximumLevelValidator();
      this.quantityWithinLevelsValidator();
    });
    this.produtoForm.get('quantity')?.valueChanges.subscribe(() => {
      this.quantityWithinLevelsValidator();
    });
  }

  getProduct() {
    this.estoqueService.getProductById(this.produtoId).subscribe((res: any) => {
      this.defaultLayoutService.emitToggleSpinner(false);
      this.updateForm(res);
    }, (err: any) => {
      this.defaultLayoutService.emitToggleSpinner(false);
    })
  }

  minimumMaximumLevelValidator() {
    const minimumLevelControl = this.produtoForm.get('minimumLevel');
    const maximumLevelControl = this.produtoForm.get('maximumLevel');

    if (minimumLevelControl && maximumLevelControl) {
      const minimumLevel = minimumLevelControl.value;
      const maximumLevel = maximumLevelControl.value;

      if (minimumLevel != null && maximumLevel != null) {
        if (minimumLevel >= maximumLevel) {
          minimumLevelControl.setErrors({ minimumGreaterThanMaximum: true });
          maximumLevelControl.setErrors({ minimumGreaterThanMaximum: true });
        } else {
          minimumLevelControl.setErrors(null);
          maximumLevelControl.setErrors(null);
        }
      }
    }
  }

  quantityWithinLevelsValidator() {
    const quantityControl = this.produtoForm.get('quantity');
    const minimumLevelControl = this.produtoForm.get('minimumLevel');
    const maximumLevelControl = this.produtoForm.get('maximumLevel');

    if (quantityControl && minimumLevelControl && maximumLevelControl) {
      const quantity = quantityControl.value;
      const minimumLevel = minimumLevelControl.value;
      const maximumLevel = maximumLevelControl.value;

      if (quantity != null && minimumLevel != null && maximumLevel != null) {
        if (quantity < minimumLevel || quantity > maximumLevel) {
          quantityControl.setErrors({ ...quantityControl.errors, quantityOutsideLevels: true });
        } else {
          if (quantityControl.hasError('quantityOutsideLevels')) {
            const { quantityOutsideLevels, ...rest } = quantityControl.errors || {};
            quantityControl.setErrors(Object.keys(rest).length ? rest : null);
          }
        }
      }
    }
  }

  buildForm() {
    this.produtoForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      status: [true],
      //ENUM
      category: [null, Validators.required],
      code: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      manufacturer: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      quantity: [null, [Validators.required, Validators.min(1), Validators.max(150)]],
      date: [null, Validators.required],
      minimumLevel: [null, [Validators.required, Validators.min(1), Validators.max(150)]],
      maximumLevel: [null, [Validators.required, Validators.min(1), Validators.max(150)]]
    })
  }

  valeu() {
    console.log(this.produtoForm.get('minimumLevel')?.errors)
    console.log(this.produtoForm.get('maximumLevel')?.errors)
  }

  updateForm(product: any) {
    const dataMoment = moment(product.date, 'DD/MM/YYYY');
    const dataISO = dataMoment.format('YYYY-MM-DD');

    product.date = dataISO;

    this.produtoForm.patchValue(product);
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
    this.produtoForm.get('status')?.setValue(true);
  }

  submitForm() {
    if (this.produtoForm.valid) {
      this.produtoId ? this.putProduct() : this.postProduct();
    }
    else {
      this.errStatus = true;
      this.errType = "info";

      setTimeout(() => {
        this.errStatus = false;
      }, 3000);
    }
  }

  postProduct() {
    let formatedValue = this.datePipe.transform(this.produtoForm.get("date")?.value, 'dd/MM/yyyy');
    this.produtoForm.get("date")?.setValue(formatedValue);

    this.estoqueService.postProduct(this.produtoForm.value).subscribe((res: any) => {
      this.cleanForm();
      this.errStatus = true;
      this.errType = "success";

      setTimeout(() => {
        this.errStatus = false;
      }, 3000);
    }, (err: any) => {
      this.cleanForm();

      this.errStatus = true;
      this.errType = "danger";

      setTimeout(() => {
        this.errStatus = false;
      }, 3000);
    });
  }

  putProduct() {
    let formatedValue = this.datePipe.transform(this.produtoForm.get("date")?.value, 'dd/MM/yyyy');
    this.produtoForm.get("date")?.setValue(formatedValue);

    this.estoqueService.putAlert(this.produtoForm.value, this.produtoId).subscribe((res: any) => {
      this.cleanForm();
      this.errStatus = true;
      this.errType = "success";

      setTimeout(() => {
        this.errStatus = false;
      }, 3000);
    }, (err: any) => {
      this.cleanForm();

      this.errStatus = true;
      this.errType = "danger";

      setTimeout(() => {
        this.errStatus = false;
      }, 3000);
    })
  }
}
