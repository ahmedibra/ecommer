import { Body, Controller, Get, Post,Param,Put } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';
import { User } from './schemas/user.schema';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() signUpDto: SignUpDto): Promise<{ token: string }> {
    return this.authService.signUp(signUpDto);
  }

  @Post('/login')
  login(@Body() loginDto: LoginDto): Promise<{ token: string}> {
    return this.authService.login(loginDto);
  }

  @Get(':email')
  async getUser(
    @Param('email')
    email: string,
  ): Promise<User> {
    return this.authService.findByEmail(email);
  }

  @Get('/user/:id')
  async getUserById(
    @Param('id')
    id: string,
  ): Promise<User> {
    return this.authService.findById(id);
  }


  
  @Put('/update')
  async  updateUp(@Body() body:{id:string,nom:string,prenom:string,numtel:string, email:string, addresse:string,ville:string,codepostale:string}) {
    return this.authService.update(body.id,body.nom,body.prenom,body.numtel, body.email, body.addresse,body.ville,body.codepostale);
  }
}
