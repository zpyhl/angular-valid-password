import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { PASSWORD_NO_HIGH_ASCII_REGEX, PASSWORD_SPECIAL_CHARS, PASSWORD_VERIFY_REGEX, MAX_PWD_LENGTH, MIN_PWD_LENGTH } from '../const';

@Component({
    selector: 'app-change-password',
    templateUrl: 'password.component.html',
    styleUrls: ['password.component.css'],
})

export class PasswordComponent implements OnInit {

  constructor(private fb: FormBuilder) {}

    passwordForm: FormGroup;
    currentPassword: FormControl;
    newPassword: FormControl;
    confirmPassword: FormControl;
    // errorResponse: ErrorResponse;
    showPolicyErrors: boolean = false;
    enablePwdNotMatchError: boolean = false;
    pending: boolean = false;
    invalidCurrentPwd: boolean = false;
    success: boolean = false;
    validationMap: any = {
        length: false,
        special: false,
        capital: false,
        lowercase: false,
        number: false,
        highAscii: false,
    };
    minPasswordLength: number = MIN_PWD_LENGTH;
    maxPasswordLength: number = MAX_PWD_LENGTH;
    specialCharacter: string = `!@#$%^&*()_+=[]-{|}',./:;<>?~`;

    /*remove '\\' chars, so it will be displayed properly in the UI*/
    pwdSpecialCharsDisplay = PASSWORD_SPECIAL_CHARS.split('\\').join('');


    ngOnInit() {
        this.newPassword =
        new FormControl('', [Validators.required, Validators.pattern(PASSWORD_VERIFY_REGEX),
            Validators.pattern(PASSWORD_NO_HIGH_ASCII_REGEX)]);
        this.confirmPassword =
        new FormControl('', [Validators.required, CustomValidators.equalTo(this.newPassword)]);
        this.currentPassword = new FormControl('', [Validators.required]);

        this.passwordForm = this.fb.group({
            'currentPassword': this.currentPassword,
            'newPassword': this.newPassword,
            'confirmPassword': this.confirmPassword,
        });

    }

    doSubmit(passwordsObj: any) {
        this.resetError();
        passwordsObj.resetEmail = true;
    }

    verifyPassword() {
        this.validationMap.length =
          this.newPassword.value.length >= this.minPasswordLength
          && this.newPassword.value.length <= this.maxPasswordLength;
        this.validationMap.capital = this.newPassword.value.match(/[A-Z]/) !== null;
        this.validationMap.lowercase = this.newPassword.value.match(/[a-z]/) !== null;
        this.validationMap.number = this.newPassword.value.match(/[0-9]/) !== null;
        this.validationMap.special =
          this.newPassword.value.match(`[${PASSWORD_SPECIAL_CHARS}]`) !== null;
        this.validationMap.highAscii = PASSWORD_NO_HIGH_ASCII_REGEX.test(this.newPassword.value);
    }

    /**
     * Return true if passwords are not empty and do not match.
     */
    showError() {
        const passwordControl = this.passwordForm.controls['newPassword'];
        const confirmControl = this.passwordForm.controls['confirmPassword'];

        return (passwordControl.value !== '' || confirmControl.value !== '') &&
            passwordControl.value !== confirmControl.value;
    }

    /**
     * Once the user is out of focus from the pwd field, mark the relevant pwd policy errors
     */
    markPwdPolicyErrors() {
        this.showPolicyErrors = true;
    }

    /**
     * Once the user starts typing the pwd confirmation field, enable the 'password match' error.
     */
    enablePwdNotMatch() {
        this.enablePwdNotMatchError = true;
    }

    resetError() {
        this.success = false;
        // this.errorResponse = null;
    }

    resetInvalidCurrentPwd() {
        this.invalidCurrentPwd = false;
    }


}
