import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSortModule, MatSort, Sort } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { EmployeeService } from '../../services/employee.service';
import { Employee, PayAnalytics } from '../../models/employee.model';
import { AnalyticsComponent } from '../analytics/analytics.component';

@Component({
  selector: 'app-employee-table',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    CurrencyPipe,
    AnalyticsComponent
  ],
  template: `
    <div class="container">
      <header class="header-bar">
        <h1>ACME Org - Global Salary Management System</h1>
        <span class="badge">10,000 Records (SQLite JPA Paginated)</span>
      </header>

      <!-- Analytics Dashboard -->
      <app-analytics [analytics]="analyticsData"></app-analytics>

      <!-- Filter Controls Bar -->
      <div class="filter-card">
        <mat-form-field appearance="outline" class="filter-item">
          <mat-label>Search Name / Email</mat-label>
          <input matInput [(ngModel)]="searchQuery" (keyup.enter)="applyFilters()" placeholder="e.g. John Doe">
          <button *ngIf="searchQuery" matSuffix mat-icon-button (click)="searchQuery=''; applyFilters()">
            <mat-icon>close</mat-icon>
          </button>
        </mat-form-field>

        <mat-form-field appearance="outline" class="filter-item">
          <mat-label>Department</mat-label>
          <mat-select [(ngModel)]="selectedDepartment" (selectionChange)="applyFilters()">
            <mat-option value="">All Departments</mat-option>
            <mat-option *ngFor="let dept of departments" [value]="dept">{{ dept }}</mat-option>
          </mat-select>
        </mat-form-field>

        <mat-form-field appearance="outline" class="filter-item">
          <mat-label>Country</mat-label>
          <mat-select [(ngModel)]="selectedCountry" (selectionChange)="applyFilters()">
            <mat-option value="">All Countries</mat-option>
            <mat-option *ngFor="let country of countries" [value]="country">{{ country }}</mat-option>
          </mat-select>
        </mat-form-field>

        <button mat-raised-button color="primary" class="search-btn" (click)="applyFilters()">
          <mat-icon>search</mat-icon> Filter
        </button>
      </div>

      <!-- High-Performance Data Table -->
      <div class="table-container mat-elevation-z2">
        <div class="spinner-overlay" *ngIf="isLoading">
          <mat-spinner diameter="48"></mat-spinner>
        </div>

        <table mat-table [dataSource]="employees" matSort (matSortChange)="onSortChange($event)">
          <ng-container matColumnDef="id">
            <th mat-header-cell *matHeaderCellDef mat-sort-header> ID </th>
            <td mat-cell *matCellDef="let emp"> #{{ emp.id }} </td>
          </ng-container>

          <ng-container matColumnDef="name">
            <th mat-header-cell *matHeaderCellDef mat-sort-header="firstName"> Name </th>
            <td mat-cell *matCellDef="let emp" class="font-medium"> {{ emp.firstName }} {{ emp.lastName }} </td>
          </ng-container>

          <ng-container matColumnDef="email">
            <th mat-header-cell *matHeaderCellDef mat-sort-header> Email </th>
            <td mat-cell *matCellDef="let emp" class="text-subtle"> {{ emp.email }} </td>
          </ng-container>

          <ng-container matColumnDef="department">
            <th mat-header-cell *matHeaderCellDef mat-sort-header> Department </th>
            <td mat-cell *matCellDef="let emp">
              <span class="dept-chip">{{ emp.department }}</span>
            </td>
          </ng-container>

          <ng-container matColumnDef="country">
            <th mat-header-cell *matHeaderCellDef mat-sort-header> Country </th>
            <td mat-cell *matCellDef="let emp"> {{ emp.country }} </td>
          </ng-container>

          <ng-container matColumnDef="designation">
            <th mat-header-cell *matHeaderCellDef mat-sort-header> Designation </th>
            <td mat-cell *matCellDef="let emp"> {{ emp.designation }} </td>
          </ng-container>

          <ng-container matColumnDef="salary">
            <th mat-header-cell *matHeaderCellDef mat-sort-header> Salary </th>
            <td mat-cell *matCellDef="let emp" class="font-bold">
              {{ emp.salary | currency:emp.currency:'symbol':'1.0-0' }}
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
        </table>

        <mat-paginator
          [length]="totalElements"
          [pageSize]="pageSize"
          [pageSizeOptions]="[10, 25, 50, 100]"
          (page)="onPageChange($event)"
          showFirstLastButtons>
        </mat-paginator>
      </div>
    </div>
  `,
  styles: [`
    .container { padding: 24px; max-width: 1400px; margin: 0 auto; background-color: #f7fafc; min-height: 100vh; }
    .header-bar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
    .header-bar h1 { margin: 0; font-size: 1.6rem; color: #2d3748; }
    .badge { background: #e2e8f0; color: #4a5568; padding: 6px 12px; border-radius: 16px; font-weight: 600; font-size: 0.85rem; }
    .filter-card { display: flex; gap: 16px; align-items: center; background: white; padding: 16px 20px 0 20px; border-radius: 8px; margin-bottom: 20px; flex-wrap: wrap; box-shadow: 0 1px 4px rgba(0,0,0,0.05); }
    .filter-item { flex: 1; min-width: 200px; }
    .search-btn { height: 52px; margin-bottom: 16px; }
    .table-container { position: relative; background: white; border-radius: 8px; overflow: hidden; }
    table { width: 100%; }
    .font-medium { font-weight: 500; }
    .font-bold { font-weight: 700; color: #2b6cb0; }
    .text-subtle { color: #718096; }
    .dept-chip { background: #ebf8ff; color: #2b6cb0; padding: 4px 8px; border-radius: 4px; font-size: 0.85rem; font-weight: 600; }
    .spinner-overlay { position: absolute; top:0; left:0; right:0; bottom:0; background: rgba(255,255,255,0.7); display:flex; justify-content:center; align-items:center; z-index:10; }
  `]
})
export class EmployeeTableComponent implements OnInit {
  private employeeService = inject(EmployeeService);
  private snackBar = inject(MatSnackBar);

