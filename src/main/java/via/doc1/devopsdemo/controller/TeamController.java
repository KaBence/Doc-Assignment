package via.doc1.devopsdemo.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;
import via.doc1.devopsdemo.model.Task;
import via.doc1.devopsdemo.model.TeamMember;
import via.doc1.devopsdemo.service.TeamService;



@RestController
public class TeamController {

    private TeamService teamService;

    public TeamController(TeamService teamService) {
        this.teamService = teamService;
    }

    @GetMapping("/members/{memberId}/tasks/{taskId}")
    public Task getTaskDetails(@PathVariable String memberId, @PathVariable String taskId) {
        return teamService.getTask(memberId, taskId);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/members/{memberId}")
    public TeamMember getTaskDetails(@PathVariable String memberId){
        return teamService.getTeamMember2(memberId);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/members")
    public TeamMember saveTeamMember(@RequestBody TeamMember teamMember) {
        return teamService.saveTeamMember(teamMember);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/members")
    public List<TeamMember> getTeamMembers() {
        return teamService.getTeamMembers();
    }
}

