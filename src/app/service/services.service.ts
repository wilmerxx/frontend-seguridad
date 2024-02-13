import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Edge} from "../modelos/edge";
import {Firefox} from "../modelos/firefox";
import {EdgeUser} from "../modelos/edge-user";

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  private baseUrl = environment.baseUrl+'cookies';
  private baseUrl2 = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getEdge(): Observable<Edge[]> {
    return this.http.get<Edge[]>(`${this.baseUrl}/edge`);
  }

  getFirefox(): Observable<Firefox[]> {
    return this.http.get<Firefox[]>(`${this.baseUrl}/firefox`);
  }

  getEdgeUser(): Observable<EdgeUser[]> {
    return this.http.get<EdgeUser[]>(`${this.baseUrl}/usuarios/edge`);
  }

  getEdgeSinRepetir(): Observable<any[]>{
    return this.http.get<any[]>(`${this.baseUrl2}usuarios/edge/paginas`);
  }
}
