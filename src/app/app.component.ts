import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { ApiService } from './pages/services/api.service';
import { LeaderboardPageComponent } from './pages/leaderboard-page/leaderboard-page.component';
import { LogicService } from './pages/services/logic.service';
import { ResponsiveService } from './pages/services/responsive.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, LeaderboardPageComponent, NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  constructor(
    private apiService: ApiService,
    private logicService: LogicService,
    private responsiveService: ResponsiveService
  ) {}

  isSidebarOpen: boolean = false;

  questions!: any;

  ngOnInit(): void {
    this.apiService.retrieveScoreFromDB();
    this.logicService.resetScore();

    this.responsiveService.isSidebarOpenSubject.subscribe(
      (isSidebarOpen: boolean) => {
        this.isSidebarOpen = isSidebarOpen;
      }
    );
  }
}
