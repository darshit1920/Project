package com.acme.salary.service;

import com.acme.salary.model.Employee;
import com.acme.salary.repository.EmployeeRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class EmployeeServiceTest {

    @Mock
    private EmployeeRepository employeeRepository;

    @InjectMocks
    private EmployeeService employeeService;

    private Employee sampleEmployee;

    @BeforeEach
    void setUp() {
        sampleEmployee = new Employee();
        sampleEmployee.setId(1L);
        sampleEmployee.setFirstName("John");
        sampleEmployee.setLastName("Doe");
        sampleEmployee.setEmail("john.doe@acme.com");
        sampleEmployee.setDepartment("Engineering");
        sampleEmployee.setCountry("USA");
        sampleEmployee.setSalary(120000.0);
    }

    @Test
    @DisplayName("Should return paginated employee list")
    void getEmployees_ReturnsPaginatedResult() {
        Pageable pageable = PageRequest.of(0, 10);
        Page<Employee> page = new PageImpl<>(List.of(sampleEmployee), pageable, 1);

        when(employeeRepository.findWithFilters(any(), any(), any(), any(Pageable.class)))
                .thenReturn(page);

        Page<Employee> result = employeeService.getEmployees(0, 10, "id", "asc", "", "", "");

        assertNotNull(result);
        assertEquals(1, result.getTotalElements());
        assertEquals("John", result.getContent().get(0).getFirstName());
        verify(employeeRepository, times(1)).findWithFilters(any(), any(), any(), any(Pageable.class));
    }
}
