import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NgToastService } from 'ng-angular-popup';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router = inject(Router)
  const service = inject(AuthService)
  const toast = inject(NgToastService)

  if(service.isLoggedIn())
  {
    return true;
  }
  else{
    toast.error({detail:"ERROR",summary:'You must be logged in to view that page',duration:5000,sticky:true});
    router.navigateByUrl('');
    return false;
  }
};
