package com.acme.salary.controller;

import com.acme.salary.dto.PayAnalyticsDTO;
import com.acme.salary.model.Employee;
import com.acme.salary.service.EmployeeService;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/employees")
@CrossOrigin(origins = "http://localhost:4200")
public class EmployeeController {

    private final EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @GetMapping
    public ResponseEntity<Page<Employee>> getEmployees(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDir,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String department,
            @RequestParam(required = false) String country) {
        return ResponseEntity.ok(employeeService.getEmployees(page, size, sortBy, sortDir, search, department, country));
    }

    @GetMapping("/analytics")
    public ResponseEntity<PayAnalyticsDTO> getAnalytics() {
        return ResponseEntity.ok(employeeService.getAnalytics());
    }
}
