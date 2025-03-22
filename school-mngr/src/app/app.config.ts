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

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideStore({ lesson: LessonReducer }),
    provideEffects([LessonsEffects]),
  ]
};
