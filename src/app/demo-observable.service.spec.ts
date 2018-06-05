import { TestBed, inject } from '@angular/core/testing';

import { DemoObservableService } from './demo-observable.service';

describe('DemoObservableService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DemoObservableService]
    });
  });

  it('should be created', inject([DemoObservableService], (service: DemoObservableService) => {
    expect(service).toBeTruthy();
  }));
});
