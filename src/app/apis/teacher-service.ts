import { Injectable } from '@angular/core';
import { TeacherData } from '../interface/interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TeacherService {
 

  teachers: TeacherData[] = [];
  private apiUrl = 'http://localhost:3000/teachers';

  constructor(private http: HttpClient) {}

  getAll(): Observable<TeacherData[]> {
    return this.http.get<TeacherData[]>(this.apiUrl);
  }
  

  add(student: TeacherData): Observable<TeacherData> {
    return this.http.post<TeacherData>(this.apiUrl, student);
  }

  update(student: TeacherData): Observable<TeacherData> {
    return this.http.put<TeacherData>(`${this.apiUrl}/${student.id}`, student);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}