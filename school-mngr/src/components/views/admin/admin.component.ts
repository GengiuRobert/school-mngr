import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Lesson } from '../../../models/lesson.model';
import { Store } from '@ngrx/store';
import { addLesson, assignProfessor, assignStudentToLesson, deleteLesson, loadLessons, updateLesson } from '../../store/lesson/lesson.actions';
import { selectAllLessons } from '../../store/lesson/lesson.selector';
import { loadProfessors } from '../../store/professors/professors.actions';
import { selectAllProfessors } from '../../store/professors/professors.selector';
import { User } from '../../../models/user.model';
import { Student } from '../../../models/student.model';
import { deleteGrade, editGrade, loadStudents, updateStudentGrades } from '../../store/students/students.actions';
import { selectAllStudents } from '../../store/students/students.selector';
import { Grade } from '../../../models/grade.model';

@Component({
  selector: 'app-admin',
  imports: [CommonModule, FormsModule, NgFor],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {

  lectureName: string = '';
  editingLessonNames: { [key: string]: string } = {};
  lessons: Lesson[] = [];
  professors: User[] = [];
  students: Student[] = [];
  selectedStudent: string | undefined;
  selectedProfessor: string | undefined;
  selectedLecture: string | undefined;
  selectedStudentId: string | undefined = '';
  selectedLectureId: string | undefined = '';
  grade: string | undefined = '';
  editingGrade: { [key: string]: boolean } = {};
  gradeValues: { [key: string]: string } = {};

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(loadLessons());

    this.store.select(selectAllLessons).subscribe((lessons: Lesson[]) => {
      this.lessons = lessons;

      this.lessons.forEach(lesson => {
        this.editingLessonNames[lesson.id] = lesson.name || '';
      });
    });

    this.store.dispatch(loadProfessors());

    this.store.select(selectAllProfessors).subscribe((professors: User[]) => {
      this.professors = professors;
    });

    this.store.dispatch(loadStudents());

    this.store.select(selectAllStudents).subscribe((students) => {
      this.students = students;
    });
  }

  onEditLesson(lesson: Lesson) {
    this.editingLessonNames[lesson.id] = lesson.name || '';
  }

  onAddLecture(form: NgForm) {
    if (!this.lectureName.trim()) {
      return;
    }

    if (!form.valid) {
      return;
    }

    const newLesson = {
      name: this.lectureName,
      studentsId: [],
      professorId: ''
    }

    this.store.dispatch(addLesson({ lesson: newLesson }));

    this.lectureName = '';

  }

  onUpdateLesson(lesson: Lesson) {
    if (!lesson.id) {
      console.error("Lesson ID is missing");
      return;
    }

    const updatedLesson = { ...lesson, name: this.editingLessonNames[lesson.id] || lesson.name };

    this.store.dispatch(updateLesson({ id: lesson.id, changes: updatedLesson }));

    const updatedLessons = this.lessons.map(l =>
      l.id === lesson.id ? { ...l, name: updatedLesson.name } : l
    );
    this.lessons = updatedLessons;
  }

  onDeleteLesson(lessonId: string): void {
    if (lessonId) {
      this.store.dispatch(deleteLesson({ lessonId }));
    }
  }

  onAssignProfessor(form: NgForm): void {
    if (!form.valid) {
      return;
    }

    if (this.selectedProfessor && this.selectedLecture) {
      console.log("Assigning professor:", this.selectedProfessor, "to lecture:", this.selectedLecture);
      this.store.dispatch(assignProfessor({ lessonId: this.selectedLecture, professorId: this.selectedProfessor }));
    } else {
      console.error("Missing Professor or Lecture ID");
    }
  }

  onAssignStudent(form: NgForm): void {

    if (!form.valid) {
      return;
    }


    if (this.selectedStudent && this.selectedLecture) {
      this.store.dispatch(assignStudentToLesson({
        lessonId: this.selectedLecture,
        studentId: this.selectedStudent
      }));
    }
  }

  onAddGrade(form: NgForm) {
    if (!form.valid) {
      return;
    }


    const { selectedStudentId, selectedLectureId, grade } = this;

    if (!selectedStudentId || !selectedLectureId || !grade) {
      console.error("Missing required fields");
      return;
    }


    this.store.dispatch(updateStudentGrades({
      userId: selectedStudentId,
      lessonId: selectedLectureId,
      grade: grade
    }));



    form.reset();
  }

  getLessonName(lessonId: string): string {
    const lesson = this.lessons.find((l) => l.id === lessonId);
    return lesson?.name ?? 'Unknown';
  }

  getEmailName(email: string): string {
    if (email) {
      return email.split('@')[0]; 
    }
    return ''; 
  }

  onEditGradeClick(student: Student, gradeItem: Grade) {
    const key = `${student.id}-${gradeItem.lessonId}`;
    this.editingGrade[key] = true;
    this.gradeValues[key] = gradeItem.grade;
  }

  onSaveGradeClick(student: Student, gradeItem: Grade) {
    const key = `${student.id}-${gradeItem.lessonId}`;
    this.store.dispatch(editGrade({
      userId: student.id,
      lessonId: gradeItem.lessonId,
      grade: this.gradeValues[key]
    }));

    this.editingGrade[key] = false;
  }

  onCancelGradeClick(student: Student, gradeItem: Grade) {
    const key = `${student.id}-${gradeItem.lessonId}`;
    this.editingGrade[key] = false;
    this.gradeValues[key] = gradeItem.grade;
  }

  onDeleteGradeClick(student: Student, grade: Grade) {
    this.store.dispatch(deleteGrade({
      userId: student.id,
      lessonId: grade.lessonId
    }));
  }
}
