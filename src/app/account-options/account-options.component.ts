import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { PoliciesService } from '../core/policies.service';
import { AccountOptions } from './account-options';

@Component({
  selector: 'app-account-options',
  templateUrl: './account-options.component.html',
  styleUrls: ['./account-options.component.less']
})
export class AccountOptionsComponent implements OnInit {
  @Input() isDisabled: boolean;

  form: FormGroup;
  isDataLoaded = false;
  errorCode: number;
  errorMessage: string;

  loginIdentifierConflictOptions = [
    'ignore',
    'failOnSiteConflictingIdentity',
    'failOnAnyConflictingIdentity'
  ];

  constructor(private policiesService: PoliciesService) { }

  ngOnInit() {
    this.policiesService.getAccountOptions()
      .subscribe(resp => {
        this.initForm(resp);
        this.isDataLoaded = true;
      });
  }

  private initForm(data: AccountOptions) {
    this.form = new FormGroup({
      verifyEmail: new FormControl({value: data.verifyEmail, disabled: this.isDisabled}),
      verifyProviderEmail: new FormControl({value: data.verifyProviderEmail, disabled: this.isDisabled}),
      allowUnverifiedLogin: new FormControl({value: data.allowUnverifiedLogin, disabled: this.isDisabled}),
      preventLoginIDHarvesting: new FormControl({value: data.preventLoginIDHarvesting, disabled: this.isDisabled}),
      sendWelcomeEmail: new FormControl({value: data.sendWelcomeEmail, disabled: this.isDisabled}),
      sendAccountDeletedEmail: new FormControl({value: data.sendAccountDeletedEmail, disabled: this.isDisabled}),
      defaultLanguage: new FormControl({value: data.defaultLanguage, disabled: this.isDisabled}),
      loginIdentifierConflict: new FormControl({value: data.loginIdentifierConflict, disabled: this.isDisabled}),
      loginIdentifiers: new FormControl({value: data.loginIdentifiers, disabled: this.isDisabled}, Validators.pattern('^[a-zA-Z0-9]+(, ?[a-zA-Z0-9]+)*$'))
    });
  }

  onSave() {
    this.policiesService.setAccountOptions(this.form.value)
      .subscribe(resp => {
        this.errorCode = resp.errorCode;
        this.errorMessage = resp.errorMessage;
        if (this.errorCode === 0) {
          setTimeout(() => this.errorCode = null, 3000);
        }
      });
  }

}

