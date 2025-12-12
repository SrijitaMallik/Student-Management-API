import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

export interface Student {
  id?: number;
  name: string;
  className?: string;
  gender?: string;
  hasHobby?: boolean;
  hobby?: string | null;
  favouriteSubject?: string | null;
}

@Injectable({ providedIn: 'root' })
export class StudentService {
  private api = 'https://localhost:7170/api/Students';
  private _changes = new Subject<void>();
  changes$ = this._changes.asObservable();

  constructor(private http: HttpClient) {}

  getStudents(): Observable<Student[]> {
    console.log('StudentService.getStudents() called');
    return this.http.get<any[]>(this.api, { headers: { 'Cache-Control': 'no-cache' } }).pipe(
      map(list => (list || []).map(item => ({
        id: item.id,
        name: item.name,
        className: item.className ?? item.class ?? item.ClassName ?? '',
        gender: item.gender ?? '',
        hasHobby: !!item.hasHobby,
        hobby: item.hobby ?? null,
        favouriteSubject: item.favouriteSubject ?? item.favSubject ?? null
      }))),
      tap(() => console.log('StudentService.getStudents() success'))
    );
  }

  addStudent(s: Student): Observable<Student> {
    const body = {
      name: s.name,
      className: s.className,
      gender: s.gender,
      hasHobby: !!s.hasHobby,
      hobby: s.hasHobby ? s.hobby : null,
      favouriteSubject: s.favouriteSubject || null
    };
    return this.http.post<Student>(this.api, body).pipe(
      tap(() => this._changes.next())
    );
  }

  notifyChange() {
    this._changes.next();
  }
}
