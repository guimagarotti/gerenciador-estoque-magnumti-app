import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-estoque-item',
  templateUrl: './estoque-item.component.html',
  styleUrls: ['./estoque-item.component.css']
})
export class EstoqueItemComponent {
  
  @Input() produto: any;

  constructor() {}

  ngOnInit() {

  }
}