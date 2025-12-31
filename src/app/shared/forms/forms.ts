import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-forms',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './forms.html',
  styleUrls: ['./forms.css']
})
export class Forms implements OnChanges {
  @Input() editData: any = null;
  @Output() added = new EventEmitter<any >();
  @Output() updated = new EventEmitter<any >();

  forms = new FormGroup({
    id: new FormControl(null), 
    name: new FormControl(null, Validators.required),
    phone: new FormControl(null,Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    address: new FormControl(null,Validators.required),
    gender: new FormControl('male')
  });

  ngOnChanges(changes: SimpleChanges) {
    if (changes['editData']?.currentValue) {
      this.forms.patchValue(this.editData);
      this.forms.get('id')?.disable(); // Disable ID when editing
    } else {
      this.forms.reset({ gender: 'male' });
      this.forms.get('id')?.enable(); // Enable ID when adding
    }
  }

  submit() {
    if (this.forms.valid) {
      const formData = this.forms.getRawValue(); // Get all form values including disabled fields

      if (this.editData) {
        this.updated.emit(formData); // Update existing record
      } else {
        this.added.emit(formData); // Add new record
      }

      this.forms.reset({ gender: 'male' }); // Reset form
    } else {
      this.forms.markAllAsTouched(); // Highlight validation errors
    }
  }
}