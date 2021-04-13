import {Component, OnInit} from '@angular/core';
import {ConsumerService} from '../consumer.service';
import {Consumer} from '../model/consumer';
import {Router} from '@angular/router';

let searchFilter = '';

@Component({
  selector: 'crm-consumer-liste',
  templateUrl: './consumer-liste.component.html',
  styleUrls: ['./consumer-liste.component.scss']
})
export class ConsumerListeComponent implements OnInit {

  consumers: Array<Consumer> = [];
  search = '';
  displayedColumns: string[] = ['civility', 'firstname', 'lastname', 'email', 'phone', 'actions'];

  constructor(private consumerService: ConsumerService, private router: Router) {
  }

  ngOnInit() {
    this.find();
  }

  find(search?: string): void {
    if (search !== undefined) {
      searchFilter = this.search = search;
    }
    this.consumerService.find(this.search).subscribe(
      (consumers: Array<Consumer>) => {
        this.consumers = consumers;
      }
    );
  }

  edit(consumer: Consumer): void {
    this.router.navigateByUrl(`/consumer-fiche/${consumer.id}`);
  }

  delete(consumer: Consumer): void {
    this.consumerService.remove(consumer.id!).subscribe(
      () => this.find());
  }
}
