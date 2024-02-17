import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResponsiveService {
  isSidebarOpen: boolean = false;
  isSidebarOpenSubject: Subject<boolean> = new Subject();
  constructor() {}

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    this.isSidebarOpenSubject.next(this.isSidebarOpen);
  }
}
