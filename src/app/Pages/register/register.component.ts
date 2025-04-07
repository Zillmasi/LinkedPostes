import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../Core/Services/Auth/auth.service';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Iregister } from '../../Core/Interfaces/iregister';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit , OnDestroy {
  private readonly authService = inject(AuthService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);

  registerForm!: FormGroup;
  subData :Subscription = new Subscription()

  ngOnInit(): void {
    this.Form();
  }
  Form() {
    this.registerForm = this.formBuilder.group(
      {
        name: [
          null,
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(20),
          ],
        ],
        email: [null, [Validators.required, Validators.email]],
        password: [
          null,
          [
            Validators.required,
            Validators.pattern(
              /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
            ),
          ],
        ],
        rePassword: [null, [Validators.required]],
        dateOfBirth: [null, [Validators.required]],
        gender: [null, [Validators.required]],
      },
      { validators: this.ConfirmPass }
    );
  }
  ConfirmPass(group: AbstractControl) {
    const pass = group.get('password')?.value;
    const RePass = group.get('rePassword')?.value;

    pass === RePass ? null : { misMatch: true };
  }

  PostData(): void {
    if (this.registerForm.valid) {
   this.subData =    this.authService.PostRegister(this.registerForm.value).subscribe({
        next: (res) => {
          console.log(res);
          setTimeout(() => {
            this.router.navigate(['login']);
          }, 1000);
        },
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
  ngOnDestroy(): void {
this.subData.unsubscribe()
    
  }
}
