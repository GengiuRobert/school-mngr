import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StudentsState } from './students.reducer';

export const selectStudentsState = createFeatureSelector<StudentsState>('students');

export const selectAllStudents = createSelector(
  selectStudentsState,
  (state: StudentsState) => state.students
);
