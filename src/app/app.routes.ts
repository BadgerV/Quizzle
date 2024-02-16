import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { StartPageComponent } from './pages/start-page/start-page.component';
import { SelectDifficultyPageComponent } from './pages/select-difficulty-page/select-difficulty-page.component';
import { QuestionPageComponent } from './pages/question-page/question-page.component';
import { ScorePageComponent } from './pages/score-page/score-page.component';
import { AuthenticationComponent } from './pages/authentication/authentication.component';
import { ScorePageResolverService } from './pages/score-page/score-page-resolver.service';
import { QuestionResolver } from './pages/question-page/question-page-resolver';
import { AuthGuard } from './pages/authentication/auth-guard';
import { LeaderboardPageComponent } from './pages/leaderboard-page/leaderboard-page.component';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'start',
    component: StartPageComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'select-difficulty',
    component: SelectDifficultyPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'question',
    component: QuestionPageComponent,
    canActivate: [AuthGuard],

    resolve: {
      questions: QuestionResolver,
    },
  },
  {
    path: 'score',
    component: ScorePageComponent,
    canActivate: [AuthGuard],
    resolve: {
      score: ScorePageResolverService,
    },
  },
  {
    path: 'auth',
    component: AuthenticationComponent,
  },
  {
    path: 'leaders',
    component: LeaderboardPageComponent,
  },
];
