import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  statusHeader: boolean = false;
  modalStatus: boolean = false;
  statusMenu: boolean = false;

  constructor(private router: Router) { }

  ngOnInit() { }

  logout() {
    this.router.navigate(['login']);
  }

  activeHeader() {
    this.statusHeader = !this.statusHeader;
  }
}
