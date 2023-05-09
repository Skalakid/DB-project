import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent {
  regexMin8Characters = /^(.*?).{8,}/;
  regexSpecialCharacter = /(?=.*[@#$%^&+!=*])/;
  regexCapitalCharacter = /(?=.*\p{Lu})/gu;
  regexDigit = /(?=.*\d)/;

  modelForm: FormGroup = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl(),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern(this.regexCapitalCharacter),
      Validators.pattern(this.regexDigit),
      Validators.pattern(this.regexSpecialCharacter),
    ]),
    repeatedPassword: new FormControl(),
  });

  constructor(
    private _authService: AuthService,
    private formBuilder: FormBuilder
  ) {}

  onSubmit(form: FormGroup) {
    const data = form.value;
    const firstName = data.firstName;
    const lastName = data.lastName;
    const email = data.email;
    const phone = data.phoneNumber;
    const password = data.password;
    const repeatedPassword = data.repeatedPassword;

    if (repeatedPassword !== password) {
      alert("Passwords don't match");
      return;
    }
    this._authService.register(firstName, lastName, email, phone, password);
  }
}
