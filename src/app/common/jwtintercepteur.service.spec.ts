import { TestBed, inject } from '@angular/core/testing';

import { JWTIntercepteurService } from './jwtintercepteur.service';

describe('JWTIntercepteurService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JWTIntercepteurService]
    });
  });

  it('should be created', inject([JWTIntercepteurService], (service: JWTIntercepteurService) => {
    expect(service).toBeTruthy();
  }));
});
