import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LessonState } from './lesson.reducer';

export const selectLessonState = createFeatureSelector<LessonState>('lesson');

export const selectAllLessons = createSelector(
    selectLessonState,
    (state:LessonState) =>state.lessons
);

export const selectLessonsError = createSelector(
    selectLessonState,
    (state:LessonState) => state.error
);