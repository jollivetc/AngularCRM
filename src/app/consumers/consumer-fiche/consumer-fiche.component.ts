import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { ConsumerService } from '../../consumers/consumer.service';
import { IConsumer } from '../../consumers/model/consumer';
import { Location } from '@angular/common';

@Component({
  selector: 'app-consumer-fiche',
  templateUrl: './consumer-fiche.component.html',
  styleUrls: ['./consumer-fiche.component.scss']
})
export class ConsumerFicheComponent implements OnInit {

  public consumerForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private consumerService: ConsumerService,
              private location: Location) {

    this.consumerForm = new FormGroup({
      id: new FormControl(),
      civility: new FormControl('', [Validators.required]),
      firstname: new FormControl('', [Validators.required, Validators.minLength(3)]),
      lastname: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required, Validators.minLength(10)])
    });
  }

  ngOnInit() {

    this.route.params.subscribe(
      (params: Params) => {
        if (params.hasOwnProperty('id')) {
          const id: number = parseInt(params['id'], 10);
          this.consumerService.getById(id).subscribe(
            (c: IConsumer) => {
              this.consumerForm.patchValue(c);
            }
          );
        }
      }
    );
  }

  onSubmit() {
    const c: IConsumer = this.consumerForm.value;
    if (c.id) {
      this.consumerService.update(c).subscribe(
        () => {
          this.location.back();
        }
      );
    } else {
      this.consumerService.create(c).subscribe(
        () => {
          this.location.back();
        }
      );
    }
  }

  cancel() {
    this.location.back();
  }
}
