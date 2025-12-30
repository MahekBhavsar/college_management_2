import { Component, inject, OnInit, signal } from '@angular/core';
import { TeacherService } from '../apis/teacher-service';
import { Forms } from '../shared/forms/forms';
import { Table } from '../shared/table/table';
import { TeacherData } from '../interface/interface';

@Component({
  selector: 'app-teacher',
  standalone: true,
  imports: [Forms, Table],
  templateUrl: './teacher.html',
  styleUrl: './teacher.css',
})
export class Teacher implements OnInit {
  private teacherService = inject(TeacherService);

  teachers = signal<TeacherData[]>([]);
  editTeacher = signal<TeacherData | null>(null);

  ngOnInit() { this.loadTeachers(); }

  loadTeachers() {
    this.teacherService.getAll().subscribe(res => this.teachers.set(res));
  }

  addTeacher(data: TeacherData) {
    this.teacherService.add(data).subscribe(res => {
      // Simple logic: Get current list, add new, set signal
      const currentList = this.teachers(); 
      this.teachers.set([...currentList, res]);
      alert('Teacher Added Successfully');
    });
  }

  updateTeacher(data: TeacherData) {
    this.teacherService.update(data).subscribe(() => {
      // Simple logic: Reload from server or refresh the list
      this.loadTeachers(); 
      this.editTeacher.set(null);
      alert('Teacher Updated Successfully');
    });
  }

  deleteTeacher(id: string) {
    if (confirm('Are you sure?')) {
      this.teacherService.delete(id).subscribe(() => {
        // Simple logic: Reload from server is the easiest way
        this.loadTeachers(); 
        alert('Teacher Deleted Successfully');
      });
    }
  }

  edit(data: TeacherData) {
    this.editTeacher.set(data);
  }
}