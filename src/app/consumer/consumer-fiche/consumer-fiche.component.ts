import {Component, OnInit} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params} from '@angular/router';
import {ConsumerService} from '../consumer.service';
import {Consumer} from '../model/consumer';
import {Location} from '@angular/common';

@Component({
  selector: 'crm-consumer-fiche',
  templateUrl: './consumer-fiche.component.html'
})
export class ConsumerFicheComponent implements OnInit {

  public consumerForm: UntypedFormGroup;

  constructor(private route: ActivatedRoute,
              private consumerService: ConsumerService,
              private location: Location) {

    this.consumerForm = new UntypedFormGroup({
      id: new UntypedFormControl(),
      civility: new UntypedFormControl('', [Validators.required]),
      firstname: new UntypedFormControl('', [Validators.required, Validators.minLength(3)]),
      lastname: new UntypedFormControl('', [Validators.required, Validators.minLength(3)]),
      email: new UntypedFormControl('', [Validators.required, Validators.email]),
      phone: new UntypedFormControl('', [Validators.required, Validators.minLength(10)])
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(
      (params: Params) => {
        const idAsString = params.get('id');
        if (idAsString) {
          const id: number = parseInt(idAsString, 10);
          this.consumerService.getById(id).subscribe(
            (c: Consumer) => this.consumerForm.patchValue(c)
          );
        }
      }
    );
  }

  onSubmit() {
    const c: Consumer = this.consumerForm.value;
    if (c.id) {
      this.consumerService.update(c).subscribe(() => this.location.back());
    } else {
      this.consumerService.create(c).subscribe(() => this.location.back());
    }
  }

  cancel() {
    this.location.back();
  }
}
