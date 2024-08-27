import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import { Login } from 'src/app/model/login';
import { User } from 'src/app/model/user';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  constructor(private auth: AuthService,
              private router: Router) {
  }

  showPassword = false;
  errorMessage: string = ''; // For displaying error messages
  fo = {} as Login;
  user ={} as User;
  ngOnInit(): void {
  }

  logIn() {
    this.auth.login(this.fo)
      .then(() => {
        this.auth.getUser(this.fo.email)
        .subscribe({
          next: data => {
            this.user=data;
            console.log("azerrrer"+this.user)
            if(this.user.email){
            if(this.user.role=="admin"){this.router.navigate(['product']).then(() => {
              window.location.reload();
            });}
            else{this.router.navigate(['/']).then(() => {
              window.location.reload();
            });
              

            }}
          },
          error: err => {
           console.log( this.errorMessage = err.error.message);
          }
        });
        console.log("aaaa"+this.fo.email+ " "+ this.fo.password)
        
      })
      .catch((error: string) => {
        this.errorMessage = error;
        this.showErrorViaToast();
      });
 
  }


  private showErrorViaToast() {

    console.error(this.errorMessage);
  }

  goToSignUp() {
    this.router.navigateByUrl('/sign-up');
  }
  


}
