import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';
import { RunType, Run, Outcome } from '../../models/tracking-file.model';

export const DATE_FORMAT = {
  parse: {
    dateInput: ['YYYY-MM-DD'],
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-add-run',
  templateUrl: './add-run.component.html',
  styleUrls: ['./add-run.component.scss'],
  providers: [{ provide: MAT_DATE_FORMATS, useValue: DATE_FORMAT }],
})
export class AddRunDialogComponent implements OnInit {
  form = new FormGroup({
    date: new FormControl(null, [Validators.required]),
    runType: new FormControl(null, [Validators.required, this.validateType]),
    round: new FormControl(null, [this.validateRound.bind(this)]),
    opponent: new FormControl(null),
    outcome: new FormControl(null),
    raceTrack: new FormControl(null),
    notes: new FormControl(null),
    reactionTime: new FormControl(null, [Validators.required]),
    sixtyTime: new FormControl(null, [Validators.required]),
    threeThirtyTime: new FormControl(null, [Validators.required]),
    eighthTime: new FormControl(null, [Validators.required]),
    mph: new FormControl(null, [Validators.required]),
  });

  runTypes = Object.entries(RunType);
  outcomes = Object.entries(Outcome);
  rounds = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  constructor(public dialogRef: MatDialogRef<AddRunDialogComponent>) {}

  ngOnInit(): void {}

  isCompetition() {
    return (
      this.form.value.runType == RunType.ELIMINATIONS ||
      this.form.value.runType == RunType.QUALIFYING
    );
  }

  isElims() {
    return this.form.value.runType == RunType.ELIMINATIONS;
  }

  validateType(control: AbstractControl) {
    if (!Object.values(RunType).includes(control.value)) {
      return { typeInvalid: true };
    }

    return {};
  }

  validateRound(control: AbstractControl) {
    if (this.form?.value.runType === undefined) {
      return {};
    }

    if (
      this.form.value.runType === RunType.QUALIFYING ||
      this.form.value.runType === RunType.ELIMINATIONS
    ) {
      if (!Number.isFinite(control.value) || +control.value < 1) {
        return { roundInvalid: true };
      }
    }

    return {};
  }

  save() {
    if (this.form.valid) {
      const run: Run = {
        id: null,
        date: new Date(this.form.value.date),
        type: this.form.value.runType,
        round: this.form.value.round,
        opponent: this.form.value.opponent,
        raceTrack: this.form.value.raceTrack,
        outcome: this.form.value.outcome,
        notes: this.form.value.notes,
        result: {
          reactionTime: this.form.value.sixtyTime,
          sixtyFoot: this.form.value.sixtyTime,
          threeThirtyFoot: this.form.value.threeThirtyTime,
          eighthMile: this.form.value.eighthTime,
          mph: this.form.value.mph,
        },
      };
      this.dialogRef.close(run);
    } else {
      this.form.markAllAsTouched();
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
