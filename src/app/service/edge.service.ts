import { Injectable } from '@angular/core';
import  {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Edge} from "../modelos/edge";
import {Firefox} from "../modelos/firefox";
import {EdgeUser} from "../modelos/edge-user";
import {ChromeCookies} from "../modelos/chrome-cookies";

@Injectable({
  providedIn: 'root'
})
export class EdgeService {

  constructor(private http: HttpClient) { }

  private baseUrlUsers = environment.baseUrl+'/usuarios';
  private baseUrlCookies = environment.baseUrl+'/cookies';

  getEdgeCookies(): Observable<Edge[]> {
    return this.http.get<Edge[]>(`${this.baseUrlCookies}/edge`);
  }

  get_edge_session_cookies(): Observable<Edge[]> {
    return this.http.get<Edge[]>(`${this.baseUrlCookies}/edge/session`);
  }

  obtener_usuario_contrasenia(): Observable<EdgeUser[]> {
    return this.http.get<EdgeUser[]>(`${this.baseUrlUsers}/edge`);
  }

  numeros_paginas_encontradas_sin_repetir(): Observable<any> {
    return this.http.get<any>(`${this.baseUrlUsers}/edge/paginas`);
  }

}
