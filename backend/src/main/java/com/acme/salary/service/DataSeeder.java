package com.acme.salary.service;

import com.acme.salary.model.Employee;
import com.acme.salary.repository.EmployeeRepository;
import net.datafaker.Faker;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class DataSeeder implements CommandLineRunner {

    private final EmployeeRepository repository;
    private final Faker faker = new Faker();

    public DataSeeder(EmployeeRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... args) {
        if (repository.count() > 0) return;

        List<String> depts = List.of("Engineering", "Product", "Sales", "Marketing", "HR", "Finance", "Legal", "Operations");
        List<String> countries = List.of("USA", "UK", "Germany", "India", "Canada", "Australia", "Japan", "Singapore");
        List<Employee> batch = new ArrayList<>();

        for (int i = 1; i <= 10000; i++) {
            String dept = depts.get(faker.random().nextInt(depts.size()));
            String country = countries.get(faker.random().nextInt(countries.size()));
            double salary = Math.round(faker.number().randomDouble(2, 45000, 220000));
            String firstName = faker.name().firstName();
            String lastName = faker.name().lastName();
            String email = firstName.toLowerCase() + "." + lastName.toLowerCase() + i + "@acme.com";

            batch.add(Employee.builder()
                    .firstName(firstName)
                    .lastName(lastName)
                    .email(email)
                    .department(dept)
                    .country(country)
                    .designation(faker.job().title())
                    .salary(salary)
                    .currency("USD")
                    .build());

            if (batch.size() == 1000) {
                repository.saveAll(batch);
                batch.clear();
            }
        }
        if (!batch.isEmpty()) repository.saveAll(batch);
    }
}
