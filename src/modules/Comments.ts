import { Schema, model, Types } from "mongoose";



const CommentSchema = new Schema({

   user_id: {
      type: Types.ObjectId,
      required: true,
      ref: "User"
   },
   post_id: {
      type: Types.ObjectId,
      required: true,
      ref: "Photo"
   },
   tittle: {
      type: String,
      required: true
   },
   status: {
      type: String,
      default: "active"
   }
}, {
   versionKey: false,
   timestamps: true,
})



export default model('Comment', CommentSchema)