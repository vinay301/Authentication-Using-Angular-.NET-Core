import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';
import { UserStoreService } from '../../services/user-store.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public users :any = [];
  public username : string = "";
  public role !: string;
  constructor(private authService : AuthService, private apiService : ApiService, private userStore : UserStoreService) { }

  ngOnInit() {
    this.apiService.getAllUsers().subscribe(res => {
      this.users = res;
    });

    this.userStore.getUsernameFromStore().subscribe(res => {
      const usernameFromToken = this.authService.getUsernameFromToken();
      this.username = res || usernameFromToken;
      
    })

    this.userStore.getRoleFromStore().subscribe(res => {
      const roleFromToken = this.authService.getRoleFromToken();
      this.role = res || roleFromToken
    })
  }

  logout(){
    this.authService.signOut();
  }

}
