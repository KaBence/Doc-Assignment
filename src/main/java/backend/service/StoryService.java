package backend.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import backend.model.Story;

import backend.repository.StoryRepository;

@Service
public class StoryService {
    @Autowired
    StoryRepository storyRepository;

    public Story saveStory(Story story){
        return storyRepository.save(story);
    }

    public List<Story> getStories(){
        return storyRepository.findAll();
    }

    public Story getStory(String story){
        return storyRepository.findById(story).get();
    }
}
