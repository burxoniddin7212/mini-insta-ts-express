import { Schema, model, Types } from "mongoose";



const UserSchema = new Schema({
   user_name: {
      type: String,
      required: true,
      unique: true
   },
   email: {
      type: String,
      required: true,
      unique: true
   },
   password: {
      type: String,
      required: true
   },
   posts: [{
      type: Types.ObjectId,
      ref: 'Photo'
   }],
   status: {
      type: String,
      default: "active"
   }
}, {
   versionKey: false,
   timestamps: true,
})



export default model('User', UserSchema)