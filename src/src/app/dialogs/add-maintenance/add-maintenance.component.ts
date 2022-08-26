import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MaintenanceItem } from '../../models/tracking-file.model';

@Component({
  selector: 'app-add-maintenance',
  templateUrl: './add-maintenance.component.html',
  styleUrls: ['./add-maintenance.component.scss'],
})
export class AddMaintenanceDialogComponent implements OnInit {
  form = new FormGroup({
    date: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [Validators.required]),
    resetCounter: new FormControl(false, [Validators.required]),
  });

  constructor(public dialogRef: MatDialogRef<AddMaintenanceDialogComponent>) {}

  ngOnInit(): void {}

  save() {
    if (this.form.valid) {
      const maintenance: MaintenanceItem = {
        date: new Date(this.form.value.date),
        description: this.form.value.description,
        resetRunCount: this.form.value.resetCounter,
      };
      this.dialogRef.close(maintenance);
    } else {
      this.form.markAllAsTouched();
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
