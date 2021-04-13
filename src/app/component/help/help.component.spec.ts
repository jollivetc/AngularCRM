import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {HelpComponent} from './help.component';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors} from '@angular/forms';
import { Component } from '@angular/core';

describe('HelpComponent', () => {

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HelpComponent, TestHelpComponent],
      imports:[ReactiveFormsModule]
    })
      .compileComponents();
  }));


  it('should return an array of message', () => {
    const field = new FormControl('', [alwaysInErrorValidator]);
    let component = new HelpComponent();
    component.messages = {
      aKey: 'aMessage'
    };
    component.field = field;
    //fixture.detectChanges();
    expect(component.errors.length).toBe(1);
    expect(component.errors[0]).toEqual('aMessage');
  });

  it('should show message when error',() => {
    let fixture = TestBed.createComponent(TestHelpComponent);
    fixture.detectChanges();
    fixture.nativeElement.querySelector('input').value='';
    fixture.nativeElement.querySelector('input').dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.help-block')).not.toBeNull();
  });

});


function alwaysInErrorValidator(c: AbstractControl): ValidationErrors | null {
  return {
    aKey: 'validator message'
  };
}
@Component({
  selector: `host-component`,
  template: `<form [formGroup]="fakeForm">
              <input formControlName="fakeInput">
              <crm-help [field]="fakeForm.get('fakeInput')!"
                    [messages]="{aKey: 'error message'}"></crm-help>
              </form>`
})
class TestHelpComponent {
  public fakeForm: FormGroup

  constructor(){
    this.fakeForm = new FormGroup({
      fakeInput: new FormControl('',[alwaysInErrorValidator])
    })
  }
}

