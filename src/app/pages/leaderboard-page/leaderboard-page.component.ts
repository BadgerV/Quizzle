import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-leaderboard-page',
  standalone: true,
  imports: [NgFor],
  templateUrl: './leaderboard-page.component.html',
  styleUrl: './leaderboard-page.component.css',
})
export class LeaderboardPageComponent implements OnInit {
  scoresFromDb: any = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.scoresFromDb = this.route.snapshot.data['data'];

    this.scoresFromDb = Object.values(this.scoresFromDb);

    const uniqueObjects = Array.from(
      new Set(this.scoresFromDb.map((obj: any) => JSON.stringify(obj)))
    ).map((str: any) => JSON.parse(str));

    // Sort the array in descending order based on the score property
    uniqueObjects.sort((a, b) => b.score - a.score);

    // Pick the top 20 elements
    const top20 = uniqueObjects.slice(0, 20);

    this.scoresFromDb = top20;
    console.log(this.scoresFromDb);
  }
}

// .subscribe((result) => {
//         this.arrayOfScores = Object.values(result);

//         // Remove duplicates
//         const uniqueObjects = Array.from(
//           new Set(this.arrayOfScores.map((obj) => JSON.stringify(obj)))
//         ).map((str) => JSON.parse(str));

//         // Sort the array in descending order based on the score property
//         uniqueObjects.sort((a, b) => b.score - a.score);

//         // Pick the top 20 elements
//         const top20 = uniqueObjects.slice(0, 20);
//       });
