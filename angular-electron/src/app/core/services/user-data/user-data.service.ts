import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserData, DEFAULT_USER_DATA } from '../../../models/user-data.model';
import { ElectronService } from '../electron/electron.service';
import { FilesService } from '../files/files.service';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  private _userData: UserData = undefined;

  constructor(
    private electronService: ElectronService,
    private filesService: FilesService
  ) {}

  async getUserData() {
    if (this._userData == undefined) {
      let userDataPromise: Promise<UserData> = undefined;

      if (this.electronService.isElectron) {
        userDataPromise = this.filesService.getUserData();
      } else {
        userDataPromise = Promise.resolve(DEFAULT_USER_DATA);
      }

      return await userDataPromise;
    }

    return this._userData;
  }

  setUserData(value: UserData) {
    this._userData = value;

    if (this.electronService.isElectron) {
      this.filesService.setUserData(value);
    }
  }
}
