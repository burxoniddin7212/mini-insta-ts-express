import CommentSchema from "../modules/Comments";
import PhotoSchema from "../modules/Photos"


interface commentPost {
   tittle: string,
   user_id: string,
   post_id: string
}

export class CommentRepository {


   async getAll() {
      let comments = await CommentSchema.find({ status: "active" });
      return comments
   }

   async post(data: commentPost) {
      let comment = await CommentSchema.create(data);
      let photo = await PhotoSchema.findByIdAndUpdate(
         { _id: data.post_id },
         { $push: { comments: comment._id } }
      );
      return comment
   }

   async delete(_id: string, user_id: string) {

      let comment = await this.findById(_id);

      if (!comment) {
         throw new Error("data not found");
      }

      let photo = await PhotoSchema.find({ user_id });

      let value: number = 0;
      photo.forEach(data => {
         data.comments.forEach(info => {
            if (info == _id) {
               value = value + 1;
            }
         })
      })

      if (user_id == comment?.user_id || value > 0) {
         let removeComment = await CommentSchema.updateOne(
            { _id: _id },
            { status: "delete" }
         );

         let removedcomment = await CommentSchema.findById({ _id: _id });

         return removedcomment
      } else {
         throw new Error("can only delete what he wrote or posted himself");
      }

   }


   async findById(_id: string) {
      let data = await CommentSchema.findById({ _id: _id, status: "active" });
      return data
   }
}