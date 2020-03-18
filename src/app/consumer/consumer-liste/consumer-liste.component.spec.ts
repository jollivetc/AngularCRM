import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from '../../app-material.module';
import { ConsumerListeComponent } from './consumer-liste.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('ConsumerListeComponent', () => {
  let component: ConsumerListeComponent;
  let fixture: ComponentFixture<ConsumerListeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsumerListeComponent ],
      imports: [AppMaterialModule, FormsModule, HttpClientTestingModule, NoopAnimationsModule, RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumerListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
