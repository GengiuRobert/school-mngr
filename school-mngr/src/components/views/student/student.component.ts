import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';

import { AuthService } from '../../../services/auth.service';
import { Lesson } from '../../../models/lesson.model';
import { Student } from '../../../models/student.model';

import { loadLessons, assignStudentToLesson } from '../../store/lesson/lesson.actions';
import { selectAllLessons } from '../../store/lesson/lesson.selector';
import { loadStudents } from '../../store/students/students.actions';
import { selectAllStudents } from '../../store/students/students.selector';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  lessons: Lesson[] = [];

  myLectures: Lesson[] = [];

  myGrades: { lessonId: string; grade: string }[] = [];

  selectedLectureId: string = '';

  currentStudent: Student | null = null;

  constructor(private store: Store, private authService: AuthService) { }

  ngOnInit(): void {
    this.store.dispatch(loadLessons());

    this.store.dispatch(loadStudents());

    this.store.select(selectAllLessons).subscribe((lessons) => {
      this.lessons = lessons;
      this.updateMyLectures();
    });

    this.store.select(selectAllStudents).subscribe((allStudents) => {
      if (this.currentStudent) return;

      this.authService.user.subscribe((user) => {
        if (user) {
          const stud = allStudents.find((s) => s.id === user.id);
          if (stud) {
            this.currentStudent = stud;
            this.myGrades = stud.grades || [];
            this.updateMyLectures();
          }
        }
      });
    });
  }


  private updateMyLectures(): void {
    if (!this.currentStudent || !this.lessons.length) {
      this.myLectures = [];
      return;
    }
    const studentId = this.currentStudent.id;
    this.myLectures = this.lessons.filter((lesson) =>
      lesson.studentsId?.includes(studentId)
    );
  }

  onEnrollLecture(form: NgForm): void {
    if (!form.valid) return;
    if (!this.currentStudent || !this.selectedLectureId) {
      console.error('Missing student or lecture ID');
      return;
    }

    this.store.dispatch(
      assignStudentToLesson({
        lessonId: this.selectedLectureId,
        studentId: this.currentStudent.id
      })
    );

    form.reset();
    this.selectedLectureId = '';
  }

  getLessonName(lessonId: string): string {
    const lesson = this.lessons.find((l) => l.id === lessonId);
    return lesson?.name || 'Unknown';
  }
}
