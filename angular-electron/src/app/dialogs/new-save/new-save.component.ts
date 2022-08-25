import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SaveFileService } from '../../core/services/save-file/save-file.service';

@Component({
  selector: 'new-save-dialog',
  templateUrl: './new-save.component.html',
  styleUrls: ['./new-save.component.scss'],
})
export class NewSaveDialogComponent implements OnInit {
  form = new FormGroup({
    car: new FormControl(null, Validators.required),
    filePath: new FormControl(null, Validators.required),
  });

  constructor(
    public dialogRef: MatDialogRef<NewSaveDialogComponent>,
    private saveFileService: SaveFileService
  ) {}

  ngOnInit(): void {}

  async chooseFile() {
    const filePath = await this.saveFileService.chooseNewFile();

    if (!(filePath === undefined)) {
      this.form.controls.filePath.setValue(filePath);
    }
  }

  save() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
