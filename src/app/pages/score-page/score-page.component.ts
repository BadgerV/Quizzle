import { Component, OnInit } from '@angular/core';
import { LogicService } from '../services/logic.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, take } from 'rxjs';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-score-page',
  standalone: true,
  imports: [NgIf],
  templateUrl: './score-page.component.html',
  styleUrl: './score-page.component.css',
})
export class ScorePageComponent implements OnInit {
  score!: number | string;

  scoreFromDB! : number;

  navigationExtras = {
    queryParams: {},
  };

  constructor(
    private logicService: LogicService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // if (this.logicService.getLevel() !== 3) {
    //   this.router.navigate(['']);
    // }

    this.scoreFromDB = this.route.snapshot.data['score'];

    if (this.scoreFromDB < 0) {
      this.score = 'Sorry your score was up to zero😂🤣';
    } else {
      this.score = this.scoreFromDB.toFixed(3);
    }
  }

  navigateToHomepage() {
    this.router.navigate([''], this.navigationExtras);
  }

  ngOnDestroy(): void {
    this.logicService.resetScore();

    this.router.navigate(['/leaders'], this.navigationExtras);
  }
}
