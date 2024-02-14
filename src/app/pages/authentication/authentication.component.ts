import { CommonModule } from '@angular/common';
import { Component, OnInit, DoCheck, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from '../services/api.service';
import { FormGroup, FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-authentication',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.css',
})
export class AuthenticationComponent implements OnInit {
  signUp: boolean = false;
  errorMessage: string = '';
  isLoading: boolean = false;

  @ViewChild('f') myForm!: NgForm;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.errorMessage = '';
    this.route.queryParams.subscribe((params) => {
      if (params['data'] === 'true') {
        this.signUp = true;
      } else {
        this.signUp = false;
      }
    });
  }

  toggleSignup() {
    this.signUp = !this.signUp;
  }

  register(f: NgForm) {
    this.isLoading = true;
    let form = f.form.value;
    this.apiService.signup(form.email, form.password).subscribe(
      (result) => {
        if (result.email) {
          console.log(result);
          this.apiService.setUser(result.email);
          this.router.navigate(['']);
        }
      },
      (error) => {
        this.errorMessage = 'Something went wrong. Please try again';
      }
    );
    this.isLoading = false;
    f.reset();
  }

  login(f: NgForm) {
    this.isLoading = true;
    let form = f.form.value;
    console.log(form);

    this.apiService.login(form.email, form.password).subscribe((result) => {
      console.log(result);
    });
    this.isLoading = false;
    f.reset();
  }
}
