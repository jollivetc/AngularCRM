import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Input()
  public libelle = '';
  @Input()
  public type = 'button';
  @Input()
  public icon = null;
  @Input()
  public mdlType = 'raised';
  @Input()
  public mdlColor = '';
  @Input()
  public disabled = false;

  constructor() { }

  ngOnInit() {
  }

}
