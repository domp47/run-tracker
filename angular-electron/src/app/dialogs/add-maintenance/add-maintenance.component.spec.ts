import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMaintenanceDialogComponent } from './add-maintenance.component';

describe('AddMaintenanceDialogComponent', () => {
  let component: AddMaintenanceDialogComponent;
  let fixture: ComponentFixture<AddMaintenanceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddMaintenanceDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddMaintenanceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
