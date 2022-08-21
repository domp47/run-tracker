import { Component, OnInit, Renderer2 } from '@angular/core';
import { UserDataService } from './core/services/user-data/user-data.service';
import { UserData } from './models/user-data.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private userData: UserData;

  constructor(
    private userDataService: UserDataService,
    private renderer: Renderer2
  ) {}

  async ngOnInit() {
    this.userData = await this.userDataService.getUserData();
    this.setTheme(this.userData.darkMode);
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
}
