import { Injectable } from '@angular/core';
import { Jsonp, URLSearchParams, QueryEncoder, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AccountOptions } from '../account-options/account-options';
import { PolicyResponse } from './policy-response';

@Injectable()
export class PoliciesService {
  private baseUrl = 'https://accounts.gigya.com';
  private apiSettings = {
    userkey: 'AJA3Cw9XcJZf',
    secret: '1J+YxAY47khnuXf4GKSggLpPFBbQv8Hq',
    apikey: '3_inujb44QPskKBok5VwhYnqy40eaVrwAJXXLsqaHRI_6DCM3KHhxNXjjcFQe0PASK',
    format: 'jsonp',
    callback: 'JSONP_CALLBACK'
  };

  constructor(private jsonp: Jsonp) { }

  private getQueryParams(params: any) {
    let result = '';
    Object.keys(params).forEach((key, index) => result += `${index === 0 ? '' : '&'}${key}=${encodeURIComponent(params[key])}`);
    return result;
  }

  private objectToString(data: any) {
    let result = '{';
    Object.keys(data).forEach((key, index) => {
      result += `${index === 0 ? '' : ','}${key}:${typeof data[key] === 'string' ? '\"' + data[key] + '\"' : data[key]}`;
    });
    result += '}';
    return result;
  }

  getAccountOptions(): Observable<AccountOptions> {
    const url = `${this.baseUrl}/accounts.getPolicies?${this.getQueryParams(this.apiSettings)}`;
    return this.jsonp.get(url).map((resp: Response) => {
      return resp.json().accountOptions;
    });
  }

  setAccountOptions(data): Observable<PolicyResponse> {
    const url = `${this.baseUrl}/accounts.setPolicies?${this.getQueryParams(this.apiSettings)}&accountOptions=${encodeURIComponent(this.objectToString(data))}`;
    return this.jsonp.get(url).map((resp: Response) => {
      return resp.json();
    });
  }

}

