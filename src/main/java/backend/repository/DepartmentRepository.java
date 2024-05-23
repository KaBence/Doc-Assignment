package backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import backend.model.Department;

public interface DepartmentRepository extends JpaRepository<Department,String>{
    
}