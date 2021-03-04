import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {AppMaterialModule} from '../../app-material.module';
import {ConsumerFicheComponent} from './consumer-fiche.component';
import {HelpComponent} from '../../component/help/help.component';
import {ConsumerService} from '../consumer.service';
import {ActivatedRoute, convertToParamMap} from "@angular/router";
import {of} from "rxjs";

describe('ConsumerFicheComponent', () => {
  let component: ConsumerFicheComponent;
  let fixture: ComponentFixture<ConsumerFicheComponent>;

  const consumerService = jasmine.createSpyObj('consumerService', ['getById']);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule, NoopAnimationsModule, HttpClientTestingModule, AppMaterialModule],
      declarations: [ConsumerFicheComponent, HelpComponent],
      providers: [
        {
          provide: ConsumerService,
          useValue: consumerService
        },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(convertToParamMap({id: '1'}))
          }
        }
      ]
    }).compileComponents();
  }));

  beforeEach(async () => {
    consumerService.getById.and.returnValue(of({}));

    fixture = TestBed.createComponent(ConsumerFicheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should display the form with desactivated validate button', () => {
    const validButton = fixture.nativeElement.querySelector('#validButton');
    expect(validButton.disabled).toBeTrue();
  });
  it('should call to load data and expose it if there is an id in path', waitForAsync(() => {
    // prepare a mock for the consumerService.
    expect(consumerService.getById).toHaveBeenCalledWith(1);
  }))
});
