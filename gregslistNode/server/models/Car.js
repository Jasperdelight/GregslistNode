import { Schema } from "mongoose";


export const CarSchema = new Schema({
  make: { type: String, required: true, maxlength: 50, minlength: 3 },
  model: { type: String, required: true, maxlength: 50, minlength: 1 },
  year: { type: Number, required: true, max: 2025, min: 1901 },
  color: { type: String, maxlength: 100 },
  ownedByGrandma: { type: Boolean, required: true, default: false },
  miles: { type: Number, required: true, max: 1000000, min: 2 },
  engineType: { type: String, enum: ['v8', 'v6', 'v7', 'v19', 'big', 'small', 'electric', 'check', 'medium'], default: 'medium' },
  description: { type: String, maxlength: 500 },
  price: { type: Number, required: true, max: 1000000 },
  imgUrl: { type: String, required: true, default: 'https://images.unsplash.com/photo-1610884447640-42b8ec61a933?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1326&q=80', maxlength: 1000 },
  creatorId: { type: Schema.Types.ObjectId, required: true }
}, { timestamps: true, toJSON: { virtuals: true } })