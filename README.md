# 🎓 School Management System with NgRx

## Overview

This project demonstrates how NgRx can be used for state management in a **School Management System** with various roles and operations. The system includes roles such as **Admin**, **Professors**, and **Students**, each with specific responsibilities:

- **Admin**: Manages CRUD operations on lectures, assigns professors to lectures, and oversees the entire system.
- **Professors**: Take student attendance for the lectures they are assigned to.
- **Students**: Enroll in courses, view their grades, and track their progress.

This application is designed to showcase the power of NgRx in handling complex state management tasks in a scalable and efficient way.

### Features
- Different dashboards for each user role 🎭:
  - **Admin**: Manages lectures, professors, and assigns them to courses.
  - **Professors**: Manage attendance for students in their assigned lectures and assign grades.
  - **Students**: Enroll in courses and view their grades and progress.
  - **NgRx**: Centralized state management that keeps the application data consistent across all components.
  
- **Firebase Integration**:
  - Real-time database integration with Firebase to store data such as users, lectures, student grades, and attendance.
  - Firebase authentication for user management.

- **Responsive UI**: The system provides a modern user interface that adapts to different devices for an enhanced user experience.

- **Deployment**: The application is hosted on Vercel for live access.

**Live Application**: [View deployed version](https://school-mngr-lovat.vercel.app/)

## 🛠️ Tech Stack
- **Angular**: Frontend framework for building the application.
- **NgRx**: State management library for managing shared state across the app.
- **TypeScript**: Programming language used for Angular development.
- **RxJS**: Library for reactive programming, handling async operations and events.
- **Firebase**: Backend as a service for storing and managing data, including Firebase Firestore for the database and Firebase Authentication for user authentication.
- **HTML/CSS**: Markup and styling for the user interface.

## 🔧 Firebase Setup

This project uses **Firebase** for real-time database management and user authentication. To run this project locally or connect it to your own Firebase project:

1. **Create a Firebase Project**:
   - Go to [Firebase Console](https://console.firebase.google.com/).
   - Create a new project and follow the setup instructions.

2. **Set Up Firebase Firestore**:
   - In the Firebase Console, go to **Firestore Database** and enable it.
   - Create collections like `users`, `lectures`, and `grades` for storing relevant data.
   
3. **Set Up Firebase Authentication**:
   - In the Firebase Console, navigate to **Authentication** and enable the sign-in methods you want (email/password, Google, etc.).

4. **Configure Firebase SDK**:
   - In your Firebase project settings, get your Firebase config credentials (API key, Auth domain, etc.).
   - In the Angular app, replace the Firebase configuration in `src/environments/environment.ts` with your project’s credentials.

```typescript
export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "your-api-key",
    authDomain: "your-project-id.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project-id.appspot.com",
    messagingSenderId: "your-sender-id",
    appId: "your-app-id",
    measurementId: "your-measurement-id"
  }
};

## 🔧 Clone the Project

To clone this project and run it locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/GengiuRobert/school-mngr.git
   ```
2. **Navigate to the project directory**:
   ```bash
   cd ./school-mngr
   ```
3. **Install the dependencies**:
   ```bash
   npm install
   ```
4. **Run the project**:
   ```bash
   git clone https://github.com/GengiuRobert/school-mngr.git
   ```
5. **The project will be available at**:
   ```bash
   (http://localhost:4200/)
   ```
