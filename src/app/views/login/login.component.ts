import { Component, ViewChild, HostListener, Output, ElementRef, Directive, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup | any;
  passwordEyes: { signIn: boolean, signUp: boolean } = { signIn: true, signUp: true }

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {

  }

  buildForm() {
    this.loginForm = this.formBuilder.group({
      email: [''],
      senha: ['']
    });
  }

  login() {
    const email = this.loginForm.controls.email.value;
    const senha = this.loginForm.controls.senha.value;
  }

  changePasswordEye(eye: string) {
    eye == 'signIn' ? this.passwordEyes.signIn = !this.passwordEyes.signIn : this.passwordEyes.signUp = !this.passwordEyes.signUp
  }
}
