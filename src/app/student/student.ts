import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { StudentService } from '../apis/student-service';
import { Forms } from '../shared/forms/forms';
import { Table } from '../shared/table/table';
import { StudentData } from '../interface/interface';
import { Observable, firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [Forms, Table],
  templateUrl: './student.html',
  styleUrls: ['./student.css']
})
export class Student implements OnInit {
  private cdr = inject(ChangeDetectorRef);
  private studentService = inject(StudentService);

  students$!: Observable<StudentData[]>; // Observable stream for async pipe
  editStudent: StudentData | null = null;

  ngOnInit() {
    this.loadStudents();
  }

  loadStudents() {
    this.students$ = this.studentService.getAll();
    this.cdr.detectChanges();
  }

  // Use async/await for mutations
  // async addStudent(data: StudentData) {
  //   try {
  //     await firstValueFrom(this.studentService.add(data));
  //     alert('Student Added Successfully');
  //     this.loadStudents(); // refresh the Observable
  //   } catch (error) {
  //     console.error('Error adding student:', error);
  //   }
  // }
  async addStudent(data: StudentData) {
  try {
    // 1. Get current students to calculate next ID
    const currentStudents = await firstValueFrom(this.students$);
    
    // 2. Find the highest ID and add 1
    const maxId = currentStudents.length > 0 
      ? Math.max(...currentStudents.map(s => Number(s.id))) 
      : 0;
    
    data.id = (maxId + 1).toString(); // Assign new auto-incremented ID

    // 3. Send to service
    await firstValueFrom(this.studentService.add(data));
    alert('Student Added Successfully');
    this.loadStudents();
  } catch (error) {
    console.error('Error adding student:', error);
  }
}

  async updateStudent(data: StudentData) {
    try {
      await firstValueFrom(this.studentService.update(data));
      alert('Student Updated Successfully');
      this.loadStudents();
      this.editStudent = null;
    } catch (error) {
      console.error('Error updating student:', error);
    }
  }

  async deleteStudent(id: string) {
    try {
      await firstValueFrom(this.studentService.delete(id));
      alert('Student Deleted Successfully');
      this.loadStudents();
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  }

  edit(data: StudentData) {
    this.editStudent = { ...data };
  }
}
