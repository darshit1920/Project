import { Component, Input } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { PayAnalytics } from '../../models/employee.model';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, CurrencyPipe],
  template: `
    <div class="metrics-grid" *ngIf="analytics">
      <mat-card class="metric-card">
        <mat-card-header>
          <mat-icon mat-card-avatar class="icon-blue">payments</mat-icon>
          <mat-card-title>Total Annual Payroll</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="metric-value">{{ analytics.totalAnnualPayroll | currency:'USD':'symbol':'1.0-0' }}</div>
          <div class="metric-sub">Across {{ analytics.totalEmployees | number }} global employees</div>
        </mat-card-content>
      </mat-card>

      <mat-card class="metric-card">
        <mat-card-header>
          <mat-icon mat-card-avatar class="icon-green">trending_up</mat-icon>
          <mat-card-title>Average Salary</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="metric-value">{{ analytics.averageSalary | currency:'USD':'symbol':'1.0-0' }}</div>
          <div class="metric-sub">Mean compensation level</div>
        </mat-card-content>
      </mat-card>

      <mat-card class="metric-card">
        <mat-card-header>
          <mat-icon mat-card-avatar class="icon-purple">equalizer</mat-icon>
          <mat-card-title>Median Salary</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="metric-value">{{ analytics.medianSalary | currency:'USD':'symbol':'1.0-0' }}</div>
          <div class="metric-sub">Midpoint (P50) threshold</div>
        </mat-card-content>
      </mat-card>

      <mat-card class="metric-card">
        <mat-card-header>
          <mat-icon mat-card-avatar class="icon-amber">domain</mat-icon>
          <mat-card-title>Top Spend Department</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="metric-value text-capitalize">{{ analytics.topSpendDepartment }}</div>
          <div class="metric-sub">Highest budget allocation</div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .metrics-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 16px;
      margin-bottom: 24px;
    }
    .metric-card {
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    }
    .metric-value {
      font-size: 1.8rem;
      font-weight: 700;
      color: #1a202c;
      margin-top: 12px;
    }
    .metric-sub {
      font-size: 0.85rem;
      color: #718096;
      margin-top: 4px;
    }
    .icon-blue { color: #3182ce; }
    .icon-green { color: #38a169; }
    .icon-purple { color: #805ad5; }
    .icon-amber { color: #d69e2e; }
  `]
})
export class AnalyticsComponent {
  @Input() analytics: PayAnalytics | null = null;
}