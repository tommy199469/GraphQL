import mongoose , { Schema } from 'mongoose';


const GameSchema: Schema = new Schema({
  id: { type: Number, required: true, unique: true },
  blue: { type: Number, required: true },
  orange: { type: Number, required: true }
},{timestamps: { createdAt: 'created_at' }});

export interface IGAME extends mongoose.Document {
  id: Number;
  blue: Number;
  orange: Number
}


const game = mongoose.model<IGAME>("game", GameSchema);


export default game;
