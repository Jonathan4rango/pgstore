import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Perfil } from './models/perfil.model';

export interface WeatherForecast {
  date: string;
  temperatureC: number;
  summary: string;
}
@Injectable({
  providedIn: 'root'
})

export class ServiceCompartidoService {

  constructor() { }

  mensaje = 'Hola servicio';

  obtenerMensaje(): string{
    return this.mensaje;
  }
  private readonly apiBase = 'http://localhost:5175/api'; // Ajusta la URL según tu backend

  private httpClient = inject(HttpClient); // Correcta inyección de HttpClient



  registrarUsuario(usuario: any): Observable<any> {
    const url = `${this.apiBase}/Usuarios`; 
    return this.httpClient.post(url, usuario); 
  }

  getPerfiles(){
    const url = `${this.apiBase}/Perfil`; 
    return this.httpClient.get<Perfil[]>(url);
  }

}
 