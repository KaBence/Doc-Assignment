package backend.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import backend.DTO.CreateStoryDTO;
import backend.model.Department;
import backend.model.Story;
import backend.repository.DepartmentRepository;
import backend.repository.StoryRepository;

@Service
public class StoryService {
    @Autowired
    StoryRepository storyRepository;

    @Autowired
    DepartmentRepository departmentRepository;

    public Story saveStory(CreateStoryDTO dto){
        Department department = departmentRepository.findById(dto.getDepartmentId()).orElseThrow(() -> new RuntimeException("Department not found"));
        Story story=new Story(dto.getId(), dto.getName(), dto.getDescription());
        story.setDepartment(department);
        return storyRepository.save(story);
    }

    public List<Story> getStories(){
        return storyRepository.findAll();
    }

    public Story getStory(String story){
        return storyRepository.findById(story).get();
    }
}
