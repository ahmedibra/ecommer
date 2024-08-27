import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class User extends Document {
  _id: string;
  @Prop()
  nom: string;

  @Prop()
  prenom: string;

  @Prop()
  name: string;

  @Prop()
  password: string;

  @Prop()
  numtel: string;

  @Prop({ unique: [true, 'Duplicate email entered'] })
  email: string;

  @Prop()
  role: string;

  @Prop()
  addresse:string;
  @Prop()
  ville:string;
  @Prop()
  codepostale:string;
  
}

export const UserSchema = SchemaFactory.createForClass(User);
