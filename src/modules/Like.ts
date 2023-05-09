import { Schema, model, Types } from "mongoose";

const LikeSchema = new Schema(
  {
    user_id: {
      type: Types.ObjectId,
      required: true,
      ref: "User",
    },
    post_id: {
      type: Types.ObjectId,
      required: true,
      ref: "Photo",
    },
    status: {
      type: String,
      default: "active",
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default model("Like", LikeSchema);
