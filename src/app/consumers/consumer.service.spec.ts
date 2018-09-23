import { TestBed, inject } from '@angular/core/testing';

import { ConsumerService } from './consumer.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('ConsumerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule],
      providers: [ConsumerService]
    });
  });

  it('should be created', inject([ConsumerService], (service: ConsumerService) => {
    expect(service).toBeTruthy();
  }));
});
