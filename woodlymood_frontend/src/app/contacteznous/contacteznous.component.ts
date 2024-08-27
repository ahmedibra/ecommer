import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-contacteznous',
  templateUrl: './contacteznous.component.html',
  styleUrls: ['./contacteznous.component.scss']
})
export class ContacteznousComponent implements OnInit {
  contactForm: FormGroup;
  responseMessage: string="";
  constructor(private fb: FormBuilder, private http: HttpClient) { 
    this.contactForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required]],
      phone: ['', Validators.required],
      message: ['', [Validators.required]],
      
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log("xfdsfge");
    console.log(this.contactForm.value);
    if (this.contactForm.valid) {
      this.http.post('http://localhost:3000/send-email/contact', this.contactForm.value)
        .subscribe(
          response => {
            this.responseMessage = 'Email envoyer avec succés ';console.log(this.responseMessage);this.contactForm.reset();
          },
          error => {
            this.responseMessage = 'Email pas envoyer.';console.log(this.responseMessage);
          }
        );
    }
  }

}
