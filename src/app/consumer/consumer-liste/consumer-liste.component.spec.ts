import {waitForAsync} from '@angular/core/testing';

import {ConsumerListeComponent} from './consumer-liste.component';
import {of} from 'rxjs';

describe('ConsumerListeComponent', () => {
  let component: ConsumerListeComponent;
  const fakeConsumer1 = {
    id: 42,
    civility: 'monsieur',
    firstname: 'firstname',
    lastname: 'lastname',
    email: 'email',
    phone: 'phone'
  };
  const fakeConsumer2 = {
    id: 43,
    civility: 'monsieur',
    firstname: 'firstname2',
    lastname: 'lastname2',
    email: 'email2',
    phone: 'phone2'
  };
  const fakeFind = () => of([fakeConsumer1, fakeConsumer2]);
  const fakeFindLess = () => of([fakeConsumer2]);

  const router = jasmine.createSpyObj('router', ['navigateByUrl']);
  const consumerService = jasmine.createSpyObj('consumerService', ['find', 'remove']);

  it('should create', () => {
    component = new ConsumerListeComponent(consumerService, router);
    expect(component).toBeTruthy();
  });
  it('should call the service to retrieve the list and display it', () => {
    // prepare a fake find method that return an observable of persons.
    consumerService.find.and.callFake(fakeFind);

    component = new ConsumerListeComponent(consumerService, router);
    component.ngOnInit();
    expect(consumerService.find).toHaveBeenCalledWith('');
    expect(component.consumers).toEqual([fakeConsumer1, fakeConsumer2]);
  });
  it('should call the service to filter and update the list', () => {
    const findSpy = consumerService.find.and.callFake(fakeFind);

    component = new ConsumerListeComponent(consumerService, router);
    component.ngOnInit();
    // change the spy programmation
    findSpy.and.callFake(fakeFindLess);
    component.search = 'criteria';
    expect(consumerService.find).toHaveBeenCalledWith('');
    component.ngOnInit();
    expect(consumerService.find).toHaveBeenCalledWith('criteria');
    expect(component.consumers).toEqual([fakeConsumer2]);
  });
  it('should call delete with the consumer id and then refresh the list', waitForAsync(() => {
    // prepare a fake find method that return an observable of persons.
    component = new ConsumerListeComponent(consumerService, router);
    consumerService.find.and.callFake(fakeFind);
    consumerService.remove.and.callFake(() => of({}));
    component.ngOnInit();
    consumerService.find.and.callFake(fakeFindLess);
    component.delete(fakeConsumer1);
    expect(consumerService.remove).toHaveBeenCalledWith(42);
    expect(component.consumers).toEqual([fakeConsumer2]);
  }));
  it('should call the navigation when details is clicked', waitForAsync(() => {
    // prepare a fake find method that return an observable of persons.
    consumerService.find.and.callFake(fakeFind);
    // prepare the router stub spy
    router.navigateByUrl.and.callThrough();

    component = new ConsumerListeComponent(consumerService, router);
    component.edit(fakeConsumer1);
    component.ngOnInit();
    expect(router.navigateByUrl).toHaveBeenCalledWith('/consumer-fiche/42');
  }));
});
