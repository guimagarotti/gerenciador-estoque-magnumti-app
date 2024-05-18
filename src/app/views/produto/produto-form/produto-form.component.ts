import { DefaultLayoutService } from './../../../containers/default-layout/default-layout.service';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
    private defaultLayoutService: DefaultLayoutService,
    private router: Router
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
  }

  getProduct() {
    this.estoqueService.getProductById(this.produtoId).subscribe((res: any) => {
      this.defaultLayoutService.emitToggleSpinner(false);
      this.updateForm(res);
    }, (err: any) => {
      this.defaultLayoutService.emitToggleSpinner(false);
    })
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
