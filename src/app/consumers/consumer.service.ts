import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IConsumer } from './model/consumer';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ConsumerService {

  constructor(private http: HttpClient) { }

  getConsumers(): Observable<Array<IConsumer>> {
    return this.http.get<Array<IConsumer>>('/api/consumers');
  }

  find(lastnameFilter?: string): Observable<IConsumer[]> {
    let params;
    if (lastnameFilter && lastnameFilter !== '') {
      params = new HttpParams({fromObject: {'q':  lastnameFilter }});
    }
    return this.http.get<IConsumer[]>('/api/consumers', {observe: 'body', params : params});
  }
  getById(id: number): Observable<IConsumer> {
    return this.http.get<IConsumer>(`/api/consumers/${id}`);
  }

  create(consumer: IConsumer): Observable<void> {
    return this.http.post<void>('/api/consumers', consumer);
  }

  update(consumer: IConsumer): Observable<void> {
    return this.http.put<void>(`/api/consumers/${consumer.id}`, consumer);
  }

  remove(id: number): Observable<void> {
    return this.http.delete<void>(`/api/consumers/${id}`);
  }

}
