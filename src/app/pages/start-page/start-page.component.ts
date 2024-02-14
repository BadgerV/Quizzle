import { Component } from '@angular/core';
import { LogicService } from '../services/logic.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start-page',
  standalone: true,
  imports: [],
  templateUrl: './start-page.component.html',
  styleUrl: './start-page.component.css',
})
export class StartPageComponent {
  constructor(private logicService: LogicService, private router: Router) {}

  goOnToNextScreen() {
    this.router.navigate(['/select-difficulty']);
  }
}
