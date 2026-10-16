
package com.example.studentapi.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.studentapi.model.Student;

@Service
public class StudentService {

    private final List<Student> students = new ArrayList<>();

    public StudentService() {
        students.add(new Student(1, "Rahul", "Information Technology"));
        students.add(new Student(2, "Priya", "Computer Engineering"));
        students.add(new Student(3, "John", "Information Technology"));
    }

    public List<Student> getAllStudents() {
        return students;
    }

    public Student addStudent(Student student) {
        int nextId = students.stream()
                .mapToInt(s -> s.getId() == null ? 0 : s.getId())
                .max()
                .orElse(0) + 1;

        student.setId(nextId);
        students.add(student);
        return student;
    }
}
