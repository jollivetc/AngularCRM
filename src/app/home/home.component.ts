import { Component, OnInit, ViewChild } from '@angular/core';
import { DemoObservableService } from '../demo-observable.service';
import { MdlDialogComponent } from '@angular-mdl/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('testDialog')
  public testDialog: MdlDialogComponent;
  public lastname: string;
  public phone = '0102030405';
  constructor(public demoObs: DemoObservableService) { }

  ngOnInit() {
  }

  openDialog() {
    this.testDialog.show();
  }
  testButton1() {
    console.log('testButton1', this.lastname);
    this.testDialog.close();
  }
  // Event fournis par la dialog
  onDialogShow() {}
  onDialogHide() {}
}
