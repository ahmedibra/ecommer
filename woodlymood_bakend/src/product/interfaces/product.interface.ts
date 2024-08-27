import { Document, Schema } from "mongoose";

export interface Product extends Document {
    name:String;
    description: String;
    price: String;
    imageURL: String;
    promotion:String;
    quantity:Number;
    category: Schema.Types.ObjectId;


    
}