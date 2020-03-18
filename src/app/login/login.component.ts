import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';
import { User } from './model/user';

@Component({
  selector: 'crm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;

  constructor(private authentService: AuthenticationService, private router: Router) {
    if (this.authentService.authenticated){
      this.authentService.disconnect();
    }
    // Login form definition
    this.loginForm = new FormGroup({
      login: new FormControl('', [Validators.required, Validators.minLength(3)]),
      password: new FormControl('', [Validators.required, checkPassword])
    });
  }

  ngOnInit() {
  }

  onSubmit(): void {
    this.authentService.authentUser(this.loginForm.value.login,
      this.loginForm.value.password)
          .subscribe((u: User) => {this.router.navigateByUrl('/home'); },
                      (error) => {alert(error.message); },
                      () => {console.log('complete'); });
  }
}
function checkPassword(c: AbstractControl): ValidationErrors | null {
  if (c.value.length !== 0 && c.value.length < 5) {
    return {
      checkPassword: 'Erreur controle password'
    };
  }
  return null;
}
