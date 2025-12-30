import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { StudentService } from '../apis/student-service';
import { Forms } from '../shared/forms/forms';
import { Table } from '../shared/table/table';
import { StudentData } from '../interface/interface';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [Forms, Table],
  templateUrl: './student.html',
  styleUrl:'./student.css'
})
export class Student implements OnInit {
  private cdr = inject(ChangeDetectorRef);
  private studentService = inject(StudentService);

  // Strictly typed array
  students: StudentData[] = [];
  editStudent: StudentData | null = null;

  ngOnInit() {
    this.loadStudents();
  }

  // 1. Load Data
  loadStudents() {
    this.studentService.getAll().subscribe((res: StudentData[]) => {
      console.log('Fetching all students:', res);
      this.students = res;
      this.cdr.detectChanges();
    });
  }

  // 2. Add Student (Instant UI Update)
  addStudent(data: StudentData) {
    console.log('Form data to add:', data);
    this.studentService.add(data).subscribe((res: StudentData) => {
      console.log('Student added to server:', res);
      alert('Student Added Successfully');
      
      // 🔥 REASSIGN: Create new array so Table refreshes
      this.students = [...this.students, res]; 
      this.cdr.detectChanges();
    });
  }

  // 3. Update Student (Instant UI Update)
  updateStudent(data: StudentData) {
    console.log('Data to update:', data);
    const id = data.id;
    this.studentService.update(data).subscribe(() => {
      console.log('Update successful on server for ID:', id);
      alert('Student Updated Successfully');
      
      const index = this.students.findIndex(s => s.id === id);
      if (index !== -1) {
        // Update the item
        this.students[index] = data; 
        // 🔥 REASSIGN: Force child table to refresh
        this.students = [...this.students]; 
      }
      
      this.editStudent = null;
      this.cdr.detectChanges();
    });
  }

  // 4. Delete Student (Instant UI Update)
  deleteStudent(id: string) { 
    console.log('Attempting to delete ID:', id);
    if (confirm('Are you sure you want to delete?')) {
      this.studentService.delete(id).subscribe(() => {
        console.log('Delete successful on server for ID:', id);
        alert('Student Deleted Successfully');

        // 🔥 REASSIGN: Filter creates a new array without the deleted student
        this.students = this.students.filter(student => student.id !== id);
        
        this.cdr.detectChanges();
      });
    }
  }

  // 5. Setup for Edit Mode
  edit(data: StudentData) {
    console.log('Loading data into edit form:', data);
    this.editStudent = { ...data };
  }
}