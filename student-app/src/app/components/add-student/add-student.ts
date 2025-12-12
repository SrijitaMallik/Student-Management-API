// src/app/components/add-student/add-student.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentService, Student } from '../../services/student';

@Component({
  selector: 'app-add-student',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-student.html',
  styleUrls: ['./add-student.css']
})
export class AddStudent implements OnInit {
  form: FormGroup;
  saving = false;

  // classes per assignment (Class 6 - Class 9)
  classes = ['Class 6','Class 7','Class 8','Class 9'];
  subjects = ['Mathematics','Science','English','History','Geography'];

  constructor(private fb: FormBuilder, private svc: StudentService, private router: Router) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      className: ['', Validators.required],
      gender: ['', Validators.required],
      hasHobby: [false],
      hobby: [''],
      favouriteSubject: ['']
    });
  }

  ngOnInit(): void {
    // Make hobby required only when checkbox checked
    this.form.get('hasHobby')?.valueChanges.subscribe(val => {
      const hobby = this.form.get('hobby');
      if (val) {
        hobby?.setValidators([Validators.required, Validators.minLength(2)]);
      } else {
        hobby?.clearValidators();
        hobby?.setValue('');
      }
      hobby?.updateValueAndValidity();
    });
  }

  // used in template for *ngIf
  showHobby(): boolean {
    return !!this.form.get('hasHobby')?.value;
  }

  // class message logic per assignment
  classMessage(): string {
    const c = this.form.get('className')?.value;
    if (!c) return '';
    if (c === 'Class 9') return 'You will appear in board exams soon. All the Best !!';
    if (c === 'Class 6') return 'Welcome to middle school!';
    return 'Education and hobby go hand in hand!';
  }

  // Save -> add the student then go home ('/')
  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving = true;

    const payload: Student = {
      name: this.form.value.name,
      className: this.form.value.className,
      gender: this.form.value.gender,
      hasHobby: !!this.form.value.hasHobby,
      hobby: this.form.value.hasHobby ? this.form.value.hobby : null,
      favouriteSubject: this.form.value.favouriteSubject || null
    };

    this.svc.addStudent(payload).subscribe({
      next: () => {
        // notify service if needed (your service already `.next()` on add)
        this.saving = false;
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Save failed', err);
        this.saving = false;
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/']);
  }
}
