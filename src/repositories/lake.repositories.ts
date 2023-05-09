import CommentSchema from "../modules/Comments";
import PhotoSchema from "../modules/Photos";
import LikeSchema from "../modules/Like";

interface likePost {
  user_id: string;
  post_id: string;
}

export class LikeRepository {
  async postLike(data: likePost) {
    let record = await LikeSchema.find(data);

    if (!record[0]) {
      let post = await PhotoSchema.findById({ _id: data.post_id });
      if (!post) throw new Error("not found");

      let like = await LikeSchema.create(data);
      let count = post?.like;
      let likeCount = +count + 1;
      let post1 = await PhotoSchema.updateOne(
        { _id: data.post_id },
        { like: likeCount }
      );

      return like;
    }

    if (record[0].status == "active") {
      let post = await PhotoSchema.findById({ _id: data.post_id });
      if (!post) throw new Error("not found");

      let count = post?.like;
      let likeCount = +count - 1;
      let post1 = await PhotoSchema.updateOne(
        { _id: data.post_id },
        { like: likeCount }
      );
      let like = await LikeSchema.updateOne(
        { user_id: data.user_id, post_id: data.post_id },
        { status: "delete" }
      );

      return like;
    }

    if (record[0].status == "delete") {
      let post = await PhotoSchema.findById({ _id: data.post_id });
      if (!post) throw new Error("not found");

      let count = post?.like;
      let likeCount = +count + 1;
      let post1 = await PhotoSchema.updateOne(
        { _id: data.post_id },
        { like: likeCount }
      );
      let like = await LikeSchema.updateOne(
        { user_id: data.user_id, post_id: data.post_id },
        { status: "active" }
      );

      return like;
    }
  }
}
