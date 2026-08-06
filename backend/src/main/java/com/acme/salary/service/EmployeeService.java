package com.acme.salary.service;

import com.acme.salary.dto.PayAnalyticsDTO;
import com.acme.salary.model.Employee;
import com.acme.salary.repository.EmployeeRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class EmployeeService {

    private final EmployeeRepository repository;

    public EmployeeService(EmployeeRepository repository) {
        this.repository = repository;
    }

    public Page<Employee> getEmployees(int page, int size, String sortBy, String sortDir, String search, String dept, String country) {
        Sort sort = sortDir.equalsIgnoreCase("desc") ? Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();
        return repository.findWithFilters(search, dept, country, PageRequest.of(page, size, sort));
    }

    public PayAnalyticsDTO getAnalytics() {
        List<Employee> all = repository.findAll();
        if (all.isEmpty()) return new PayAnalyticsDTO(0.0, 0.0, 0.0, 0L, "N/A", Map.of(), Map.of());

        double totalPayroll = all.stream().mapToDouble(Employee::getSalary).sum();
        double avgSalary = totalPayroll / all.size();

        List<Double> sortedSalaries = repository.findAllSalariesSorted();
        double median = sortedSalaries.size() % 2 == 0
                ? (sortedSalaries.get(sortedSalaries.size() / 2 - 1) + sortedSalaries.get(sortedSalaries.size() / 2)) / 2.0
                : sortedSalaries.get(sortedSalaries.size() / 2);

        Map<String, Double> deptBreakdown = all.stream()
                .collect(Collectors.groupingBy(Employee::getDepartment, Collectors.summingDouble(Employee::getSalary)));

        Map<String, Double> countryBreakdown = all.stream()
                .collect(Collectors.groupingBy(Employee::getCountry, Collectors.summingDouble(Employee::getSalary)));

        String topDept = deptBreakdown.entrySet().stream()
                .max(Map.Entry.comparingByValue())
                .map(Map.Entry::getKey)
                .orElse("N/A");

        return PayAnalyticsDTO.builder()
                .totalAnnualPayroll(totalPayroll)
                .averageSalary(avgSalary)
                .medianSalary(median)
                .totalEmployees((long) all.size())
                .topSpendDepartment(topDept)
                .departmentSpendBreakdown(deptBreakdown)
                .countrySpendBreakdown(countryBreakdown)
                .build();
    }
}
