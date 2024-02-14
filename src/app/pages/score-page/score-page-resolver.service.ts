import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { LogicService } from '../services/logic.service';

@Injectable({
  providedIn: 'root',
})
export class ScorePageResolverService implements Resolve<number> {
  constructor(private logicService: LogicService) {}

  resolve(): Observable<number> | Promise<number> | number {
    return +this.logicService.getScore();
  }
}
