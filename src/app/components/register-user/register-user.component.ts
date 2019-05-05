import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router} from '@angular/router';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { CustomValidators } from '../../form/custom-validators';
import { ValidationErrorMessages } from '../../form/validation-messages';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {
  createUserForm: FormGroup;
  formErrors = {
    name: '',
    surname: '',
    email: '',
    login: '',
    passwordGroup: ''
  };

  constructor(private _router: Router, private _fb: FormBuilder, private _http: HttpClient) { }

  ngOnInit() {
    this.createUserForm = this._fb.group({
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.minLength(5), Validators.email]],
      login: ['', [Validators.required, Validators.minLength(3)]],
      passwordGroup: 
        this._fb.group({
          password: ['', [CustomValidators.passwordStrength]],
          confirmedPassword: ['', [Validators.required, Validators.minLength(5)]]
        }, { validators: CustomValidators.passwordMatch } )
    });

    this.createUserForm.valueChanges.pipe(
      debounceTime(500)
    ).subscribe(() => {
      this.onControlValueChanged();
    });
  }

  onControlValueChanged() {
    const form = this.createUserForm;
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

  createNewUser() {
    //TODO: request to firebase and login user to app
  }
}
