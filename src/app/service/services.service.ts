import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Edge} from "../modelos/edge";
import {Firefox} from "../modelos/firefox";


@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  private baseUrl = environment.baseUrl+'/cookies';

  edge: Edge[] = []
  firefox: Firefox[] = []

  constructor(private http: HttpClient) { }

  getEdge(): Observable<Edge[]> {
    return this.http.get<Edge[]>(`${this.baseUrl}/edge`);
  }

  getFirefox(): Observable<Firefox[]> {
    return this.http.get<Firefox[]>(`${this.baseUrl}/firefox`);
  }
}
