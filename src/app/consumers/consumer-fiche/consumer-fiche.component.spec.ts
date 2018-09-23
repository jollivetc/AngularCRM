import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumerFicheComponent } from './consumer-fiche.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MdlModule, MdlTextFieldModule } from '@angular-mdl/core';
import { MdlSelectModule } from '@angular-mdl/select';
import { HelpComponent } from '../../component/help/help.component';
import { ButtonComponent } from '../../component/button/button.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('ConsumerFicheComponent', () => {
  let component: ConsumerFicheComponent;
  let fixture: ComponentFixture<ConsumerFicheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, MdlModule, MdlSelectModule, MdlTextFieldModule, RouterTestingModule, HttpClientTestingModule],
      declarations: [ ConsumerFicheComponent, HelpComponent, ButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumerFicheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
