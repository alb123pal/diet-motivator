import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router} from '@angular/router';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { CustomValidators } from '../../form/custom-validators';
import { ValidationErrorMessages } from '../../form/validation-messages';
import { debounceTime } from 'rxjs/operators';
import { AuthorizeUserService } from '../../services/autorize-user.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {
  createUserForm: FormGroup;
  formErrors = {
    email: '',
    passwordGroup: ''
  };

  constructor(private _router: Router, 
              private _fb: FormBuilder, 
              private _http: HttpClient, 
              public userService: AuthorizeUserService
             ) { }

  ngOnInit() {
    this.createUserForm = this._fb.group({
      email: ['', [Validators.required, Validators.minLength(5), Validators.email]],
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
    this.userService.createAccount(this.createUserForm.value);
  }
}
