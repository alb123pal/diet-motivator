import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { CustomValidators } from '../../form/custom-validators';
import { ValidationErrorMessages } from '../../form/validation-messages';
import { debounceTime } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

  constructor(private _router: Router, private _fb: FormBuilder, private _http: HttpClient) { }

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
    const paramsRequest = {
      login: this.loginForm.controls.login,
      password: this.loginForm.controls.password
    }
    this._router.navigate(['main']);
    // TODO: authorize request to backend 
    // this.getUser(paramsRequest).subscribe(() => {
    //   if (true) {
    //     this._router.navigate(['main']);
    //   } else {
    //     console.log('Display error');
    //   }
    // });
  }

  createNewUser(): void {
    this._router.navigate(['stworz-uzytkownika']);
  }

  getUser(params): Observable<any> {
    const url = '';
    return this._http.get(url);
  }
}
