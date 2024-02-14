import { Component, OnInit } from '@angular/core';
import { LogicService } from '../services/logic.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, take } from 'rxjs';

@Component({
  selector: 'app-score-page',
  standalone: true,
  imports: [],
  templateUrl: './score-page.component.html',
  styleUrl: './score-page.component.css',
})
export class ScorePageComponent implements OnInit {
  score!: number;

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

    this.score = this.route.snapshot.data['score'];
  }

  navigateToHomepage() {
    this.router.navigate([''], this.navigationExtras);
  }

  ngOnDestroy(): void {
    this.logicService.resetScore();
    console.log('score page destoryed');
    this.router.navigate([''], this.navigationExtras);
  }
}
