import { Injectable } from '@angular/core';
import { UserData } from '../../../models/user-data.model';
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

  async getUserData(): Promise<UserData | undefined> {
    return await this.ipcRenderer.invoke('read-user-data');
  }

  async setUserData(data: UserData) {
    await this.ipcRenderer.invoke('set-user-data', data);
  }
}
