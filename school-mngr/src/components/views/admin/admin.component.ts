import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Lesson } from '../../../models/lesson.model';
import { Store } from '@ngrx/store';
import { addLesson, assignProfessor, deleteLesson, loadLessons, updateLesson } from '../../store/lesson/lesson.actions';
import { selectAllLessons } from '../../store/lesson/lesson.selector';
import { loadProfessors } from '../../store/professors/professors.actions';
import { selectAllProfessors } from '../../store/professors/professors.selector';
import { User } from '../../../models/user.model';

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
  selectedProfessor: string | undefined;
  selectedLecture: string | undefined;

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

}
