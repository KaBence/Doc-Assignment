package backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import backend.model.Story;

public interface StoryRepository extends JpaRepository<Story,String>{

}