  displayedColumns: string[] = ['id', 'name', 'email', 'department', 'country', 'designation', 'salary'];
  employees: Employee[] = [];
  analyticsData: PayAnalytics | null = null;

  totalElements = 0;
  pageSize = 10;
  pageIndex = 0;
  sortBy = 'id';
  sortDir = 'asc';

  searchQuery = '';
  selectedDepartment = '';
  selectedCountry = '';
  isLoading = false;

  departments = ['Engineering', 'Product', 'Sales', 'Marketing', 'HR', 'Finance', 'Legal', 'Operations'];
  countries = ['USA', 'UK', 'Germany', 'India', 'Canada', 'Australia', 'Japan', 'Singapore'];

  ngOnInit(): void {
    this.loadData();
    this.loadAnalytics();
  }

  loadData(): void {
    this.isLoading = true;
    this.employeeService.getEmployees(
      this.pageIndex,
      this.pageSize,
      this.sortBy,
      this.sortDir,
      this.searchQuery,
      this.selectedDepartment,
      this.selectedCountry
    ).subscribe({
      next: (res) => {
        this.employees = res.content;
        this.totalElements = res.totalElements;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.snackBar.open('Failed to load employee records from backend.', 'Close', { duration: 4000 });
      }
    });
  }

  loadAnalytics(): void {
    this.employeeService.getAnalytics().subscribe({
      next: (data) => this.analyticsData = data,
      error: (err) => console.error('Error fetching analytics:', err)
    });
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadData();
  }

  onSortChange(sort: Sort): void {
    this.sortBy = sort.active;
    this.sortDir = sort.direction || 'asc';
    this.loadData();
  }

  applyFilters(): void {
    this.pageIndex = 0;
    this.loadData();
  }
}