import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'crm-dummy',
  templateUrl: './dummy.component.html',
  styleUrls: ['./dummy.component.scss']
})
export class DummyComponent {

  @Input()
  public label = '';

  @Output()
  public clicked = new EventEmitter<string>();

  onClicked(): void {
    this.clicked.emit(this.label + ' a random string');
  }

}
