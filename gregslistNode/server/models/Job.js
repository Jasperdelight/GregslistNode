import { Schema } from "mongoose";

export const JobSchema = new Schema({
  pay: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  creatorId: { type: Schema.Types.ObjectId, required: true },
}, {
  timestamps: true,
  toJSON: {
    virtuals: true
  }
});