import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {DummyComponent} from './dummy.component';

describe('DummyComponent', () => {
  let component: DummyComponent;
  let fixture: ComponentFixture<DummyComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DummyComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DummyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should emit an event when onClicked is called', () => {
    spyOn(component.clicked, 'emit');
    component.label = 'label'
    component.onClicked();
    expect(component.clicked.emit).toHaveBeenCalledWith('label a random string');
  });
});
