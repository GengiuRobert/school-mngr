import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { firebaseConfig } from '../environments/environment';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideHttpClient } from '@angular/common/http';

import { provideStore } from '@ngrx/store';
import { LessonReducer } from '../components/store/lesson/lesson.reducer';
import { provideEffects } from '@ngrx/effects';
import { LessonsEffects } from '../components/store/lesson/lesson.effects';
import { professorsReducer} from '../components/store/professors/professors.reducer';
import { ProfessorEffects } from '../components/store/professors/professors.effects';
import { studentsReducer } from '../components/store/students/students.reducer';
import { StudentsEffects } from '../components/store/students/students.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideStore({ lesson: LessonReducer, professors: professorsReducer,students:studentsReducer }), 
    provideEffects([LessonsEffects, ProfessorEffects,StudentsEffects]),
  ]
};
