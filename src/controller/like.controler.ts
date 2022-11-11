import { LikeRepository } from './../repositories/lake.repositories';
import { DemoRequest } from './../middleweire/cheekToken';
import { Request, Response } from "express";

let LiketRepo = new LikeRepository();



let POST = async (req: DemoRequest, res: Response) => {
  try {
    let rezult = await LiketRepo.postLike({ user_id: req.user_id as string, post_id: req.body.post_id });

    return res.status(200).send({
      status: 200,
      message: "ok",
      data: rezult
    });
  } catch (error) {
    return res.status(400).send({
      status: 400,
      message: (error as Error).message
    });
  }
}






export default {
  POST
}