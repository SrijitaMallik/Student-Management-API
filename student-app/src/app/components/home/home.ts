import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { StudentService, Student } from '../../services/student';
import { Subscription, filter } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit, OnDestroy {
  students: Student[] = [];
  loading = true;
  private sub = new Subscription();

  constructor(private svc: StudentService, private router: Router, private cd: ChangeDetectorRef) {
    this.sub.add(
      this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe((ev: any) => {
        console.log('Router NavigationEnd ->', ev.urlAfterRedirects ?? ev.url);
        this.load();
      })
    );
  }

  ngOnInit(): void {
    this.load();
    this.sub.add(this.svc.changes$.subscribe(() => {
      console.log('StudentService change event -> reloading');
      this.load();
    }));
  }

  load(): void {
    this.loading = true;
    this.svc.getStudents().subscribe({
      next: (res: Student[]) => {
        console.log('Home.load() got', res?.length ?? 0, 'students');
        this.students = res || [];
        try { this.cd.detectChanges(); } catch (e) {}
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load students', err);
        this.students = [];
        try { this.cd.detectChanges(); } catch (e) {}
        this.loading = false;
      }
    });
  }

  goAdd(): void {
    this.router.navigate(['/add-student']);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
