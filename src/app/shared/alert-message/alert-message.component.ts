import { Component, Input } from '@angular/core';
import { AlertComponent } from 'ngx-bootstrap/alert';

@Component({
  selector: 'app-alert-message',
  templateUrl: './alert-message.component.html',
  styleUrls: ['./alert-message.component.css']
})
export class AlertMessageComponent {
  @Input() type: string = "success";
  @Input() timeout: number = 3000;
  @Input() title: string = "";
  @Input() details: string = "";
  @Input() serverMessage: boolean = true;

  alerts: any[] = [];

  constructor() { }

  ngOnInit() {
    this.add();
  }

  add(): void {
    this.alerts.push({
      type: this.type,
      //msg: `<strong>${this.title}</strong> ${this.details}`,
      timeout: this.timeout
    });
  }

  onClosed(dismissedAlert: AlertComponent): void {
    this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
  }
}
