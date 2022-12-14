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

  async chooseOpenFile(title: string): Promise<string> {
    return await this.ipcRenderer.invoke('choose-open-file', title);
  }

  async chooseSaveFile(title: string): Promise<string> {
    return await this.ipcRenderer.invoke('choose-save-file', title);
  }

  async readFile(filePath: string): Promise<string> {
    return await this.ipcRenderer.invoke('read-file', filePath);
  }

  async writeFile(filePath: string, data: string) {
    await this.ipcRenderer.invoke('save-file', filePath, data);
  }
}
