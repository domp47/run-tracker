import { Injectable } from '@angular/core';
import { DEFAULT_USER_DATA, UserData } from '../../../models/user-data.model';
import { ipcRenderer } from 'electron';
import { ElectronService } from '../electron/electron.service';

@Injectable({
  providedIn: 'root',
})
export class FilesService {
  ipcRenderer: typeof ipcRenderer;

  constructor(electronService: ElectronService) {
    if (electronService.isElectron) {
      this.ipcRenderer = window.require('electron').ipcRenderer;
    }
  }

  async getUserData(): Promise<UserData> {
    const dataStr: string = await this.ipcRenderer.invoke('read-user-data');

    if (dataStr == undefined) {
      return DEFAULT_USER_DATA;
    }

    return JSON.parse(dataStr);
  }

  async setUserData(data: UserData) {
    await this.ipcRenderer.invoke('set-user-data', JSON.stringify(data));
  }
}
