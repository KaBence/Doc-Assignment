package backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import backend.DTO.CreateStoryDTO;
import backend.DTO.UpdateStoryDTO;
import backend.model.Story;
import backend.service.StoryService;

@RestController
//@CrossOrigin(origins = {"http://localhost:3000","http://web:3000"})
@CrossOrigin(origins = "*")

public class StoryController {
    private StoryService storyService;

    public StoryController(StoryService storyService) {
        this.storyService = storyService;
    }

    @GetMapping("/stories/{storyId}")
    public Story getStory(@PathVariable String storyId) {
        return storyService.getStory(storyId);
    }

    @GetMapping("/stories")
    public List<Story> getStories() {
        return storyService.getStories();
    }

    @PostMapping("/stories")
    public Story saveStory(@RequestBody CreateStoryDTO dto) {
        return storyService.saveStory(dto);
    }

    @DeleteMapping("/stories/{storyId}")
    public boolean deleteStory(@PathVariable String storyId) {
        return storyService.deleteStory(storyId);
    }

    @PatchMapping("/stories/{storyId}")
    public ResponseEntity<String> updateStory(@PathVariable String storyId, @RequestBody UpdateStoryDTO DTO) {
        storyService.updateStory(storyId,DTO);
        return ResponseEntity.ok("Success!");
    }
}
