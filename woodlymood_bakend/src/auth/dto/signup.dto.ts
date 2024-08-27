import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignUpDto {

  @IsNotEmpty()
  @IsString()
  readonly nom: string;
  
  @IsNotEmpty()
  @IsString()
  readonly prenom: string; 

  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly password: string;

  
  @IsNotEmpty()
  @IsString()
  readonly numtel: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter correct email' })
  readonly email: string;

  
  @IsNotEmpty()
  @IsString()
  readonly role: string;

  readonly addresse:string;
 
  readonly ville:string;

  readonly  codepostale:string;
}



