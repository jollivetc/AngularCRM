import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public loginForm: FormGroup;

  constructor(private authenticationService: AuthenticationService, private router: Router) {
    if (this.authenticationService.authenticated) {
      this.authenticationService.disconnect();
      console.log('disconnect');
    }
    this.loginForm = new FormGroup({
      login: new FormControl('', [Validators.required, Validators.minLength(3)]),
      password: new FormControl('', [Validators.required, checkPassword])
    });
  }

  onClicked($event): void {
    console.log('submit', this.loginForm.value);
    this.authenticationService.authentUser(this.loginForm.value.login, this.loginForm.value.password)
        .subscribe(
            (user) => {this.router.navigateByUrl('home'); },
            (err) => {console.log(err); }
          );
  }
}

function checkPassword(c: AbstractControl): ValidationErrors | null {
  if (c.value.length < 5) {
    return {
      checkPassword: 'Erreur controle Password'
    };
  }
  return null;

}
