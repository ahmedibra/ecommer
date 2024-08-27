import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http'
@Component({
  selector: 'app-perso',
  templateUrl: './perso.component.html',
  styleUrls: ['./perso.component.scss']
})
export class PersoComponent implements OnInit {

  contactForm: FormGroup;
  responseMessage: string="";
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.contactForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      titre: ['', [Validators.required]],
      bois: ['', Validators.required],
      largeur: ['', [Validators.required]],
      longueur: ['', Validators.required],
      hauteur: ['', Validators.required],
      description: ['', Validators.required],
    });
  }
  ngOnInit(): void {
  }
  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit() {
    console.log("xfdsfge");
    console.log(this.contactForm.value);
    const formData = new FormData();
    formData.append('email', this.contactForm.get('email')?.value);
    formData.append('titre', this.contactForm.get('titre')?.value);
    formData.append('bois', this.contactForm.get('bois')?.value);
    formData.append('largeur', this.contactForm.get('largeur')?.value);
    formData.append('longueur', this.contactForm.get('longueur')?.value);
    formData.append('hauteur', this.contactForm.get('hauteur')?.value);
    formData.append('description', this.contactForm.get('description')?.value);
    formData.append('image', "aaaaaaa.jpg");
    if(this.selectedFile){
    formData.append('file', this.selectedFile);}
    if (this.contactForm.valid) {
      this.http.post('http://localhost:3000/send-email', formData)
        .subscribe(
          response => {
            this.responseMessage = 'Email envoyer avec succés!';console.log(this.responseMessage);this.contactForm.reset();
          },
          error => {
            this.responseMessage = 'Email pas envoyer';console.log(this.responseMessage);
          }
        );
    }
  }

  

}
