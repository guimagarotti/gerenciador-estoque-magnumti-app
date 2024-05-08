import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DefaultLayoutService {

  constructor() { }

  toggleSpinner: EventEmitter<boolean> = new EventEmitter<boolean>();

  emitToggleSpinner(status: boolean) {
    this.toggleSpinner.emit(status);
  }
}
