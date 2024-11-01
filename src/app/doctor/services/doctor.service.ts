import { Injectable } from '@angular/core';
import { Doctor } from '../models/doctor';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private ApiURl = "http://localhost:8080/api/doctores";

  constructor(private http: HttpClient) { }

  getDoctors(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(this.ApiURl);
  }

  getDoctorByID(id: number): Observable<Doctor> {
    return this.http.get<Doctor>(`${this.ApiURl}/${id}`);
  }
  updateDoctor(id: number, Doctor: Doctor): Observable<Doctor> {
    return this.http.put<Doctor>(`${this.ApiURl}/${id}`, Doctor);
  }
  deleteDoctor(id: number): Observable<Doctor> {
    return this.http.delete<Doctor>(`${this.ApiURl}/${id}`);
  }

  crearDoctor(Doctor: Doctor): Observable<Doctor> {
    return this.http.post<Doctor>(this.ApiURl, Doctor);
  }
}
