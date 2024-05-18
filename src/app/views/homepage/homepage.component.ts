import { Component } from '@angular/core';
import { DefaultLayoutService } from 'src/app/containers/default-layout/default-layout.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {

  constructor(private defaultLayoutService: DefaultLayoutService) { }

  ngOnInit() {
    this.defaultLayoutService.emitToggleSpinner(true);

    setTimeout(() => {
      this.defaultLayoutService.emitToggleSpinner(false);
    }, 500);
  }
}
