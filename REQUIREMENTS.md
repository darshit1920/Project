# Product Requirements Document (PRD)
## ACME Organization - Salary Management System

**Author:** HR Engineering Team  
**Persona:** HR Manager  
**Scale Target:** 10,000 Active Global Employees  

---

### 1. Goal
Transition ACME Org’s HR team from error-prone, fragmented spreadsheets to a centralized, high-performance web application. The platform enables HR managers to manage multi-country employee compensation seamlessly and extract instant insights regarding organizational pay structure.

---

### 2. Scope & Core Features

* **High-Performance Employee Table (10k Records):**
  * Paginated table with server-side sorting and multi-column filtering (Name, Department, Country, Designation).
  * Sub-100ms response time using JPA pagination (`Pageable`).
* **Pay Analytics Dashboard:**
  * Real-time metrics: Total Annual Payroll, Average Salary, Median Pay, Top Spend Department.
  * Pay distribution breakdown by Department and Country.
* **Employee & Salary Management:**
  * Search, view, and manage employee compensation.
* **Data Seeding:**
  * High-speed, deterministic seeding of 10,000 global employee records.

---

### 3. Out of Scope & Deliberate Trade-Offs

| Feature | Status | Engineering & Product Reasoning |
| :--- | :--- | :--- |
| **Authentication & RBAC** | Out of Scope | Prioritizing core data processing, analytics performance, and UI usability under assessment time constraints. Simple mock HR session used. |
| **Complex Tax/Deduction Engine** | Out of Scope | Tax laws vary dynamically across 10+ countries. Processing gross salary vs. local net tax requires external payroll integrations (e.g., ADP). |
| **Multi-Currency Live Exchange** | Out of Scope | Base currencies are stored directly per country; dynamic real-time FX API integration introduces non-deterministic test dependencies. |

---

### 4. Technical Stack Architecture

* **Backend:** Java 21, Spring Boot 3.3+, Spring Data JPA, SQLite, Lombok, DataFaker.
* **Frontend:** Angular 18+ (Standalone Components), Angular Material, RxJS.
* **Testing:** JUnit 5, Mockito.
