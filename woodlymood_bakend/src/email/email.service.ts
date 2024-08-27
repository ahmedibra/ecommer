import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      host:"smtp.gmail.com",
      port:'587',
      auth: {
        user: 'ibrahimiasma111@gmail.com', // Replace with your email
        pass: 'norn lizz ckxd pmto'   // Replace with your email password    norn lizz ckxd pmto    laplusbelle2020
      }
    });
  }

  async sendMail(to: string, subject: string, html: string): Promise<void> {
    const mailOptions: nodemailer.SendMailOptions = {
      from: 'ibrahimiasma111@gmail.com',
      to,
      subject,
      html
    };

    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Failed to send email.');
    }
  }
}

