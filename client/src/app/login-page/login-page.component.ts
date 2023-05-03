import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  regexMin8Characters = /^(.*?).{8,}/;
  regexSpecialCharacter = /(?=.*[@#$%^&+!=*])/;
  regexCapitalCharacter = /(?=.*\p{Lu})/gu;
  regexDigit = /(?=.*\d)/;

  modelForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern(this.regexCapitalCharacter),
      Validators.pattern(this.regexDigit),
      Validators.pattern(this.regexSpecialCharacter),
    ]),
  });

  constructor(
    private _authService: AuthService,
    private formBuilder: FormBuilder
  ) {}

  onSubmit(form: FormGroup) {
    const data = form.value;
    const email = data.email;
    const password = data.password;

    this._authService.login(email, password);
  }
}
