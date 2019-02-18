import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'crm-dummy',
  templateUrl: './dummy.component.html',
  styleUrls: ['./dummy.component.scss']
})
export class DummyComponent implements OnInit {

  @Input()
  public label = '';

  @Output()
  public clicked = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  onClicked($event): void {
    this.clicked.emit(this.label + 'a random string');
  }

}
