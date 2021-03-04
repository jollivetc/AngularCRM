import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

import {ConsumerService} from './consumer.service';
import {Consumer} from './model/consumer';

describe('ConsumerService', () => {
  let httpTestingController: HttpTestingController;
  let service: ConsumerService;
  const fakeConsumer = {
    id: 42,
    civility: 'monsieur',
    firstname: 'firstname',
    lastname: 'lastname',
    email: 'email',
    phone: 'phone'
  };

  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));
  beforeEach(() => {
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ConsumerService);
  });
  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should pass the parameter to filter users and return users', () => {
    const fakeResult = [
      fakeConsumer
    ];

    service.find('du').subscribe((data: Consumer[]) => {
      expect(data).toEqual(fakeResult);
    });
    const req = httpTestingController.expectOne('/api/consumers?q=du');
    expect(req.request.method).toEqual('GET');
    req.flush(fakeResult);
  });
  it('should return a consumer for an ID', () => {
    service.getById(42).subscribe((data: Consumer) => {
      expect(data).toEqual(fakeConsumer);
    });
    const req = httpTestingController.expectOne('/api/consumers/42');
    expect(req.request.method).toEqual('GET');
    req.flush(fakeConsumer);
  });
  it('should POST for the creation', () => {
    service.create(fakeConsumer).subscribe(() => {
      // do nothing, the return is void
    });
    const req = httpTestingController.expectOne('/api/consumers');
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(fakeConsumer);
    req.flush({}, {headers: {location: 'anUrl'}, status: 201, statusText: 'CREATED'});
  });
  it('should PUT for the update', () => {
    service.update(fakeConsumer).subscribe(() => {
      // do nothing, the return is void
    });
    const req = httpTestingController.expectOne('/api/consumers/42');
    expect(req.request.method).toEqual('PUT');
    expect(req.request.body).toEqual(fakeConsumer);
    req.flush({});
  });
  it('should DELETE for remove', () => {
    service.remove(42).subscribe(() => {
      // do nothing, the return is void
    });
    const req = httpTestingController.expectOne('/api/consumers/42');
    expect(req.request.method).toEqual('DELETE');
    req.flush({});
  });
});
