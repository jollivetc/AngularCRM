import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Consumer } from './model/consumer';

@Injectable({
  providedIn: 'root'
})
export class ConsumerService {

  constructor(private http: HttpClient) {
  }
  find(lastnameFilter?: string): Observable<Consumer[]> {
    let params;
    if (lastnameFilter && lastnameFilter !== '') {
      params = new HttpParams({fromObject: {q:  lastnameFilter }});
    }
    return this.http.get<Consumer[]>('/api/consumers', {observe: 'body', params});
  }
  getById(id: number): Observable<Consumer> {
    return this.http.get<Consumer>(`/api/consumers/${id}`);
  }
  create(consumer: Consumer): Observable<void> {
    return this.http.post<void>('/api/consumers', consumer);
  }
  update(consumer: Consumer): Observable<void> {
    return this.http.put<void>(`/api/consumers/${consumer.id}`, consumer);
  }
  remove(id: number): Observable<void> {
    return this.http.delete<void>(`/api/consumers/${id}`);
  }
}
