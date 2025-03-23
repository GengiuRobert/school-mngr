import { Grade } from "./grade.model";

export interface Student {
    email: string,
    id: string,
    role: string,
    grades: Grade[];
}