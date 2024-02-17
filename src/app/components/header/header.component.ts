import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ApiService, User } from '../../pages/services/api.service';
import { NgIf } from '@angular/common';
import { ResponsiveService } from '../../pages/services/responsive.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  shouldDisplayAuthButtons: boolean = true;
  user!: User;
  isSidebarOpen: boolean = false;

  constructor(
    private router: Router,
    private apiService: ApiService,
    private responsiveService: ResponsiveService
  ) {}
  navigateToAuth(isTrue: boolean): void {
    this.router.navigate(['/auth'], { queryParams: { data: isTrue } });
  }

  ngOnInit(): void {
    this.apiService.userSubject.subscribe((user) => {
      if (user.displayName !== '' && user.email !== '') {
        this.shouldDisplayAuthButtons = false;
        this.user = user;
      } else this.shouldDisplayAuthButtons = true;
    });

    this.responsiveService.isSidebarOpenSubject.subscribe(
      (isSidebarOpen: boolean) => {
        this.isSidebarOpen = isSidebarOpen;
        console.log(isSidebarOpen);
      }
    );
  }

  toggleSidebar() {
    this.responsiveService.toggleSidebar();
  }
}
