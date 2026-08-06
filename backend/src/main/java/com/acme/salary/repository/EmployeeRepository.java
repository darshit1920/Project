package com.acme.salary.repository;

import com.acme.salary.model.Employee;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    @Query("SELECT e FROM Employee e WHERE " +
           "(:search IS NULL OR :search = '' OR LOWER(e.firstName) LIKE LOWER(CONCAT('%', :search, '%')) OR LOWER(e.lastName) LIKE LOWER(CONCAT('%', :search, '%')) OR LOWER(e.email) LIKE LOWER(CONCAT('%', :search, '%'))) AND " +
           "(:dept IS NULL OR :dept = '' OR e.department = :dept) AND " +
           "(:country IS NULL OR :country = '' OR e.country = :country)")
    Page<Employee> findWithFilters(
            @Param("search") String search,
            @Param("dept") String dept,
            @Param("country") String country,
            Pageable pageable);

    @Query("SELECT e.salary FROM Employee e ORDER BY e.salary ASC")
    List<Double> findAllSalariesSorted();
}
