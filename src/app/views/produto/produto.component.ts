import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { DefaultLayoutService } from 'src/app/containers/default-layout/default-layout.service';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent {

  constructor(private defaultLayoutService: DefaultLayoutService) { }

  ngOnInit() {
    this.defaultLayoutService.emitToggleSpinner(true);

    setTimeout(() => {
      this.defaultLayoutService.emitToggleSpinner(false);
    }, 1000);
  }
}
