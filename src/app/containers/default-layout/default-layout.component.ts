import { Component } from '@angular/core';
import { DefaultLayoutService } from './default-layout.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.css']
})
export class DefaultLayoutComponent {

  constructor(
    private defaultLayoutService: DefaultLayoutService,
    private spinnerService: NgxSpinnerService,
    private router: Router
  ) {
    this.subscribeToggleSpinner();
    this.isLoginRoute();
  }

  ngOnInit(): void {
  }

  isLoginRoute(): boolean {
    return this.router.url === '/login';
  }

  subscribeToggleSpinner() {
    this.defaultLayoutService.toggleSpinner.subscribe(status => {
      status ? this.spinnerService.show('spinnerDefault') : this.spinnerService.hide('spinnerDefault');
    });
  }
}
