import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'crm-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public phone = '0102030405';
  constructor() { }

  ngOnInit() {
  }

}
