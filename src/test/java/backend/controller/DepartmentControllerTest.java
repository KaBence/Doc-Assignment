package backend.controller;

import backend.model.Department;
import backend.service.DepartmentService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.List;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(SpringExtension.class)
@WebMvcTest(DepartmentController.class)
public class DepartmentControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private DepartmentService departmentService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    public void testGetDepartment() throws Exception {
        Department department = new Department("1", "HR", "hr@company.com");
        when(departmentService.getDepartment("1")).thenReturn(department);

        mockMvc.perform(get("/departments/1"))
               .andExpect(status().isOk())
               .andExpect(content().contentType(MediaType.APPLICATION_JSON))
               .andExpect(jsonPath("$.id").value("1"))
               .andExpect(jsonPath("$.name").value("HR"))
               .andExpect(jsonPath("$.email").value("hr@company.com"));
    }

    @Test
    public void testSaveDepartment() throws Exception {
        Department department = new Department("2", "IT", "it@company.com");
        when(departmentService.saveDepartment(Mockito.any(Department.class))).thenReturn(department);

        mockMvc.perform(post("/departments")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(department)))
               .andExpect(status().isOk())
               .andExpect(content().contentType(MediaType.APPLICATION_JSON))
               .andExpect(jsonPath("$.id").value("2"))
               .andExpect(jsonPath("$.name").value("IT"))
               .andExpect(jsonPath("$.email").value("it@company.com"));
    }

    @Test
    public void testGetDepartments() throws Exception {
        Department dept1 = new Department("1", "HR", "hr@company.com");
        Department dept2 = new Department("2", "IT", "it@company.com");
        List<Department> departments = Arrays.asList(dept1, dept2);
        when(departmentService.getDepartments()).thenReturn(departments);

        mockMvc.perform(get("/departments"))
               .andExpect(status().isOk())
               .andExpect(content().contentType(MediaType.APPLICATION_JSON))
               .andExpect(jsonPath("$[0].id").value("1"))
               .andExpect(jsonPath("$[0].name").value("HR"))
               .andExpect(jsonPath("$[0].email").value("hr@company.com"))
               .andExpect(jsonPath("$[1].id").value("2"))
               .andExpect(jsonPath("$[1].name").value("IT"))
               .andExpect(jsonPath("$[1].email").value("it@company.com"));
    }

    @Test
    public void testDeleteDepartment() throws Exception {
        when(departmentService.deleteDepartment("1")).thenReturn(true);

        mockMvc.perform(delete("/departments/1"))
               .andExpect(status().isOk())
               .andExpect(content().string("true"));
    }
}
