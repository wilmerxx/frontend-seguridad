import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {ChromeCookies} from "../modelos/chrome-cookies";
import {ChromeUser} from "../modelos/chrome-user";

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  private baseUrl = environment.baseUrl+'/cookies';
  private baseUrlUsers = environment.baseUrl+'/usuarios';

  constructor(private http: HttpClient) { }

  obtener_usuario_contrasenia(): Observable<ChromeUser[]> {
    return this.http.get<ChromeUser[]>(`${this.baseUrlUsers}/chrome`);
  }
  getChromeCookies(): Observable<ChromeCookies[]> {
    return this.http.get<ChromeCookies[]>(`${this.baseUrl}/chrome`);
  }

  get_edge_session_cookies(): Observable<ChromeCookies[]> {
    return this.http.get<ChromeCookies[]>(`${this.baseUrl}/chrome/session`);
  }

  numeros_paginas_encontradas_sin_repetir(): Observable<any> {
    return this.http.get<any>(`${this.baseUrlUsers}/chrome/paginas`);
  }
}
