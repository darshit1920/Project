export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  country: string;
  designation: string;
  salary: number;
  currency: string;
}

export interface EmployeePageResponse {
  content: Employee[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}

export interface PayAnalytics {
  totalAnnualPayroll: number;
  averageSalary: number;
  medianSalary: number;
  totalEmployees: number;
  topSpendDepartment: string;
  departmentSpendBreakdown: Record<string, number>;
  countrySpendBreakdown: Record<string, number>;
}