import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmployeePageResponse, PayAnalytics, Employee } from '../models/employee.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private http = inject(HttpClient);
  // Uses environment configuration (swaps between local & Render automatically)
  private apiUrl = environment.apiUrl;

  getEmployees(
    page: number = 0,
    size: number = 10,
    sortBy: string = 'id',
    sortDir: string = 'asc',
    search: string = '',
    department: string = '',
    country: string = ''
  ): Observable<EmployeePageResponse> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sortBy', sortBy)
      .set('sortDir', sortDir);

    if (search) params = params.set('search', search);
    if (department) params = params.set('department', department);
    if (country) params = params.set('country', country);

    return this.http.get<EmployeePageResponse>(this.apiUrl, { params });
  }

  getAnalytics(): Observable<PayAnalytics> {
    return this.http.get<PayAnalytics>(`${this.apiUrl}/analytics`);
  }

  updateSalary(employeeId: number, newSalary: number): Observable<Employee> {
    return this.http.patch<Employee>(`${this.apiUrl}/${employeeId}/salary`, { salary: newSalary });
  }
}