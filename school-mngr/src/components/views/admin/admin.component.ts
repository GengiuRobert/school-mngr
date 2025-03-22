import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Lesson } from '../../../models/lesson.model';
import { Store } from '@ngrx/store';
import { addLesson, loadLessons } from '../../store/lesson/lesson.actions';
import { selectAllLessons } from '../../store/lesson/lesson.selector';

@Component({
  selector: 'app-admin',
  imports: [CommonModule, FormsModule, NgFor],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {

  lectureName: string = '';
  lessons: Lesson[] = [];

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(loadLessons());

    this.store.select(selectAllLessons).subscribe((lessons: Lesson[]) => {
      this.lessons = lessons;
    });
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

}
