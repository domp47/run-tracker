import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SaveFileService } from './core/services/save-file/save-file.service';
import { UserDataService } from './core/services/user-data/user-data.service';
import { AddMaintenanceDialogComponent } from './dialogs/add-maintenance/add-maintenance.component';
import { AddRunDialogComponent } from './dialogs/add-run/add-run.component';
import { NewSaveDialogComponent } from './dialogs/new-save/new-save.component';
import {
  TimeSlipTrackingFile,
  Run,
  MaintenanceItem,
} from './models/tracking-file.model';
import { UserData } from './models/user-data.model';

export enum RowType {
  MAINTENANCE,
  RUN,
}

export interface TableRow {
  type: RowType;
  item: MaintenanceItem | Run;
}

export interface PersonalBest {
  runId: number;
  value: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild('tableItems') private tableItemsDiv: ElementRef;

  private userData: UserData;
  private timeTracking: TimeSlipTrackingFile;

  tableData: TableRow[];
  bestRT: PersonalBest = AppComponent.setDefaultPb(Number.POSITIVE_INFINITY);
  best60: PersonalBest = AppComponent.setDefaultPb(Number.POSITIVE_INFINITY);
  bestFS: PersonalBest = AppComponent.setDefaultPb(Number.POSITIVE_INFINITY);
  best330: PersonalBest = AppComponent.setDefaultPb(Number.POSITIVE_INFINITY);
  bestBS: PersonalBest = AppComponent.setDefaultPb(Number.POSITIVE_INFINITY);
  bestEighth: PersonalBest = AppComponent.setDefaultPb(
    Number.POSITIVE_INFINITY
  );
  BestMPH: PersonalBest = AppComponent.setDefaultPb(Number.NEGATIVE_INFINITY);

  constructor(
    private userDataService: UserDataService,
    private saveFileService: SaveFileService,
    private renderer: Renderer2,
    public dialog: MatDialog
  ) {}

  async ngOnInit() {
    this.userData = await this.userDataService.getUserData();
    this.setTheme(this.userData.darkMode);

    if (!(this.userData.lastFile === undefined)) {
      this.timeTracking = (
        await this.saveFileService.loadSave(this.userData.lastFile)
      ).data;
      this.calculateTable();
    }
  }

  get fileTitle() {
    return this.timeTracking?.car;
  }

  static setDefaultPb(defaultValue: number): PersonalBest {
    return {
      runId: null,
      value: defaultValue,
    };
  }

  scrollToBottom(): void {
    try {
      this.tableItemsDiv.nativeElement.scrollTop =
        this.tableItemsDiv.nativeElement.scrollHeight;
    } catch (err) {}
  }

  public get rowType(): typeof RowType {
    return RowType;
  }

  /**
   * Set's the webpages theme.
   * @param darkMode Whether to set to dark mode, if not passed it will toggle the current theme.
   */
  setTheme(darkMode: boolean | undefined = undefined) {
    if (darkMode == undefined) {
      darkMode = !this.userData.darkMode;
      this.userData.darkMode = darkMode;
      this.userDataService.setUserData(this.userData);
    }

    if (darkMode) {
      this.renderer.addClass(document.body, 'theme-alternate');
    } else {
      this.renderer.removeClass(document.body, 'theme-alternate');
    }
  }

