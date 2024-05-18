import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm!: FormGroup;
  passwordEyes: { signIn: boolean, signUp: boolean } = { signIn: true, signUp: true }

  errStatus: boolean = false;
  formStatus: boolean = false;

  typeAlert: string = "danger";

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['']
    });
  }

  authUser() {
    console.log(this.loginForm);
    if (this.loginForm.valid) {
      this.loginService.authenticateUser(this.loginForm.value).subscribe((res: any) => { }, (err: any) => {
        if (err.status == 200) {
          this.router.navigate(['homepage']);
        } else if (err.status == 401) {
          this.errStatus = true;
          this.typeAlert = "danger";
          this.loginForm.get('password')?.setValue('');

          setTimeout(() => {
            this.errStatus = false;
          }, 3000);
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
      this.formStatus = true;

      setTimeout(() => {
        this.formStatus = false;
      }, 3000);
    }
  }

  applyErrors(campo: string) {
    return {
      'is-invalid': this.verifyValidAndTouched(campo)
    }
  }

  verifyValidAndTouched(campo: string) {
    return !this.loginForm.get(campo)?.valid && this.loginForm.get(campo)?.touched;
  }

  changePasswordEye(eye: string) {
    eye == 'signIn' ? this.passwordEyes.signIn = !this.passwordEyes.signIn : this.passwordEyes.signUp = !this.passwordEyes.signUp
  }
}
