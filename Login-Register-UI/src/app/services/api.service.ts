import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseApiUrl : string = environment.baseApiUrl;
constructor(private http : HttpClient) { }

getAllUsers(){
  return this.http.get<any>(this.baseApiUrl + '/api/User')
}

}
