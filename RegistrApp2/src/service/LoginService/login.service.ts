import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private flagLogin = false;
  
  constructor () {}

  passedLogin(): boolean{
    return this.flagLogin;
  }

  setPassedLogin(passed: boolean) {
    this.flagLogin = passed;
  }
}