  createNewSave() {
    const dialogRef = this.dialog.open(NewSaveDialogComponent, {
      minWidth: '50vw',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!(result === undefined)) {
        this.userData.lastFile = result.filePath;
        this.userDataService.setUserData(this.userData);

        this.timeTracking = {
          car: result.car,
          idCounter: 0,
          maintenance: [],
          runs: [],
        };
        this.saveFileService.save({
          filePath: this.userData.lastFile,
          data: this.timeTracking,
        });
      }
    });
  }

  openNewMaintenance() {
    const dialogRef = this.dialog.open(AddMaintenanceDialogComponent, {
      minWidth: '50vw',
    });

    dialogRef.afterClosed().subscribe(async (result: MaintenanceItem) => {
      if (!(result === undefined)) {
        this.timeTracking.maintenance.push(result);

        await this.saveFileService.save({
          filePath: this.userData.lastFile,
          data: this.timeTracking,
        });

        this.calculateTable();
      }
    });
  }

  openNewRun() {
    const dialogRef = this.dialog.open(AddRunDialogComponent, {
      minWidth: '50vw',
    });

    dialogRef.afterClosed().subscribe(async (result: Run) => {
      if (!(result === undefined)) {
        result.id = ++this.timeTracking.idCounter;
        this.timeTracking.runs.push(result);

        await this.saveFileService.save({
          filePath: this.userData.lastFile,
          data: this.timeTracking,
        });

        this.calculateTable();
      }
    });
  }

  async openSave() {
    const save = await this.saveFileService.loadSave();

    // If either save doesn't exist or no file selected.
    if (save == undefined) {
      return;
    }

    this.userData.lastFile = save.filePath;
    this.userDataService.setUserData(this.userData);

    this.timeTracking = save.data;
    this.calculateTable();
  }

  calculateTable() {
    const maintenance = structuredClone(this.timeTracking?.maintenance ?? []);
    maintenance.sort((a: MaintenanceItem, b: MaintenanceItem) => {
      if (a.date < b.date) {
        return -1;
      }

      if (a.date > b.date) {
        return 1;
      }

      return 0;
    });

    const runs = structuredClone(this.timeTracking?.runs ?? []);
    runs.sort((a: Run, b: Run) => {
      if (a.date < b.date) {
        return -1;
      }
      if (a.date > b.date) {
        return 1;
      }

      if (a.id < b.id) {
        return -1;
      }
      if (a.id > b.id) {
        return 1;
      }

      return 0;
    });

    this.tableData = [];
    let runCounter = 1;
    while (runs.length > 0 || maintenance.length > 0) {
      if (
        runs.length == 0 ||
        (maintenance.length > 0 && maintenance[0].date < runs[0].date)
      ) {
        const maintenanceItem = maintenance.shift();

        if (maintenanceItem.resetRunCount) {
          runCounter = 1;
        }

        this.tableData.push({
          type: RowType.MAINTENANCE,
          item: maintenanceItem,
        });
      } else {
        const run = runs.shift();
        run['runCount'] = runCounter;
        runCounter++;

        this.tableData.push({
          type: RowType.RUN,
          item: run,
        });

        if (run.result.reactionTime < this.bestRT.value) {
          this.bestRT = {
            runId: run.id,
            value: run.result.reactionTime,
          };
        }

        if (run.result.sixtyFoot < this.best60.value) {
          this.best60 = {
            runId: run.id,
            value: run.result.sixtyFoot,
          };
        }

        if (
          run.result.threeThirtyFoot - run.result.sixtyFoot <
          this.bestFS.value
        ) {
          this.bestFS = {
            runId: run.id,
            value: run.result.threeThirtyFoot - run.result.sixtyFoot,
          };
        }

        if (run.result.threeThirtyFoot < this.best330.value) {
          this.best330 = {
            runId: run.id,
            value: run.result.threeThirtyFoot,
          };
        }

        if (
          run.result.eighthMile - run.result.threeThirtyFoot <
          this.bestBS.value
        ) {
          this.bestBS = {
            runId: run.id,
            value: run.result.eighthMile - run.result.threeThirtyFoot,
          };
        }

        if (run.result.eighthMile < this.bestEighth.value) {
          this.bestEighth = {
            runId: run.id,
            value: run.result.eighthMile,
          };
        }

        if (run.result.mph > this.BestMPH.value) {
          this.BestMPH = {
            runId: run.id,
            value: run.result.mph,
          };
        }
      }
    }

    this.scrollToBottom();
  }
}
