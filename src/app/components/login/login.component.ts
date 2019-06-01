import { Component, OnInit } from '@angular/core';
import { AuthorizeUserService } from '../../services/autorize-user.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { CustomValidators } from '../../form/custom-validators';
import { ValidationErrorMessages } from '../../form/validation-messages';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  formErrors = {
    login: '',
  };

  constructor(public authorizeUserService: AuthorizeUserService, private _router: Router, private _fb: FormBuilder) { }

   ngOnInit() {
        this.loginForm = this._fb.group({
            login: ['', [Validators.required, Validators.minLength(3)] ],
            password: ['', [CustomValidators.passwordStrength]]
        });
    
        this.loginForm.valueChanges.pipe(
            debounceTime(500)
        ).subscribe(() => {
          this.onControlValueChanged();
        });
    
        this.onControlValueChanged();
      }
    
      onControlValueChanged() {
        const form = this.loginForm;
        for (let field in this.formErrors) {
          this.formErrors[field] = '';
          const control = form.get(field);
          if (control && control.dirty && !control.valid) {
              const validationMessages = ValidationErrorMessages[field];
              for (const key in control.errors ) {
                this.formErrors[field] += validationMessages[key] + '';
            }
          }
        }
      }
    
      authorizeUser(loginForm): void {
        const loginCredentials = {
          login: this.loginForm.controls.login.value,
          password: this.loginForm.controls.password.value
        }
        this.authorizeUserService.loginWithEmail(loginCredentials)
      }

      loginWithGoogle() {
        this.authorizeUserService.loginWithGoogle();
      }

      loginWithFacebook() {
        this.authorizeUserService.loginWithFacebook();
      }

  navigateToRegisterAccount() {
    this._router.navigate(['stworz-uzytkownika']);
  }
}
