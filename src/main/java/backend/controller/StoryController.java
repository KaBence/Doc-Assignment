package backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import backend.DTO.CreateStoryDTO;
import backend.model.Story;
import backend.service.StoryService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class StoryController {
    private StoryService storyService;

    public StoryController(StoryService storyService) {
        this.storyService = storyService;
    }

    
    @GetMapping("/stories/{storyId}")
    public Story getStory(@PathVariable String story){
        return storyService.getStory(story);
    }

    @GetMapping("/stories")
    public List<Story> getStories(){
        return storyService.getStories();
    }
    
    @PostMapping("/stories")
    public Story saveStory(@RequestBody CreateStoryDTO dto){
        return storyService.saveStory(dto);
    }
}
