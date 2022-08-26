import { Component, Input, OnInit } from '@angular/core';
import { PersonalBest } from '../../app.component';
import { Run, RunType } from '../../models/tracking-file.model';

@Component({
  selector: 'app-run',
  templateUrl: './run.component.html',
  styleUrls: ['./run.component.scss'],
})
export class RunComponent implements OnInit {
  @Input() run: Run;

  @Input() pbRT: PersonalBest;
  @Input() pb60: PersonalBest;
  @Input() pbFS: PersonalBest;
  @Input() pb330: PersonalBest;
  @Input() pbBS: PersonalBest;
  @Input() pbEighth: PersonalBest;
  @Input() pbMPH: PersonalBest;
  constructor() {}

  ngOnInit(): void {}

  get runType(): typeof RunType {
    return RunType;
  }
}
