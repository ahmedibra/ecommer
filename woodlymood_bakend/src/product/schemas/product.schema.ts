
import { Schema  } from 'mongoose';

export const  Product1Schema =new Schema( {
    name:{ type:String , required:true},
    description:{ type:String, required:true},
    price:{ type:String, required:true},
    promotion:{ type:String},
    imageURL:{ type:String, required:true}, 
    quantity:{ type:Number, required:true},
    category: { type: Schema.Types.ObjectId, ref: 'Category' ,required:true},
});






