import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { ApiService } from './pages/services/api.service';
import { LeaderboardPageComponent } from './pages/leaderboard-page/leaderboard-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, LeaderboardPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  constructor(private apiService: ApiService) {}

  questions!: any;

  ngOnInit(): void {
    console.log('working');
    this.apiService.retrieveScoreFromDB();

    // this.apiService.storeScoreInDB('Badger', '1400');
  }
}
