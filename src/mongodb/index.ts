import mongoose , { Schema } from 'mongoose';


const GameSchema: Schema = new Schema({
  id: { type: String, required: true, unique: true },
  blue: { type: Number, required: true },
  orange: { type: Number, required: true }
},{timestamps: { createdAt: 'created_at' }});

export interface IGAME extends mongoose.Document {
  id: String;
  blue: Number;
  orange: Number
}


const game = mongoose.model<IGAME>("game", GameSchema);
export default game;
