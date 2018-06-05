import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumerFicheComponent } from './consumer-fiche.component';

describe('ConsumerFicheComponent', () => {
  let component: ConsumerFicheComponent;
  let fixture: ComponentFixture<ConsumerFicheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsumerFicheComponent ]
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
