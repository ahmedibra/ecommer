import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';

import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import * as mongoose from 'mongoose';

import {NotFoundException,} from '@nestjs/common';


@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
    const {nom,prenom,name,password,numtel, email,role  } = signUpDto;


    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userModel.create({
      nom,
      prenom,
      name,
      password: hashedPassword,
      numtel, 
      email,
      role,addresse:"",
 
      ville:"",codepostale:"",
      
    });

    const token = this.jwtService.sign({ id: user._id });

    return { token };
  }

  async login(loginDto: LoginDto): Promise<{ token: string,user:User }> {
    const { email, password } = loginDto;

    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const token = this.jwtService.sign({ id: user._id });

    return { token,user };
  }
  async findByEmail(email: string): Promise<User> {
  
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new NotFoundException('Book not found.');
    }

    return user;
  }

  async findById(_id: string): Promise<User> {
  
    const user = await this.userModel.findById({ _id });

    if (!user) {
      throw new NotFoundException('Book not found.');
    }

    return user;
  }

  async update(id,nom,prenom,numtel, email, addresse,ville,codepostale){
   
    const user = await this.userModel.findByIdAndUpdate(id,{nom,prenom,addresse,ville,codepostale,numtel, email});
  }
}
