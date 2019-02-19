import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ConsumerService } from './consumer.service';

describe('ConsumerService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: ConsumerService = TestBed.get(ConsumerService);
    expect(service).toBeTruthy();
  });
});
