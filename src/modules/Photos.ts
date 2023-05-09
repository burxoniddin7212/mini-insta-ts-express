import { Schema, model, Types } from "mongoose";

const PhotoSchema = new Schema(
  {
    title: {
      type: String,
    },
    photo: {
      type: String,
      required: true,
    },
    like: {
      type: String,
      default: "0",
    },
    user: {
      type: Types.ObjectId,
      required: true,
      ref: "User",
    },
    comments: [
      {
        type: Types.ObjectId,
        ref: "Comment",
      },
    ],
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

export default model("Photo", PhotoSchema);
