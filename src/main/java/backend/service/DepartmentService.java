package backend.service;

import org.springframework.stereotype.Service;
import backend.model.Department;
import backend.repository.DepartmentRepository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired; 

@Service
public class DepartmentService {
    @Autowired
    DepartmentRepository departmentRepository;

    public Department saveDepartment(Department department) {
        return departmentRepository.save(department);
    }

    public List<Department> getDepartments(){
        return departmentRepository.findAll();
    }

    public Department getDepartment (String department){
        return departmentRepository.findById(department).get();
    }

}
