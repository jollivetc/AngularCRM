import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ConsumerListeComponent} from './consumer-liste.component';
import {AppMaterialModule} from '../../app-material.module';
import {FormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {ConsumerService} from '../consumer.service';
import {Observable} from 'rxjs';
import {Consumer} from '../model/consumer';
import {RouterTestingModule} from '@angular/router/testing';
import {PhonePipe} from '../../common/phone.pipe';
import {Router, UrlTree} from '@angular/router';

describe('ConsumerListeComponent', () => {
  let component: ConsumerListeComponent;
  let fixture: ComponentFixture<ConsumerListeComponent>;
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
  const fakeFind = (param?: string): Observable<Array<Consumer>> => {
    return new Observable((subscriber) => {
      subscriber.next([fakeConsumer1, fakeConsumer2]);
    });
  };
  const fakeFindLess = (param?: string): Observable<Array<Consumer>> => {
    return new Observable((subscriber) => {
      subscriber.next([fakeConsumer2]);
    });
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ConsumerListeComponent, PhonePipe],
      imports: [AppMaterialModule, FormsModule, HttpClientTestingModule, NoopAnimationsModule, RouterTestingModule],
      providers: [
        ConsumerService // providing the real service, need to stub the service.
      ]
    })
      .compileComponents();
  }));

  it('should create', () => {
    fixture = TestBed.createComponent(ConsumerListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
  it('should call the service to retrieve the list and display it', () => {
    // prepare a fake find method that return an observable of persons.
    const consumerService = TestBed.inject(ConsumerService);
    jest.spyOn(consumerService, 'find').mockImplementation(fakeFind);

    fixture = TestBed.createComponent(ConsumerListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(consumerService.find).toHaveBeenCalledWith('');
    expect(component.consumers).toEqual([fakeConsumer1, fakeConsumer2]);
  });
  it('should call the service to filter and update the list', () => {

    const consumerService = TestBed.inject(ConsumerService);
    const findSpy = jest.spyOn(consumerService, 'find').mockImplementation(fakeFind);

    fixture = TestBed.createComponent(ConsumerListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    // change the spy programmation
    findSpy.mockImplementation(fakeFindLess);
    const filterElement = fixture.nativeElement.querySelector('input#filter');
    filterElement.value = 'criteria';
    filterElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(consumerService.find).toHaveBeenCalledWith('');
    expect(consumerService.find).toHaveBeenCalledWith('criteria');
    expect(component.consumers).toEqual([fakeConsumer2]);
  });
  it('should call delete with the consumer id and then refresh the list', waitForAsync(() => {
    // prepare a fake find method that return an observable of persons.
    const consumerService = TestBed.inject(ConsumerService);
    const findSpy = jest.spyOn(consumerService, 'find').mockImplementation(fakeFind);
    jest.spyOn(consumerService, 'remove').mockImplementation((id: number): Observable<void> => {
      return new Observable((subscriber) => {
        subscriber.next();
      });
    });
    fixture = TestBed.createComponent(ConsumerListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    // change the spy programmation
    findSpy.mockImplementation(fakeFindLess);
    const deleteElement = fixture.nativeElement.querySelector('button.mat-warn');
    deleteElement.click();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(consumerService.find).toHaveBeenCalledTimes(2);
      expect(consumerService.remove).toHaveBeenCalledWith(42);
      expect(component.consumers).toEqual([fakeConsumer2]);
    });
  }));
  it('should call the navigation when details is clicked', waitForAsync(() => {
    // prepare a fake find method that return an observable of persons.
    const consumerService = TestBed.inject(ConsumerService);
    jest.spyOn(consumerService, 'find').mockImplementation(fakeFind);
    // prepare the router stub spy
    const router = TestBed.inject(Router);
    jest.spyOn(router, 'navigateByUrl').mockImplementation(jest.fn());

    fixture = TestBed.createComponent(ConsumerListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const detailsElement = fixture.nativeElement.querySelector('button.mat-primary');
    detailsElement.click();
    fixture.detectChanges();
    expect(router.navigateByUrl).toHaveBeenCalledWith('/consumer-fiche/42');
  }));
});
