import { Injectable } from '@angular/core';
import {
  RunType,
  TimeSlipTrackingFile,
} from '../../../models/tracking-file.model';
import { ElectronService } from '../electron/electron.service';
import { FilesService } from '../files/files.service';

export interface SaveFile {
  filePath: string;
  data: TimeSlipTrackingFile;
}

@Injectable({
  providedIn: 'root',
})
export class SaveFileService {
  constructor(
    private electronService: ElectronService,
    private filesService: FilesService
  ) {}

  /**
   * Let the user choose a new save file name and path.
   */
  async chooseNewFile(): Promise<string> {
    let filePath: string;

    if (this.electronService.isElectron) {
      filePath = await this.filesService.chooseSaveFile(
        'Create New Time Slip Tracking File'
      );

      if (!filePath.endsWith('.tst')) {
        filePath = filePath + '.tst';
      }
    } else {
      filePath = '/tmp/tst.tst';
    }

    return filePath;
  }

  async loadSave(
    filePath: string | undefined = undefined
  ): Promise<SaveFile | undefined> {
    let saveFilePath: string;
    let saveData: TimeSlipTrackingFile;
    if (this.electronService.isElectron) {
      if (filePath === undefined) {
        filePath = await this.filesService.chooseOpenFile(
          'Open a Time Slip Tracking File'
        );
      }

      const saveDataStr = await this.filesService.readFile(filePath);

      if (saveDataStr === undefined) {
        return undefined;
      }

      saveData = JSON.parse(saveDataStr);
      saveFilePath = filePath;
    } else {
      saveData = {
        car: 'Firebird',
        idCounter: 1,
        maintenance: [
          {
            description: 'New Motor',
            date: new Date(2022, 1, 1),
            resetRunCount: true,
          },
        ],
        runs: [
          {
            id: 1,
            date: new Date(2022, 5, 28),
            type: RunType.TEST,
            round: null,
            opponent: null,
            outcome: null,
            notes: 'Added 1 degree all the way',
            raceTrack: 'TMP',
            result: {
              reactionTime: 0.053,
              sixtyFoot: 1.208,
              threeThirtyFoot: 3.11,
              eighthMile: 4.686,
              mph: 155.79,
            },
          },
        ],
      };

      saveFilePath = '/tmp/tst.tst';
    }

    return {
      filePath: saveFilePath,
      data: saveData,
    };
  }

  async save(saveFile: SaveFile) {
    if (this.electronService.isElectron) {
      await this.filesService.writeFile(
        saveFile.filePath,
        JSON.stringify(saveFile.data)
      );
    }
  }
}
