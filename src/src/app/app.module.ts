import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
// import { MatListModule } from '@angular/material/list';
// import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
// import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
// import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
// import { MatSortModule } from '@angular/material/sort';
// import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
// import { MatGridListModule } from '@angular/material/grid-list';
// import { MatTabsModule } from '@angular/material/tabs';
// import { MatChipsModule } from '@angular/material/chips';
// import { MatRadioModule } from '@angular/material/radio';
// import { MatButtonToggleModule } from '@angular/material/button-toggle';
// import { MatProgressBarModule } from '@angular/material/progress-bar';
// import { MatMenuModule } from '@angular/material/menu';
// import { MatExpansionModule } from '@angular/material/expansion';
// import { MatSnackBarModule } from '@angular/material/snack-bar';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';

import { AppComponent } from './app.component';
import { NewSaveDialogComponent } from './dialogs/new-save/new-save.component';
import { RunComponent } from './display-item/run/run.component';
import { MaintenanceComponent } from './display-item/maintenance/maintenance.component';
import { AddRunDialogComponent } from './dialogs/add-run/add-run.component';
import { AddMaintenanceDialogComponent } from './dialogs/add-maintenance/add-maintenance.component';

@NgModule({
  declarations: [
    AppComponent,
    NewSaveDialogComponent,
    RunComponent,
    MaintenanceComponent,
    AddRunDialogComponent,
    AddMaintenanceDialogComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CoreModule,

    // Angular Material Components
    MatToolbarModule,
    MatDividerModule,
    MatDialogModule,
    // MatFormFieldModule,
    // MatSidenavModule,
    // MatListModule,
    MatButtonModule,
    MatIconModule,
    // MatTableModule,
    MatTooltipModule,
    // MatSortModule,
    // MatPaginatorModule,
    MatSelectModule,
    MatInputModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    // MatGridListModule,
    // MatTabsModule,
    // MatChipsModule,
    // MatRadioModule,
    // MatButtonToggleModule,
    // MatProgressBarModule,
    // MatMenuModule,
    // MatExpansionModule,
    // MatSnackBarModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
