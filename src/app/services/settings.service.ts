import { Injectable } from '@angular/core';
import { Settings } from '../models/Settings';

@Injectable()
export class SettingsService {

  settings: Settings = {
    allowRegistration: true,
    disableBalanceOnAdd: false,
    disableBalanceOnEdit: false
  }

  constructor() { }

  getSettings() {
    return this.settings;
  }

}
