import { Component } from '@angular/core';
import { LessonsService } from '../../../services/lessons.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Lesson } from '../../../models/lesson.model';
import { Store } from '@ngrx/store';
import { addLesson } from '../../store/lesson/lesson.actions';

@Component({
  selector: 'app-admin',
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  lectureName: string = '';
  lessons: Lesson[] = [];

  constructor(private store: Store) { }

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
