import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {
private username$ = new BehaviorSubject<string>("");
private role$ = new BehaviorSubject<string>("");
constructor() { }


public getRoleFromStore(){
  return this.role$.asObservable();
}

public getUsernameFromStore(){
  return this.username$.asObservable();
}

public setRoleForStore(role : string){
 this.role$.next(role);
}

public setUsernameForStore(username : string){
  this.username$.next(username);
 }
}
