import { TestBed, inject } from '@angular/core/testing';

import { DemoObservableService } from './demo-observable.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('DemoObservableService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule],
      providers: [DemoObservableService]
    });
  });

  it('should be created', inject([DemoObservableService], (service: DemoObservableService) => {
    expect(service).toBeTruthy();
  }));
});
