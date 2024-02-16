import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { ApiService } from '../services/api.service';

@Injectable({
  providedIn: 'root',
})
export class LeaderboardResolver implements Resolve<any> {
  constructor(private apiService: ApiService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.apiService.retrieveScoreFromDB();
  }
}
