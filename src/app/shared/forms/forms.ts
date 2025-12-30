import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-forms',
   standalone: true,   // ✅ REQUIRED
  imports: [ReactiveFormsModule],
  templateUrl: './forms.html',
  styleUrl:'./forms.css'
})
export class Forms implements OnChanges {
  @Input() editData: any = null;
  @Output() added = new EventEmitter<any>();
  @Output() updated = new EventEmitter<any>();

  forms = new FormGroup({
    // 1. Added Validators.required so ID cannot be empty
    id: new FormControl(null, Validators.required), 
    name: new FormControl('', Validators.required),
    phone: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    address: new FormControl(''),
    gender: new FormControl('male')
  });

  ngOnChanges(changes: SimpleChanges) {
    if (changes['editData']?.currentValue) {
      this.forms.patchValue(this.editData);
      // Optional: Disable ID field during edit so user can't change the primary key
      this.forms.get('id')?.disable(); 
    } else {
      this.forms.reset({ gender: 'male' });
      this.forms.get('id')?.enable(); 
    }
  }

  submit() {
    if (this.forms.valid) {
      // 2. getRawValue() is essential here to capture the ID if it is disabled
      const formData = this.forms.getRawValue(); 

      // 3. Logic check: If editData exists, we are updating. Otherwise, adding.
      if (this.editData) {
        this.updated.emit(formData);
      } else {
        this.added.emit(formData);
      }
      
      this.forms.reset({ gender: 'male' });
    } else {
      this.forms.markAllAsTouched();
    }
  }
}