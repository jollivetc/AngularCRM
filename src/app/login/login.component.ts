import {Component} from '@angular/core';
import {AbstractControl, UntypedFormControl, UntypedFormGroup, ValidationErrors, Validators} from '@angular/forms';
import {AuthenticationService} from './authentication.service';
import {Router} from '@angular/router';
import {User} from './model/user';

@Component({
  selector: 'crm-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  public loginForm: UntypedFormGroup;

  constructor(private authentService: AuthenticationService, private router: Router) {
    if (this.authentService.isAuthenticated) {
      this.authentService.logout();
    }
    // Login form definition
    this.loginForm = new UntypedFormGroup({
      login: new UntypedFormControl('', [Validators.required, Validators.minLength(3)]),
      password: new UntypedFormControl('', [Validators.required, checkPassword])
    });
  }

  onSubmit(): void {
    this.authentService.authentUser(this.loginForm.value.login,
      this.loginForm.value.password)
      .subscribe((u: User) => {
          this.router.navigateByUrl('/home');
        },
        (error) => {
          alert(error.message);
        },
        () => {
          console.log('complete');
        });
  }
}

function checkPassword(c: AbstractControl): ValidationErrors | null {
  if (c.value.length !== 0 && c.value.length < 5) {
    return {
      length5Error: 'Erreur controle password'
    };
  }
  return null;
}
