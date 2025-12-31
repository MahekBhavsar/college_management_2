import { Component, inject, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { TeacherService } from '../apis/teacher-service';
import { Forms } from '../shared/forms/forms';
import { Table } from '../shared/table/table';
import { TeacherData } from '../interface/interface';
import { Observable, firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-teacher',
  standalone: true,
  imports: [Forms, Table],
  templateUrl: './teacher.html',
  styleUrls: ['./teacher.css'],
  
 
})
export class Teacher implements OnInit {
    private cdr = inject(ChangeDetectorRef);
  private teacherService = inject(TeacherService);

  // Simple Observable property
  teachers$!: Observable<TeacherData[]>;
  editTeacher: TeacherData | null = null;

  ngOnInit() {
    this.loadTeachers();
  }

  loadTeachers() {
    // Re-assigning the observable property refreshes the UI via async pipe
    this.teachers$ = this.teacherService.getAll();
     this.cdr.detectChanges();
  }

  // async addTeacher(data: TeacherData) {
  //   try {
  //     await firstValueFrom(this.teacherService.add(data));
  //     alert('Teacher Added Successfully');
  //     this.loadTeachers(); // Refresh list
  //   } catch (error) {
  //     console.error('Error adding teacher:', error);
  //   }
  // }

  async addTeacher(data: TeacherData) {
    try {
      // 1. Get current students to calculate next ID
      const currentTeachers = await firstValueFrom(this.teachers$);
      
      // 2. Find the highest ID and add 1
      const maxId = currentTeachers.length > 0 
        ? Math.max(...currentTeachers.map(s => Number(s.id))) 
        : 0;
      
      data.id = (maxId + 1).toString(); // Assign new auto-incremented ID
  
      // 3. Send to service
      await firstValueFrom(this.teacherService.add(data));
      alert('Student Added Successfully');
      this.loadTeachers();
    } catch (error) {
      console.error('Error adding student:', error);
    }
  }
  async updateTeacher(data: TeacherData) {
    try {
      await firstValueFrom(this.teacherService.update(data));
      alert('Teacher Updated Successfully');
      this.editTeacher = null;
      this.loadTeachers(); // Refresh list
    } catch (error) {
      console.error('Error updating teacher:', error);
    }
  }

  async deleteTeacher(id: string) {
    if (confirm('Delete this record?')) {
      try {
        await firstValueFrom(this.teacherService.delete(id));
        alert('Teacher Deleted Successfully');
        this.loadTeachers(); // Refresh list
      } catch (error) {
        console.error('Error deleting teacher:', error);
      }
    }
  }

  edit(data: TeacherData) {
    this.editTeacher = { ...data };
  }
}