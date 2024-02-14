import { Resolve } from '@angular/router';
import { Question } from '../services/question-model';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { LogicService } from '../services/logic.service';

@Injectable({
  providedIn: 'root',
})

export class QuestionResolver implements Resolve<Question[]> {
  constructor(private logicService: LogicService) {}
  resolve(): Observable<Question[]> | Promise<Question[]> | Question[] {
    return this.logicService.getRandomQuestions();
  }
}
