import { Component, EventEmitter, Input, input, Output, output } from '@angular/core';
import { TeacherData } from '../../interface/interface'; 
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.html',
  styleUrls: ['./table.css']
})
export class Table {
  // 1. Using Signal Inputs (Read-only)
 @Input() data: Observable<any[]> | null = null; 
  
  @Output() edit = new EventEmitter<any>();
  @Output() remove = new EventEmitter<string>();
}