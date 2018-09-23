import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumerListComponent } from './consumer-list.component';
import { MdlTextFieldModule, MdlTableModule, MdlButtonModule, MdlIconModule } from '@angular-mdl/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../../component/button/button.component';

import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('ConsumerListComponent', () => {
  let component: ConsumerListComponent;
  let fixture: ComponentFixture<ConsumerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientTestingModule, RouterTestingModule, MdlTextFieldModule, MdlTableModule, MdlButtonModule, MdlIconModule],
      declarations: [ ConsumerListComponent, ButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
