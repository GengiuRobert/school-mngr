import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProfessorsState } from './professors.reducer';

export const selectProfessorState = createFeatureSelector<ProfessorsState>('professors');

export const selectAllProfessors = createSelector(
    selectProfessorState,
    (state: ProfessorsState) => state.professors
);

export const selectLessonsForProfessor = createSelector(
    selectProfessorState,
    (state) => state.lessonsForProfessor
);

export const selectProfessorsError = createSelector(
    selectProfessorState,
    (state) => state.error
);

export const selectProfessorsLoading = createSelector(
    selectProfessorState,
    (state) => state.loading
);