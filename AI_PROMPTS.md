# AI Prompts & Decision Log

## AI Tooling Strategy
This project was developed using agentic AI assistance for rapid prototyping, reactive state resolution, test generation, and architectural refactoring.

---

## Key Iteration Logs

### 1. Angular Standalone Architecture & State Debugging
* **Prompt:** *"Why does the loading spinner stay active until a search or filter button is clicked in Angular standalone?"*
* **Outcome Identified:** Discovered async change detection race condition where `isLoading` toggled outside Angular's zone prior to DOM resolution.
* **Refactoring Applied:** Integrated `forkJoin` for concurrent calls and added `ChangeDetectorRef.detectChanges()` inside RxJS `finalize()` blocks.

### 2. High-Performance Pagination Strategy
* **Prompt:** *"Design a Spring Data JPA pagination pattern for 10,000 SQLite records with sub-100ms response requirements."*
* **Outcome Identified:** Avoided loading entire collections into heap memory; implemented native offset pagination via Spring Data `Pageable` and database-level aggregation queries.

### 3. UI Empty State Design
* **Prompt:** *"Add an empty state pattern using Angular Material's `*matNoDataRow` directive."*
* **Outcome Identified:** Implemented a unified empty state row with explicit user guidance when filtering yields zero results.
