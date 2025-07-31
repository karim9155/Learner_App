package com.example.learnprojectback.controller;

import com.example.learnprojectback.dto.CourseDTO;
import com.example.learnprojectback.security.JwtUser;
import com.example.learnprojectback.service.CourseService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/courses")
public class CourseController {

    private final CourseService courseService;

    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }

    @PostMapping
    public ResponseEntity<CourseDTO> create(@RequestBody CourseDTO dto, @AuthenticationPrincipal JwtUser auth) {
        CourseDTO createdCourse = courseService.createCourse(dto.getOrganizationId(), auth.getId(), dto);
        return ResponseEntity.ok(createdCourse);
    }

    @GetMapping
    public List<CourseDTO> list(@AuthenticationPrincipal JwtUser auth) {
        // In a real application, we would get the orgId from the authenticated user
        UUID orgId = UUID.randomUUID(); // Placeholder
        return courseService.listCourses(orgId);
    }
}
