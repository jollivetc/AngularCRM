import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DemoObservableService {

  constructor(httpclient: HttpClient){

  }

  test1(): void {
    const pub = new Observable<number>(
      (subscriber: Subscriber<number>) => {
        console.log('subscriber', subscriber);
        setTimeout(() => {subscriber.next(1); }, 1000);
        setTimeout(() => {subscriber.next(2); }, 2000);
        setTimeout(() => {subscriber.next(3); }, 3000);

        // Retourner une erreur
        // setTimeout(() => { subscriber.error('erreur innatendue'); }, 2500);

        // Fin de traitement
        setTimeout(() => { subscriber.complete(); }, 4000);

      }
    );
    console.log('Observable (pub)', pub);

    pub.subscribe(
      (res: number) => { console.log('next', res); },
      (err) => { console.error(err); },
      () => { console.log('complete'); }
    );

    setTimeout(()=>{
      pub.subscribe((res: number) => { console.log('next2', res);},
      (err) => { console.error(err); },
      () => { console.log('complete2');});
    }, 5000);

  }
}
