import { TestBed, inject } from '@angular/core/testing';

import { ErrorHandlerInterceptorService } from './error-handler-interceptor.service';

describe('ErrorHandlerInterceptorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ErrorHandlerInterceptorService]
    });
  });

  it('should be created', inject([ErrorHandlerInterceptorService], (service: ErrorHandlerInterceptorService) => {
    expect(service).toBeTruthy();
  }));
});
