import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployeeTableComponent } from './employee-table.component';
import { EmployeeService } from '../../services/employee.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of, throwError } from 'rxjs';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('EmployeeTableComponent', () => {
  let component: EmployeeTableComponent;
  let fixture: ComponentFixture<EmployeeTableComponent>;
  let mockEmployeeService: any;
  let mockSnackBar: any;

  const mockEmployeeResponse = {
    content: [
      { id: 1, firstName: 'Jane', lastName: 'Smith', email: 'jane@acme.com', department: 'Engineering', country: 'USA', designation: 'Lead', salary: 130000, currency: 'USD' }
    ],
    totalElements: 1,
    totalPages: 1,
    size: 10,
    number: 0
  };

  const mockAnalyticsResponse = {
    totalEmployees: 10000,
    totalPayroll: 850000000,
    averageSalary: 85000,
    medianSalary: 82000,
    topDepartment: 'Engineering'
  };

  beforeEach(async () => {
    mockEmployeeService = {
      getEmployees: vi.fn().mockReturnValue(of(mockEmployeeResponse)),
      getAnalytics: vi.fn().mockReturnValue(of(mockAnalyticsResponse))
    };

    mockSnackBar = {
      open: vi.fn()
    };

    await TestBed.configureTestingModule({
      imports: [EmployeeTableComponent],
      providers: [
        provideNoopAnimations(),
        { provide: EmployeeService, useValue: mockEmployeeService },
        { provide: MatSnackBar, useValue: mockSnackBar }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeTableComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load initial data and analytics on init', () => {
    fixture.detectChanges();

    expect(mockEmployeeService.getEmployees).toHaveBeenCalled();
    expect(mockEmployeeService.getAnalytics).toHaveBeenCalled();
    expect(component.employees.length).toBe(1);
    expect(component.totalElements).toBe(1);
    expect(component.analyticsData).toEqual(mockAnalyticsResponse);
    expect(component.isLoading).toBe(false);
  });

  it('should reset pageIndex to 0 when applying filters', () => {
    component.pageIndex = 2;
    component.applyFilters();

    expect(component.pageIndex).toBe(0);
    expect(mockEmployeeService.getEmployees).toHaveBeenCalled();
  });

  it('should handle API errors gracefully', () => {
    mockEmployeeService.getEmployees.mockImplementation(() => throwError(() => new Error('Server error')));
    mockEmployeeService.getAnalytics.mockImplementation(() => throwError(() => new Error('Server error')));

    component.loadData();
    fixture.detectChanges();

    expect(component.isLoading).toBe(false);
  });
});
