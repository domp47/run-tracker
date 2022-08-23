import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSaveDialogComponent } from './new-save.component';

describe('NewSaveComponent', () => {
  let component: NewSaveDialogComponent;
  let fixture: ComponentFixture<NewSaveDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewSaveDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NewSaveDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
