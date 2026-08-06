package com.acme.salary.dto;

import lombok.*;
import java.util.Map;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PayAnalyticsDTO {
    private Double totalAnnualPayroll;
    private Double averageSalary;
    private Double medianSalary;
    private Long totalEmployees;
    private String topSpendDepartment;
    private Map<String, Double> departmentSpendBreakdown;
    private Map<String, Double> countrySpendBreakdown;
}
