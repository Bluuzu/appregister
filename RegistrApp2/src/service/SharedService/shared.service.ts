import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private username: string | null = null;

  setUser(username: string){
    this.username = username;
  }

  getUser(): string | null{
    return this.username;
  }
}
