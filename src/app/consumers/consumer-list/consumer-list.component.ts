import { Component, OnInit } from '@angular/core';
import { ConsumerService } from '../consumer.service';
import { IConsumer } from '../model/consumer';
import { MdlDefaultTableModel } from '@angular-mdl/core';
import { Router } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';

let searchFilter: string;

@Component({
  selector: 'app-consumer-list',
  templateUrl: './consumer-list.component.html',
  styleUrls: ['./consumer-list.component.scss']
})
export class ConsumerListComponent implements OnInit {

  public consumers: Array<IConsumer> = [];
  public search: string = searchFilter;
  public selected: Array<IConsumer> = [];
  public tableModel: MdlDefaultTableModel;

  constructor(private consumerService: ConsumerService, private router: Router) {
    this.tableModel = new MdlDefaultTableModel([
      {key: 'id', name: 'Id', numeric: true},
      {key: 'civility', name: 'Civilité'},
      {key: 'lastname', name: 'Nom'},
      {key: 'firstname', name: 'Prénom'}
    ]);
   }

  ngOnInit() {
    this.find();

  }

  find(search?: string): void {
    if (search !== undefined) {
      searchFilter = this.search = search;
    }
    this.consumerService.find(this.search).subscribe(
      (consumers: Array<IConsumer>) => {
        this.consumers = consumers;
        this.tableModel.data = this.consumers.map(
          (c: IConsumer) => Object.assign({ selected: false }, c)
        );
      }
    );
  }

  get isSelected() {
    return this.selected.length > 0;
  }

  selectionChanged(event) {
    this.selected = event.value;
  }

  add() {
    this.router.navigateByUrl('/consumer-fiche');
  }

  edit() {
    if (this.selected.length === 0) {
      return;
    }
    const id: number = this.selected[0].id;
    this.router.navigateByUrl(`/consumer-fiche/${id}`);
  }

  // Cette méthode a l'inconveniant de rafraichir autant de fois que nous avons une suppresion
  removeOld() {
    this.selected.forEach((c: IConsumer) => {
      this.consumerService.remove(c.id).subscribe(
        () => {
          this.find();
        }
      );
    });
  }

  // Ici on ne rafraichira qu'une fois l'ensemble des suppressions effectuées
  remove() {
      const allDelete: Array<Observable<void>> = [];
      this.selected.forEach((c: IConsumer) => {
        allDelete.push(this.consumerService.remove(c.id));
      });
      forkJoin(allDelete).subscribe(
        () => {
          this.find();
        }
      );
    }
}
