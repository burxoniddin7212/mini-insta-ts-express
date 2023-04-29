import sha256 from "sha256";
import jwt from "jsonwebtoken";
import UserSchema from "../modules/Users"
import PhotoSchema from "../modules/Photos"


interface signSchema {
   user_name: string,
   password: string,
   email: string
}

interface deleteSchema {
   user_id: string,
   password: string,
}


export class UserRepository {
   async getAll() {
      const record = await UserSchema.find({ status: "active" });
      return record
   }

   async getAllRegex(value: string) {
      const record = await UserSchema.find(
         { status: "active", user_name: { $regex: '.*' + value } },
         { user_name: true }
      );

      return record
   }
   async getById(_id: string) {
      const record = await UserSchema.findOne({ _id, status: "active" }, { user_name: true }).populate({ path: 'posts' });
      return record
   }

   async delete(data: deleteSchema) {
      let user = await UserSchema.findOne(
         {
            _id: data.user_id,
            password: sha256(data.password) as string,
            status: "active"
         })

      if (!user) {
         throw new Error("invalid value")
      }
      const record = await UserSchema.updateOne(
         { _id: data.user_id },
         { user_name: 'deleteaccaunt' }
      );
      
      let post = await PhotoSchema.updateMany(
         { user: data.user_id },
         { status: 'delete' }
      );

      return record
   }


   async signin(email: string, password: string) {
      let user = await this.findOne(email);
      console.log(user);
      console.log(sha256(password) == user?.password);

      if (!user) {
         throw new Error("user not found")

      }
      else if (user.password as string != sha256(password) as string) {
         throw new Error("invalid password")
      }
      else {
         let token = jwt.sign({ user_id: user._id }, "olma");
         return { user, token }
      }
   }

   async signup(data: signSchema) {
      let user = await this.findOne(data.email);
      if (user) {
         throw new Error("email unieq")
      }
      else {
         data.password = sha256(data.password);
         const { user_name, _id, email, password } = await UserSchema.create(data);
         let token = jwt.sign({ user_id: _id }, "olma");
         return { user_name, _id, email, password, token }
      }
   }


   async findOne(email: string) {
      const record = await UserSchema.findOne({ email: email })
      return record
   }
}