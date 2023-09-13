import {Component} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, UntypedFormGroup, ValidationErrors, Validators} from '@angular/forms';
import {AuthenticationService} from './authentication.service';
import {Router} from '@angular/router';
import {User} from './model/user';

@Component({
  selector: 'crm-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  public loginForm= new FormGroup({
    login: new FormControl('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('', [Validators.required, checkPassword])
  });

  constructor(private authentService: AuthenticationService, private router: Router) {
    if (this.authentService.isAuthenticated) {
      this.authentService.logout();
    }
  }

  onSubmit(): void {
    this.loginForm.get('login')
    this.authentService.authentUser(this.loginForm.getRawValue().login!,
      this.loginForm.getRawValue().password!)
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
