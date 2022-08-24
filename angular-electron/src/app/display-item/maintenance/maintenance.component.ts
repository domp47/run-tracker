import { Component, Input, OnInit } from '@angular/core';
import { MaintenanceItem } from '../../models/tracking-file.model';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.scss'],
})
export class MaintenanceComponent implements OnInit {
  @Input() maintenance: MaintenanceItem;

  constructor() {}

  ngOnInit(): void {}
}
