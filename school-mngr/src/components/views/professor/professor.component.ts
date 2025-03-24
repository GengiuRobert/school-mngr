import { Component, OnInit } from '@angular/core';
import { Lesson } from '../../../models/lesson.model';
import { Student } from '../../../models/student.model';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthService } from '../../../services/auth.service';
import { loadLessonsForProfessor } from '../../store/professors/professors.actions';
import { selectLessonsForProfessor } from '../../store/professors/professors.selector';
import { loadStudents, updateStudentGrades } from '../../store/students/students.actions';
import { selectAllStudents } from '../../store/students/students.selector';

@Component({
  selector: 'app-professor',
  imports: [CommonModule, FormsModule, NgFor],
  templateUrl: './professor.component.html',
  styleUrls: ['./professor.component.css']
})
export class ProfessorComponent implements OnInit {
  lessonsForProfessor: Lesson[] = [];
  students: Student[] = [];
  selectedLessonId: string = '';
  selectedStudentId: string = '';
  enteredGrade: string = '';

  constructor(private store: Store, private authService: AuthService) { }

  ngOnInit(): void {
    this.store.dispatch(loadStudents());

    this.store.select(selectAllStudents).subscribe((students) => {
      this.students = students;
    });

    this.authService.user.subscribe(user => {
      if (user) {
        this.store.dispatch(loadLessonsForProfessor({ professorId: user.id }));
      } else {
        console.error('No user logged in.');
      }
    });

    this.store.select(selectLessonsForProfessor).subscribe((lessons) => {
      this.lessonsForProfessor = lessons;
    });
  }

  getStudentGrades(studentId: string, lessonId: string): string[] {
    const student = this.students.find(s => s.id === studentId);
    if (!student || !student.grades) {
      return [];
    }
    const gradesForLesson = student.grades
      .filter(g => g.lessonId === lessonId)
      .map(g => g.grade);

    return gradesForLesson;
  }

  getStudentsForSelectedLesson(): Student[] {
    if (!this.selectedLessonId) {
      return [];
    }
    const lesson = this.lessonsForProfessor.find(
      (l) => l.id === this.selectedLessonId
    );
    if (!lesson || !lesson.studentsId) {
      return [];
    }
    return this.students.filter((s) => lesson.studentsId!.includes(s.id));
  }

  onAssignGrade(form: NgForm) {
    if (!form.valid) return;

    if (!this.selectedLessonId || !this.selectedStudentId || !this.enteredGrade) {
      console.error('Missing required fields');
      return;
    }

    this.store.dispatch(
      updateStudentGrades({
        userId: this.selectedStudentId,
        lessonId: this.selectedLessonId,
        grade: this.enteredGrade
      })
    );

    form.reset();
    this.selectedLessonId = '';
    this.selectedStudentId = '';
    this.enteredGrade = '';
  }

  getEmailName(email: string): string {
    if (email) {
      return email.split('@')[0]; 
    }
    return ''; 
  }
}
