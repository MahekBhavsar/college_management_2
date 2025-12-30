import { Component, input, output } from '@angular/core';
import { TeacherData } from '../../interface/interface'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.html',
  styleUrls: ['./table.css']
})
export class Table {
  // 1. Using Signal Inputs (Read-only)
  data = input<TeacherData[]>([]);

  // 2. Using modern Output API
  edit = output<TeacherData>();
  remove = output<string>();
}