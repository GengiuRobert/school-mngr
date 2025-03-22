import { createAction, props } from '@ngrx/store';
import { Lesson } from '../../../models/lesson.model';

export const addLesson = createAction(
    '[Lesson] Add Lesson',
    props<{ lesson: Omit<Lesson, 'id'> }>()
);

export const addLessonSuccess = createAction(
    '[Lesson] Add Lesson Success',
    props<{ lesson: Lesson }>()
);

export const addLessonFailure = createAction(
    '[Lesson] Add Lesson Failure',
    props<{ error: any }>()
);

export const updateLesson = createAction(
    '[Lesson] Update Lesson',
    props<{ id: string, changes: Partial<Lesson> }>()
);

export const updateLessonSuccess = createAction(
    '[Lesson] Update Lesson Success',
    props<{ lesson: Lesson }>()
);

export const updateLessonFailure = createAction(
    '[Lesson] Update Lesson Failure',
    props<{ error: any }>()
);

export const deleteLesson = createAction(
    '[Lesson] Delete Lesson',
    props<{ lessonId: string }>()
);

export const deleteLessonSuccess = createAction(
    '[Lesson] Delete Lesson Success',
    props<{ lessonId: string }>()
);

export const deleteLessonFailure = createAction(
    '[Lesson] Delete Lesson Failure',
    props<{ error: any }>()
);

export const loadLessons = createAction('[Lesson] Load Lessons');

export const loadLessonsSuccess = createAction('[Lesson] Load Lessons Success',
    props<{ lessons: Lesson[] }>()
);

export const loadLessonsFailure = createAction('[Lesson] Load Lessons Failure',
    props<{ error: any }>()
);


export const assignProfessor = createAction(
    '[Lesson] Assign Professor',
    props<{ lessonId: string; professorId: string }>()
);

export const assignProfessorSuccess = createAction(
    '[Lesson] Assign Professor Success',
    props<{ lessonId: string; professorId: string }>()
);

export const assignProfessorFailure = createAction(
    '[Lesson] Assign Professor Failure',
    props<{ error: any }>()
);
