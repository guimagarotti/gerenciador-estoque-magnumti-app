import { Component } from '@angular/core';
import { DefaultLayoutService } from 'src/app/containers/default-layout/default-layout.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent {

  constructor(private defaultLayoutService: DefaultLayoutService) { }

  ngOnInit() {
    this.defaultLayoutService.emitToggleSpinner(true);

    setTimeout(() => {
      this.defaultLayoutService.emitToggleSpinner(false);
    }, 1000);
  }
}
