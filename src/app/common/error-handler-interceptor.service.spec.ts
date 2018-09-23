import { TestBed, inject } from '@angular/core/testing';

import { ErrorHandlerInterceptorService } from './error-handler-interceptor.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('ErrorHandlerInterceptorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [ErrorHandlerInterceptorService]
    });
  });

  it('should be created', inject([ErrorHandlerInterceptorService], (service: ErrorHandlerInterceptorService) => {
    expect(service).toBeTruthy();
  }));
});
