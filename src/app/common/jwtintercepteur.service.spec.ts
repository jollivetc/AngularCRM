import { TestBed, inject } from '@angular/core/testing';

import { JWTIntercepteurService } from './jwtintercepteur.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('JWTIntercepteurService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [JWTIntercepteurService]
    });
  });

  it('should be created', inject([JWTIntercepteurService], (service: JWTIntercepteurService) => {
    expect(service).toBeTruthy();
  }));
});
