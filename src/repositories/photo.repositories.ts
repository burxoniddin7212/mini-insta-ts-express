import { Multer } from "multer";
import PhotoSchema from "../modules/Photos";
import UserSchema from "../modules/Users";

export interface photoSchema {
  title: string;
  like?: string;
  user: string;
  photo?: string;
}

interface photoSchemaUpdate {
  title?: string;
  _id: string;
}

interface photoSchemaDelete {
  user_id: string;
  _id: string;
}

export class PhotoRepository {
  async getAll() {
    const record = await PhotoSchema.find({ status: "active" });
    return record;
  }

  async getById(_id: string) {
    const record = await PhotoSchema.find({ status: "active", _id });
    return record;
  }

  async photoPost(data: photoSchema) {
    const record = await PhotoSchema.create(data);
    const user = await UserSchema.findByIdAndUpdate(
      { _id: record.user },
      { $push: { posts: record._id } }
    );

    return record;
  }

  async photoUpdate(data: photoSchemaUpdate, _id: string, filename: string) {
    const record = await this.findOne(data._id);
    if (!record) throw new Error("not found");
    if (_id != record.user) throw new Error("can only update itself");

    const post = await PhotoSchema.findByIdAndUpdate(
      { _id: data._id },
      {
        title: data.title ? data.title : record.title,
        photo: filename ? filename : record.photo,
      }
    );
    const updatedPost = await this.findOne(data._id);

    return updatedPost;
  }

  async photoDelete(data: photoSchemaDelete) {
    const record = await this.findOne(data._id);
    if (!record) throw new Error("not found");
    if (data.user_id != record.user) throw new Error("can only delete itself");

    const post = await PhotoSchema.updateOne(
      { _id: data._id },
      { status: "delete" }
    );

    return post;
  }

  async findOne(_id: string) {
    const record = await PhotoSchema.findOne({ _id: _id, status: "active" });
    return record;
  }
}
