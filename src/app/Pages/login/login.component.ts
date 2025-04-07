import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../Core/Services/Auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit , OnDestroy{
  private readonly formBuilder = inject(FormBuilder);
  private readonly authService = inject(AuthService);

  loginForm!: FormGroup;
  subData: Subscription = new Subscription();

  ngOnInit(): void {
    this.Form();
  }

  Form() {
    this.loginForm = this.formBuilder.group({
      email: [null, Validators.email],
      password: [
        null,
        Validators.pattern(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
        ),
      ],
    });
  }

  postLogin() {
    this.subData = this.authService.PostLogin(this.loginForm.value).subscribe({
      next: (res) => {
        console.log(res);
      },
    });
  }
  ngOnDestroy(): void {
    this.subData.unsubscribe();
  }
}
