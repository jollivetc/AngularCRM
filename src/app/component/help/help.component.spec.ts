import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {HelpComponent} from './help.component';
import {AbstractControl, FormControl, ValidationErrors} from '@angular/forms';

describe('HelpComponent', () => {
  let component: HelpComponent;
  let fixture: ComponentFixture<HelpComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HelpComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    console.log = (value) => {
    };

    fixture = TestBed.createComponent(HelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should return empty array to get errors if field or message are null', () => {
    expect(component.errors).toEqual([]);
  });

  function alwaysInErrorValidator(c: AbstractControl): ValidationErrors | null {
    return {
      aKey: 'validator message'
    };
  }

  it('should return an array of message', () => {
    const field = new FormControl('', [alwaysInErrorValidator]);
    component.messages = {
      aKey: 'aMessage'
    };
    component.field = field;
    fixture.detectChanges();
    expect(component.errors.length).toBe(1);
    expect(component.errors[0]).toEqual('aMessage');
  });
});
