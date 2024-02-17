import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  Signal,
  WritableSignal,
  signal,
} from '@angular/core';
import { LogicService } from '../services/logic.service';
import { Question } from '../services/question-model';
import { NgFor } from '@angular/common';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-question-page',
  standalone: true,
  imports: [NgFor],
  templateUrl: './question-page.component.html',
  styleUrl: './question-page.component.css',
})
export class QuestionPageComponent implements OnInit, OnDestroy {
  questions!: Question[];

  questionTimer = signal(0);

  questionTimerSubscription!: Subscription;
  alertChangeQuestionSubscription!: Subscription;

  presentQuestion!: Question;
  presentQuestionNumber: number = 0;

  constructor(
    private route: ActivatedRoute,
    private logicService: LogicService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    //gets the questions from the resolver
    this.questions = this.route.snapshot.data['questions'];

    //sets the first question
    this.presentQuestion = this.questions[this.presentQuestionNumber];

    //subscribe to the question time
    this.questionTimerSubscription =
      this.logicService.questionTimerChanged.subscribe((timer) => {
        this.questionTimer.set(timer);
      });

    //begin the question timer
    this.logicService.countDownAndProceed();

    //subscribe to the alert of changing questions
    this.alertChangeQuestionSubscription =
      this.logicService.alertToChangeQuestion.subscribe((bool) => {
        if (bool) {
          this.nextQuestion();
        }
      });
  }

  nextQuestion() {
    // Increment presentQuestionNumber
    this.presentQuestionNumber++;

    // Check if presentQuestionNumber exceeds the length of questions array
    if (this.presentQuestionNumber >= this.questions.length) {
      this.submitQuestion();
      return;
    }

    // Set presentQuestion to the next question
    this.presentQuestion = this.questions[this.presentQuestionNumber];
    this.presentQuestion.options = this.logicService.shuffleArray(
      this.presentQuestion.options
    );
    this.logicService.resetQuestionCountdown();
  }

  calculateScore(i: number) {
    // Check if presentQuestionNumber exceeds the length of questions array
    if (this.presentQuestionNumber >= this.questions.length) {
      this.submitQuestion();
      return;
    }
    this.logicService.checkForCorrectAnswer(
      this.presentQuestion,
      this.presentQuestion.options[i],
      this.logicService.getQuestionTimer() - this.questionTimer()
    );
  }
  selectOption(i: number) {
    this.calculateScore(i);
    this.logicService.checkForCheaters(i, this.questionTimer());
    this.nextQuestion();
  }

  submitQuestion() {
    this.router.navigate(['/score']);
  }

  ngOnDestroy(): void {
    if (this.questionTimerSubscription) {
      this.questionTimerSubscription.unsubscribe();
    }
    if (this.alertChangeQuestionSubscription) {
      this.alertChangeQuestionSubscription.unsubscribe();
    }
    this.logicService.unsubscribeFromCouter();

    this.logicService.resetScore();
  }
}
