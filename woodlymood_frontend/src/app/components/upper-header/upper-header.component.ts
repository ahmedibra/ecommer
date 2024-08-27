import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-upper-header',
  templateUrl: './upper-header.component.html',
  styleUrls: ['./upper-header.component.scss']
})
export class UpperHeaderComponent implements OnInit {
  isLoggedIn = false;
  constructor(private router: Router,private auth: AuthService,) {
  }


  ngOnInit(): void {
    this.isLoggedIn=this.islogin();
    
    console.log(this.isLoggedIn);
  }

  goToSignUp() {
    this.router.navigateByUrl('/sign-up');
  }

  goToSignIn() {
    this.router.navigateByUrl('/sign-in');

  }
  islogin()
  { return this.auth.isLoggedIn();
    

  }
  sedeconnecter(){
    this.auth.logout();
    this.reloadPage();
  }

  reloadPage(): void {
    window.location.reload();
  }

  goToContact(){
    this.router.navigateByUrl('/contact');
  }
}
