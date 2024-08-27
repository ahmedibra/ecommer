import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document,SchemaTypes, Types } from "mongoose";
import {
    
    IsNotEmpty,
    IsString,
    IsNumber
  } from 'class-validator';
export type superHeroDocument = Category & Document

@Schema({ collection : 'super-heros'})
export class Category {
 
    _id:string;
    @Prop()
    @IsNotEmpty()
    @IsString()
    name:string;

    @Prop()
    @IsNotEmpty()
    @IsString()
    image:string;
    @Prop()
    @IsNotEmpty()
    @IsString()
    title:string;

}

export const SuperHerosSchema = SchemaFactory.createForClass(Category)