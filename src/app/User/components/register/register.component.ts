import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import * as UserAction from '../../actions';
import { UserDTO } from '../../models/user.dto';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerUser: UserDTO;

  name: FormControl;
  surname_1: FormControl;
  surname_2: FormControl;
  alias: FormControl;
  birth_date: FormControl;
  email: FormControl;
  password: FormControl;

  registerForm: FormGroup;
  isValidForm: boolean | null;

  loading$: Observable<boolean>;
  loaded$: Observable<boolean>;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>
  ) {
    this.registerUser = new UserDTO('', '', '', '', new Date(), '', '');

    this.isValidForm = null;

    this.name = new FormControl(this.registerUser.name, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(25),
    ]);

    this.surname_1 = new FormControl(this.registerUser.surname_1, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(25),
    ]);

    this.surname_2 = new FormControl(this.registerUser.surname_2, [
      Validators.minLength(5),
      Validators.maxLength(25),
    ]);

    this.alias = new FormControl(this.registerUser.alias, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(25),
    ]);

    this.birth_date = new FormControl(
      formatDate(this.registerUser.birth_date, 'yyyy-MM-dd', 'en'),
      [Validators.required]
    );

    this.email = new FormControl(this.registerUser.email, [
      Validators.required,
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
    ]);

    this.password = new FormControl(this.registerUser.password, [
      Validators.required,
      Validators.minLength(8),
    ]);

    this.registerForm = this.formBuilder.group({
      name: this.name,
      surname_1: this.surname_1,
      surname_2: this.surname_2,
      alias: this.alias,
      birth_date: this.birth_date,
      email: this.email,
      password: this.password,
    });

    this.loading$ = this.store.select((state) => state.auth.loading);
    this.loaded$ = this.store.select((state) => state.auth.loaded);
  }

  ngOnInit(): void {}

  register(): void {
    this.isValidForm = false;

    if (this.registerForm.invalid) {
      return;
    }

    this.isValidForm = true;
    this.registerUser = this.registerForm.value;

    const user: UserDTO = {
      name: this.registerUser.name,
      surname_1: this.registerUser.surname_1,
      surname_2: this.registerUser.surname_2,
      alias: this.registerUser.alias,
      birth_date: this.registerUser.birth_date,
      email: this.registerUser.email,
      password: this.registerUser.password,
    };

    this.store.dispatch(UserAction.register({ user }));
  }

  getErrorNameMessage(): any {
    if (this.name.hasError('required')) {
      return 'Name is required'
    }
    if (this.name.hasError('minlength') && !this.name.hasError('maxlength') && !this.name.hasError('required')) {
      return 'Name must be at least 5 characters long.'
    }
    if (this.name.hasError('maxlength') && !this.name.hasError('minlength') && !this.name.hasError('required')) {
      return 'Name can be max 25 characters long.'
    }
  }

  getErrorSurnameOneMessage(): any {
    if (this.surname_1.hasError('required')) {
      return 'Surname1 is required'
    }
    if (this.surname_1.hasError('minlength') && !this.surname_1.hasError('maxlength') && !this.surname_1.hasError('required')) {
      return 'Surname1 must be at least 5 characters long.'
    }
    if (this.surname_1.hasError('maxlength') && !this.surname_1.hasError('minlength') && !this.surname_1.hasError('required')) {
      return 'Surname1 can be max 25 characters long.'
    }
  }

  getErrorSurnameTwoMessage(): any {
    if (this.surname_2.hasError('required')) {
      return 'Surname2 is required'
    }
    if (this.surname_2.hasError('minlength') && !this.surname_2.hasError('maxlength') && !this.surname_2.hasError('required')) {
      return 'Surname2 must be at least 5 characters long.'
    }
    if (this.surname_2.hasError('maxlength') && !this.surname_2.hasError('minlength') && !this.surname_2.hasError('required')) {
      return 'Surname2 can be max 25 characters long.'
    }
  }

  getErrorSurnameAliasMessage(): any {
    if (this.alias.hasError('required')) {
      return 'Alias is required'
    }
    if (this.alias.hasError('minlength') && !this.alias.hasError('maxlength') && !this.alias.hasError('required')) {
      return 'Alias must be at least 5 characters long.'
    }
    if (this.alias.hasError('maxlength') && !this.alias.hasError('minlength') && !this.alias.hasError('required')) {
      return 'Alias can be max 25 characters long.'
    }
  }

  getErrorSurnameBirthMessage(): any {
    if (this.alias.hasError('required')) {
      return 'Birth date is required'
    }
  }

  getErrorEmailMessage(): any {
    if (this.email.hasError('required')) {
      return 'Email is required'
    }
    if (this.email.hasError('pattern') && !this.email.hasError('required')) {
      return 'Email not a valid format.'
    }
  }

  getErrorPasswordMessage(): any {
    if (this.password.hasError('required')) {
      return 'Password is required'
    }
    if (this.password.hasError('minlength') && !this.password.hasError('required')) {
      return 'Password must be at least 8 characters long.'
    }
  }
}
