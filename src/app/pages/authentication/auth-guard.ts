import { Injectable, inject } from '@angular/core';
import { LogicService } from '../services/logic.service';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

// export class AuthGuard {
//   constructor(private logicService: LogicService) {}

// }

export const AuthGuard = () => {
  let apiService = inject(ApiService);
  let router = inject(Router);

  let user = apiService.getUser();

  if (!!user) {
    return true;
  } else {
    router.navigate(['auth']);
    return;
  }
};
