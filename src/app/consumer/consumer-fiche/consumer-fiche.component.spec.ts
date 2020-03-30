import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppMaterialModule } from '../../app-material.module';
import { ConsumerFicheComponent } from './consumer-fiche.component';
import { HelpComponent } from '../../component/help/help.component';
import { ConsumerService } from '../consumer.service';

describe('ConsumerFicheComponent', () => {
  let component: ConsumerFicheComponent;
  let fixture: ComponentFixture<ConsumerFicheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule, NoopAnimationsModule, HttpClientTestingModule, AppMaterialModule],
      declarations: [ ConsumerFicheComponent, HelpComponent],
      providers: [
        ConsumerService,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    
  });

  it('should create', () => {
    fixture = TestBed.createComponent(ConsumerFicheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
  it('should display the form with desactivated validate button', () => {
    fixture = TestBed.createComponent(ConsumerFicheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    const validButton = fixture.nativeElement.querySelector('#validButton');
    expect(validButton.disabled).toBeTrue();
  });
  it('should call to load data and expose it if there is an id in path', async(() => {
    // prepare a mock for the consumerService.

    const consumerService = TestBed.inject(ConsumerService);
    fixture = TestBed.createComponent(ConsumerFicheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  }))
});
