import { Component, Input, OnInit } from '@angular/core';
import { PersonalBest } from '../../app.component';
import { Run } from '../../models/tracking-file.model';

@Component({
  selector: 'app-run',
  templateUrl: './run.component.html',
  styleUrls: ['./run.component.scss'],
})
export class RunComponent implements OnInit {
  @Input() run: Run;

  @Input() pbRT: PersonalBest;
  @Input() pb60: PersonalBest;
  @Input() pb330: PersonalBest;
  @Input() pbBS: PersonalBest;
  @Input() pbEighth: PersonalBest;
  @Input() pbMPH: PersonalBest;
  constructor() {}

  ngOnInit(): void {
    console.log(this.run.id === this.pbRT.runId);
  }
}
