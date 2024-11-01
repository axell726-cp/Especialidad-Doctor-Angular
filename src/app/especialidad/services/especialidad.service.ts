import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Especialidad } from '../models/especialidad';


@Injectable({
  providedIn: 'root'
})
export class EspecialidadService {
  private ApiURl = "http://localhost:8080/api/especialidades";

  constructor(private http: HttpClient) { }

  getEspecialidades(): Observable<Especialidad[]> {
    return this.http.get<Especialidad[]>(this.ApiURl);
  }

  getEspecialidadByID(id: number): Observable<Especialidad> {
    return this.http.get<Especialidad>(`${this.ApiURl}/${id}`);
  }
  updateEspecialidad(id: number, Especialidad: Especialidad): Observable<Especialidad> {
    return this.http.put<Especialidad>(`${this.ApiURl}/${id}`, Especialidad);
  }
  deleteEspecialidad(id: number): Observable<Especialidad> {
    return this.http.delete<Especialidad>(`${this.ApiURl}/${id}`);
  }

  crearEspecialidad(Especialidad: Especialidad): Observable<Especialidad> {
    return this.http.post<Especialidad>(this.ApiURl, Especialidad);
  }

  
}
