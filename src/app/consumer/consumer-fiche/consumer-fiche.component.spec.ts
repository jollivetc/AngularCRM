import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppMaterialModule } from '../../app-material.module';
import { ConsumerFicheComponent } from './consumer-fiche.component';
import { HelpComponent } from '../../component/help/help.component';

describe('ConsumerFicheComponent', () => {
  let component: ConsumerFicheComponent;
  let fixture: ComponentFixture<ConsumerFicheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule, NoopAnimationsModule, HttpClientTestingModule, AppMaterialModule],
      declarations: [ ConsumerFicheComponent, HelpComponent ]
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
