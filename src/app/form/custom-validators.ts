import { FormBuilder, FormGroup, ValidationErrors, AbstractControl} from '@angular/forms';


export class CustomValidators {

    public static passwordStrength(passwordControl: AbstractControl): ValidationErrors | null {
        let password: string = passwordControl.value || '';
        
        if (!passwordControl.dirty) {
            return null
        }

        if (password.length < 5 ) {
            return { passwordStrength: 'Hasło powinno składać się z conajmniej 5 znaków' };
        }

        let upperCaseCharacters = /[A-Z]+/g
        if (upperCaseCharacters.test(password) === false) {
          return { passwordStrength: 'Hasło powinno zawierać jedną dużą literę' };
        }
      
        let lowerCaseCharacters = /[a-z]+/g
        if (lowerCaseCharacters.test(password) === false) {
          return { passwordStrength: 'Hasło powinno zawierać jedną małą literę' };
        }
      
      
        let numberCharacters = /[0-9]+/g
        if (numberCharacters.test(password) === false) {
          return { passwordStrength: 'Hasło powinno zawierać cyfrę' };
        }
      
        let specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/
        if (specialCharacters.test(password) === false) {
          return { passwordStrength: 'Hasło powinno zawierać specjalny znak' };
        }
        return null;

    }

    public static passwordMatch(control: AbstractControl): ValidationErrors | null {
        const password: string = control.get('password').value,
              confirmedPassword: string = control.get('confirmedPassword').value;

        if (password === confirmedPassword) {
            return null;
        } else {
            return {matchingConfirmedPassword: true};
        }
        // debugger;
    }
}