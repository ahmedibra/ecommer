// auth.guard.ts
import { Injectable ,OnInit} from '@angular/core';
import { CanActivate, Router , ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { AuthService } from './auth.service';
import { User } from '../model/user';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements OnInit,CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
email=this.authService.getEmail();
user={} as User;
getUser(){
    this.authService.getUser(this.email)
    .subscribe({
      next: data => {
        
        this.user=data;
        //console.log( this.user);
      }});
      }

      ngOnInit() {
    this.getUser();
    console.log("ddddddddddddddddddd",this.user);
    
    };

 
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.authService.getUser(this.email).pipe(
          map(isAdmin => {
            
            this.user=isAdmin;
            if(this.user.role==="admin"){ return true; }// Allow access if the user is an admin}
             
             else {
              this.router.navigate(['/not-authorized']); // Redirect if not an admin
              return false;
            }
          }),
          catchError(error => {
            console.error('Error checking admin role:', error);
            this.router.navigate(['/not-authorized']);
            return of(false); // Block access and handle error
          })
        );
      }
    }  
