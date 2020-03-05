import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { JWTIntercepteurService } from './jwtintercepteur.service';

describe('JWTIntercepteurService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [JWTIntercepteurService]
  }));

  it('should be created', () => {
    const service: JWTIntercepteurService = TestBed.inject(JWTIntercepteurService);
    expect(service).toBeTruthy();
  });
});
