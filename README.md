[![Vercel Deployment](https://img.shields.io/badge/Status-Live%20Demo-brightgreen)](https://salary-management-nml945gx3-darshit3.vercel.app/)
# Global Salary Management System

Full-stack enterprise application featuring an Angular 19 frontend and a Spring Boot 3 (SQLite + JPA) backend supporting low-latency paginated search, multi-column sorting, and real-time compensation analytics over 10,000+ employee records.

---

## Project Structure
- `/backend`: Spring Boot REST API (Java 21/17, Spring Data JPA, SQLite, DataFaker)
- `/frontend`: Angular 19 Standalone Application (Angular Material, Vitest)
- `/REQUIREMENTS.md`: Product Requirements Document (PRD) detailing scope, personas, and trade-offs
- `/ARCHITECTURE.md`: Architecture diagrams and technical design highlights

---

## Quick Start (Local Development)

### Prerequisites
- **Java**: JDK 21
- **Node.js**: v18+ (npm v9+)
- **Maven**: Installed globally (`mvn`) or using `./mvnw`

---

### 1. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Run backend unit tests
mvn test

# Start Spring Boot API (runs on http://localhost:8080)
mvn spring-boot:run
