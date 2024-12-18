Language Learning Platform
This project is a web application for a company offering online language learning services. The application includes several pages, a user authentication system, and the ability to filter and save favorite tutors.

Table of Contents
Project Overview
Features
Technologies Used
Installation
Usage
Firebase Setup
Project Structure
License
Project Overview
The application consists of three main pages:

Home Page: A landing page with company advantages and a link to start using the app, redirecting users to the Teachers page.
Teachers Page: Displays a list of available teachers that users can filter by language, level, and hourly price. Users can load more cards by clicking a "Load more" button.
Favorites Page: A private page where authorized users can view a list of their favorite teachers.
Features
User Authentication:

Sign-up and login with Firebase authentication.
Users can register, log in, log out, and retrieve user data.
Session persistence with Firebase and localStorage.
Registration and Login Forms:

Forms for registration and login with validation using react-hook-form and yup.
Modal window behavior: close when clicking on a "close" button, backdrop, or pressing the "Esc" key.
Firebase Database:

Use Firebase Realtime Database to store teacher data.
Each teacher entry contains:
name, surname, languages, levels, rating, reviews, price_per_hour, lessons_done, avatar_url, lesson_info, conditions, experience.
Teachers are loaded dynamically from Firebase and displayed in cards.
Teacher Cards:

Display teacher details in cards with a "Read more" button to reveal more information.
Users can "favorite" teachers by clicking on a heart icon. If not logged in, a message prompts them to log in.
Favorites:

Logged-in users can add teachers to their favorites.
Favorites persist across page reloads using Firebase or localStorage.
Users can remove teachers from their favorites by clicking on the heart icon again.
Trial Booking:

Users can click on a "Book trial lesson" button to open a booking form for trial lessons.
The form includes validation and closes on "close" button click, backdrop click, or pressing "Esc".
Private Favorites Page:

Available only for logged-in users.
Displays a list of teachers added to the favorites.
Routing:

React Router is used for navigating between Home, Teachers, and Favorites pages.
Teacher Filters:

Users can filter teachers by language, knowledge level, and hourly rate.
Technologies Used
React: The main framework for building the user interface.
Firebase: For user authentication and data storage.
React Router: For navigation between pages.
react-hook-form: For handling form validation.
yup: For schema-based validation of forms.
CSS Modules: For scoped and modular styles.
Vite: A build tool for fast development.
Installation
To get started with this project:

Clone the repository:

bash
Копировать код
git clone https://github.com/your-username/teacher-platform.git
cd teacher-platform
Install the dependencies:

bash
Копировать код
npm install
Set up Firebase:

Create a Firebase project on the Firebase Console.
Enable Firebase Authentication (Email/Password method).
Set up Firebase Realtime Database.
Replace the Firebase config in the code with your Firebase credentials.
Run the app locally:

bash
Копировать код
npm run dev
Open the app in your browser at http://localhost:3000.

Usage
Home Page: Introduces the company and provides a link to start using the app.
Teachers Page: Browse and filter tutors, view detailed profiles, and add tutors to your favorites.
Favorites Page: For logged-in users, this page shows a list of all favorite tutors.
Firebase Setup
Firebase Authentication:

Enable email/password authentication in Firebase Console.
Realtime Database:

Set up the Firebase Realtime Database.
Use the provided teachers.json file to populate the database with teacher data.
Firebase Configuration:

Replace the Firebase config object in the src/firebaseConfig.js file with your Firebase credentials.
Project Structure
plaintext
Копировать код
├── public
│ ├── index.html
│ └── ...
├── src
│ ├── components
│ │ ├── HomePage.jsx
│ │ ├── TeachersPage.jsx
│ │ ├── FavoritesPage.jsx
│ │ ├── TeacherCard.jsx
│ │ ├── LoginModal.jsx
│ │ └── ...
│ ├── firebaseConfig.js
│ ├── App.jsx
│ └── index.js
├── styles
│ ├── HomePage.module.css
│ ├── TeachersPage.module.css
│ ├── FavoritesPage.module.css
│ └── ...
├── package.json
├── README.md
└── ...
License
This project is licensed under the MIT License.

This README is designed to help developers and users understand how to set up and use the Language Learning Platform application. If you encounter any issues or need additional help, feel free to open an issue in the repository.
