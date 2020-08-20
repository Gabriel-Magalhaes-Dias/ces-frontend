import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DrawerService {

  public drawer: any;

  constructor() {}

  toggleDrawer() {
    this.drawer.toggle();
  }

  getData(isOpened: boolean): any {
    return {
      drawer: this.drawer,
      isOpened
    };
  }

}
