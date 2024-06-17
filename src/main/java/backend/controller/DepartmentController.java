package backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;
import backend.model.Department;
import backend.service.DepartmentService;



@RestController
//@CrossOrigin(origins = {"http://localhost:3000","http://web:3000"})
@CrossOrigin(origins = "*")
public class DepartmentController {
    private DepartmentService departmentService;

    public DepartmentController(DepartmentService departmentService) {
        this.departmentService = departmentService;
    }

    
    @GetMapping("/departments/{departmentId}")
    public Department getDepartment(@PathVariable String departmentId){
        return departmentService.getDepartment(departmentId);
    }

    @PostMapping("/departments")
    public Department saveDepartment(@RequestBody Department department) {
        return departmentService.saveDepartment(department);
    }

    @GetMapping("/departments")
    public List<Department> getDepartments() {
        return departmentService.getDepartments();
    }

    @DeleteMapping("/departments/{departmentId}")
    public boolean deleteDepartment(@PathVariable String departmentId){
        return departmentService.deleteDepartment(departmentId);
    }
}

