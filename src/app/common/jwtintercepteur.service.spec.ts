import { TestBed } from '@angular/core/testing';

import { JWTIntercepteurService } from './jwtintercepteur.service';

describe('JWTIntercepteurService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JWTIntercepteurService = TestBed.get(JWTIntercepteurService);
    expect(service).toBeTruthy();
  });
});
