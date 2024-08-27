import { Body, Controller, Post,UploadedFile, UseInterceptors, HttpException, HttpStatus } from '@nestjs/common';
import { EmailService } from './email.service';
import { diskStorage } from 'multer';
import * as path from 'path';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { readFileSync } from 'fs';
import { join } from 'path';
@Controller('send-email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, callback) => {
        const filename = Date.now() + extname(file.originalname);
        callback(null, filename);
      },
    }),
  }))
  async sendEmail(@Body() body: { email: string;titre: string,
    bois: string,largeur:number,longueur:number, hauteur:number,image:string,description: string},@UploadedFile() file: Express.Multer.File) {
      body.image=file.fieldname;
    const { email,titre,bois,largeur,longueur,image, hauteur,description } = body;
    const imageUrl =`http://localhost:3000/uploads/${file.filename}`;

   
    try {
      await this.emailService.sendMail(
        'ibrahimiasma111@gmail.com', // Replace with recipient's email
        'Personalisation',
         `<p>Ce message est de  ${email}</p>  <p>titre :${titre}\n\n </p><p>bois :${bois}\n\n </p><p>largeur :${largeur}\n\n </p><p>longeur :${longueur}\n\n</p><p> hauteur :${hauteur}\n\n</p><p> description :${description}\n\n </p><p>
         <img src="${imageUrl}" alt="Uploaded Image" /></p> <p>Cordialement</p>
        `
      );
      return { message: 'Email sent successfully!' };
    } catch (error) {
      return { message: 'Failed to send email.' };
    }
  }

  @Post("/contact")
  async sendEmailc(@Body() body: { email: string;username: string,
    phone: string,message: string}) {
    const { email,username, phone,message} = body;

    try {
      await this.emailService.sendMail(
        'ibrahimiasma111@gmail.com', // Replace with recipient's email
        'Contact',
        `<p>Ce mssage de ${email}</p><p> Utilisateur ${username}</p><p> Tel :${phone}</p><p>  Description :${message}</p><p> Cordialment</p>`
      );
      return { message: 'Email sent successfully!' };
    } catch (error) {
      return { message: 'Failed to send email.' };
    }
  }

  @Post("/checkout")
  async sendCheckout(@Body() body: { nom:string,prenom:string,total:number,email:string,adresse:string,ville:string,codepostale:string}) {
    const { nom,prenom,total,email,adresse,ville,codepostale} = body;

    try {
      await this.emailService.sendMail(
        email, // Replace with recipient's email
        'Livraison',
        `<p>Bonjour ${nom}  ${prenom}</p>
        <p> votre commande de totale : ${total} sera livrer dans 24 heure à ${adresse} ${ville}  ${codepostale}</p>
        <p> Cordialment</p>`
      );
      return { message: 'Email sent successfully!' };
    } catch (error) {
      return { message: 'Failed to send email.' };
    }
  }
}



