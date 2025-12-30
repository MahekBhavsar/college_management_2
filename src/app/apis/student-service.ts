import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StudentData } from '../interface/interface';

@Injectable({ providedIn: 'root' })
export class StudentService {
  students: StudentData[] = [];
  private apiUrl = 'http://localhost:3000/students';

  constructor(private http: HttpClient) {}

  getAll(): Observable<StudentData[]> {
    return this.http.get<StudentData[]>(this.apiUrl);
  }

  add(student: StudentData): Observable<StudentData> {
    return this.http.post<StudentData>(this.apiUrl, student);
  }

  update(student: StudentData): Observable<StudentData> {
    return this.http.put<StudentData>(`${this.apiUrl}/${student.id}`, student);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}