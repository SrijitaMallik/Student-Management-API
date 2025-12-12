# Student App – README

This is a simple Angular + .NET project where you can view and add students.
It has two screens: Home (list of all students) and Add Student (form to add a new student).

## 1. Project Structure

Frontend folder structure:

student-api/
  src/
    app/
      components/
        home/
          home.ts
          home.html
          home.css
          home.spec.ts
        
        add-student/
          add-student.ts
          add-student.html
          add-student.css
          add-student.spec.ts

      services/
        student.ts
        student.spec.ts

      app.config.server.ts

## 2. Technologies Used
* Frontend

Angular (Standalone Components)

TypeScript

HTML & CSS

HttpClient for API calls

Reactive Forms

* Backend

.NET 8 Web API

CORS enabled for Angular

In-memory student list or database (optional)

## 3. How to Run the Backend

Open the API project in Visual Studio 2022

Run the project

Swagger will open at:

https://localhost:7298/swagger/index.html


The GET students URL:

https://localhost:7298/api/Students


Make sure the API is running before starting Angular.

## 4. How to Run the Angular App

Open terminal inside student-api folder:

npm install
ng serve


Angular will open at:

http://localhost:4200

## 5. What the App Does
Home Page

Fetches all students from .NET backend.

Displays:

Name

Class

Gender

Hobby

Favourite Subject

Add Student Page

Form with validations:

Name (required, min 5 characters)

Class (required)

Gender (required)

Optional hobby (visible only if checkbox is checked)

Optional favourite subject

On submit, the student is posted to backend.

After saving, user is redirected back to Home.

## 6. API Endpoints Used

GET all students:

GET https://localhost:7298/api/Students


POST new student:

POST https://localhost:7298/api/Students

## 7. Common Issues / Fixes

Refresh gives 404 error
Fix → add this in app.config.ts and use proper routing setup.

CORS error
Fix → enable CORS in .NET Program.cs

Student list empty
Cause → API not running
Fix → Run .NET backend first.

## 8. Running Both Together

Start the .NET backend

Start Angular frontend

Open browser → http://localhost:4200

Navigate:

Home → see all students

Add Student → submit form → redirect to home
