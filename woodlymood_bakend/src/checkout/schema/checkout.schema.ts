import { Schema } from 'mongoose';

export const OrderSchema = new Schema({
  userId: { type: String, required: true },
  products: [
    {
      productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true },
    },
  ],
  total: { type: Number },
  livraison: { type: String, required: true },
  status: { type: Number, default: 1 },
  createdAt: { type: Date, default: Date.now },
});