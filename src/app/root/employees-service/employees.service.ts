import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const API = `http://localhost:3000`;

export interface Employees {
  id?: string | undefined;
  name: string;
  birthdate: string;
  position: string;
  department: string;
  imageUrl?: string;
}

@Injectable({
  providedIn: 'root',
})
export class Employees {
  constructor(private httpClient: HttpClient) {}

  getAllEmployees(): Observable<Employees[]> {
    return this.httpClient.get<Employees[]>(`${API}/employees`);
  }

  getEmployeeById(id: string): Observable<Employees> {
    return this.httpClient.get<Employees>(`${API}/employees/${id}`);
  }

  createEmployee(employees: Employees): Observable<Employees> {
    return this.httpClient.post<Employees>(`${API}/employees`, employees);
  }

  updateEmployee(employees: Employees): Observable<Employees> {
    return this.httpClient.put<Employees>(`${API}/employees/${employees.id}`, employees);
  }

  deleteEmployee(id: string): Observable<any> {
    return this.httpClient.delete(`${API}/employees/${id}`);
  }
}
