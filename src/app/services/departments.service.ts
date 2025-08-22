import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentsService {
  private apiUrl = 'http://localhost:3000/departments';

  constructor(private http: HttpClient) { }

  getDepartments(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }


  getDepartmentById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  saveDepartment(department: any): Observable<any> {
    if (department.id) {
      return this.http.put<any>(`${this.apiUrl}/${department.id}`, department);
    } else {
      return this.http.post<any>(this.apiUrl, department);
    }
  }

  deleteDepartment(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
