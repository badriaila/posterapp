import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private router : Router) { }

  canActivate(){
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if(token){
        return true;
    }else{
    this.router.navigate(['/']);
    return false;
    }
  }
}
