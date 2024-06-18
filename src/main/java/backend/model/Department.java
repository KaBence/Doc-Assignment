package backend.model;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;

@Entity(name = "Department")
@Table(name = "department")
public class Department {
    @Id
    private String id;
    private String name;
    private String email;
    @OneToMany
    @JoinColumn(name = "Department_id")

    @JsonIgnore
    private List<Story> stories=new ArrayList<>();

    public Department(){
    }

    

    public Department(String id, String name, String email) {
        this.id = id;
        this.name = name;
        this.email = email;
    }



    public Department(String id, String name, String email, List<Story> stories) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.stories = stories;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<Story> getStories() {
        return stories;
    }

    public void setStories(List<Story> stories) {
        this.stories = stories;
    }

    @Override
    public String toString() {
        return String.format(
                "TeamMember [" +
                "id=%s, " +
                "name=%s, " +
                "email=%s" +
                "Stories=%s]", id, name, email, stories);
    }
}
