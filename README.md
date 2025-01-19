## Project Name: TalkPro

**Project Description:**

TalkPro is a user-friendly web application designed to connect language learners with qualified tutors online. It empowers users to:

- Discover the benefits of learning a new language with a professional instructor.
- Explore a comprehensive catalog of experienced language tutors.
- Refine their search using various filters to find the perfect match based on learning goals and budget.
- Build a personalized list of favorite tutors for easy access.

**Key Features:**

**Pages:**

- **Home Page:**
  - Captures user attention with a compelling introduction to the platform's value proposition.
  - Features a clear call to action, encouraging users to explore the available tutors.
  - Showcases a modern and engaging design inspired by the provided prototype or custom styling for a unique look.
- **Teachers Page:**
  - Presents a well-organized list of language tutors.
  - Offers intuitive filtering options based on teaching language, student proficiency level, and hourly rate.
  - Implements a "Load More" button to dynamically fetch additional teacher profiles from the database.
- **Favorites Page:**
  - A private haven accessible only to registered users.
  - Provides a personalized list of favorite tutors, maintaining a consistent style with the "Teachers" page.

**Functionalities:**

**Authentication:**

- Seamless user registration, login, logout, and data retrieval powered by Firebase Authentication.
- Registration and login forms built with react-hook-form for a smooth user experience.
- yup integration for robust form validation, ensuring data accuracy.
- Modal dialogs for authentication forms, closing on user interaction (button click, backdrop click, or Esc key press).

**Teacher Management:**

- Leverages Firebase Realtime Database to store comprehensive teacher data, including:
  - Name
  - Surname
  - Languages Offered
  - Student Levels Taught
  - Rating and Reviews
  - Price per Hour
  - Additional relevant information
- Teacher cards display essential details with interactive options:
  - Favorite: Effortlessly add/remove tutors from the favorites list, persisting across page refreshes.
  - Read More: Expand the card to reveal detailed information and student reviews.
  - Book Trial Lesson: Opens a modal form for booking a trial lesson, complete with mandatory field validation.

**Favorites Handling:**

- Non-registered users attempting to favorite a teacher are presented with a clear notification or modal, prompting them to log in.
- Registered users can manage their favorites list using either localStorage or Firebase for data persistence.

**Routing:**

- Implemented with React Router, providing clear navigation paths:
  - `/`: Home Page https://talk-pro.vercel.app/
  - `/teachers`: Teachers Page https://talk-pro.vercel.app/teachers
  - `/favorites`: Favorites Page https://talk-pro.vercel.app/favorite

**Interactive Features:**

- Dynamic loading of teacher cards for efficient data retrieval.
- Persistent favorite state across page reloads, ensuring a seamless user experience.
- Responsive UI that adapts to different screen sizes and includes interactive modal dialogs.

**Technical Requirements:**

- Frontend: React, JavaScript, CSS, HTML
- State Management: **Context API (for efficient component state management)**
- Routing: React Router
- Styling: CSS Modules
- Backend: Firebase
  - Authentication (user login/logout)
  - Realtime Database (for storing and managing teacher data)
  - Firestore (to store a list of users' favorite teachers)
- Validation: react-hook-form & yup (for robust form validation)
- Build Tool: Vite (for efficient development and build process)
- Deployment: Hosted on Vercel

**Dependencies:**

... (List your dependencies here) ...

**Installation Instructions:**

1. Clone the repository: git clone: https://github.com/EduasdVenidiktov/TalkPro
2. Navigate to the project directory: cd TalkPro
3. Install dependencies: npm install
4. Start the development server: npm start
5. Open the app in your browser at http://localhost:3000.

**Useful Links:**

- Figma Design Prototype (link if applicable)
- Technical Requirements (link to a separate document or section within the README)
- Live Demo (link to the deployed application, if available)

**Author:**

- Name: Eduard Venidiktov
- Email: edven7777777@gmail.com
- GitHub: https://github.com/EduasdVenidiktov/TalkPro
