import {
  Component,
  OnInit,
  OnDestroy,
  inject,
  NgZone,
  ChangeDetectorRef,
} from '@angular/core';
import { LogicService } from '../services/logic.service';
import { Subscription } from 'rxjs';

import { AsyncPipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-select-difficulty-page',
  templateUrl: './select-difficulty-page.component.html',
  styleUrls: ['./select-difficulty-page.component.css'],
  imports: [AsyncPipe],
})
export class SelectDifficultyPageComponent implements OnInit, OnDestroy {
  timer = 0;
  timerSubscription!: Subscription;

  constructor(
    private logicService: LogicService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.logicService.resetLevelTimer();
    this.logicService.startDifficultyCountdown();
    this.timer = this.logicService.getDifficultyTimer();
    this.timerSubscription =
      this.logicService.selectLevelTimerChanged.subscribe((number) => {
        if (number === 0) {
          this.setQuestionDuration(5);
        }
        this.timer = number;
        this.cdr.detectChanges();
      });
  }

  setQuestionDuration(duration: number) {
    this.logicService.setQuestionDuration(duration);
    this.logicService.increaseLevel();
    this.router.navigate(['question']);
  }

  ngOnDestroy(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }
}
