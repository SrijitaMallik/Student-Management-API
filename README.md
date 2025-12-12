## Student Management App – README
# 📌 Overview

This project is a simple Student Management Application built using:

Frontend: Angular 17 (Standalone Components)

Backend: ASP.NET Core Web API

Data exchange: JSON

Features:

* Display all students
* Add a new student (Reactive Form)
* Show/hide fields based on class and hobby selection
* API integration for GET and POST

# 📁 Project Structure
student-api/
  src/
    app/
      components/
        add-student/
          add-student.css
          add-student.html
          add-student.ts
          add-student.spec.ts
        home/
          home.css
          home.html
          home.ts
          home.spec.ts
      services/
        student.ts
        student.spec.ts
      app.config.server.ts
  angular.json
  package.json
  tsconfig.json

## 🚀 Backend Setup (ASP.NET Core API)
 ✔ Start the API

 Open API folder in Visual Studio 2022

 Run the project

 Swagger URL example:

 https://localhost:7298/swagger/index.html

# ✔ API Endpoints
GET all students
GET /api/Students

POST a new student
POST /api/Students

Example JSON
{
  "name": "Rahul Sharma",
  "class": "7",
  "gender": "Male",
  "hobby": "Cricket",
  "favouriteSubject": "Maths"
}

## 🌐 Frontend Setup (Angular)
✔ Install dependencies

Open terminal inside student-api/:

npm install

✔ Start Angular app
ng serve -o


Default URL:

http://localhost:4200/

📌 Angular Pages
1️⃣ Home Page

Shows list of all students

Calls:

GET https://localhost:7298/api/Students

2️⃣ Add Student Page

Reactive Form

Validations:

Name → Required, Min length 5

Class → Required

Gender → Required

Conditional UI:

Show hobby input only when "Has Hobby" checked

Class 6 → “Welcome to middle school!”

Class 9 → “You will appear in board exams soon”

On Save → Call POST API and return to Home

🔗 Angular Routes
/               → HomeComponent
/add-student    → AddStudentComponent

🛠 Commands Used During Development
Purpose	Command
Create Angular project	ng new student-api
Create Home Component	ng g c components/home
Create Add Student Component	ng g c components/add-student
Create Service	ng g s services/student
Run app	ng serve
❗Common Issues & Fixes
1. Refreshing Home page shows blank

Solution: ensure correct base href in index.html:

<base href="/">

2. API not loading in Angular

Check CORS in API:

app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());

3. SSL Port mismatch

Ensure Angular service URL matches Swagger port:

private apiUrl = 'https://localhost:7298/api/Students';

4. Route errors

Use standalone routing:

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'add-student', component: AddStudentComponent },
  { path: '**', redirectTo: '' }
];
