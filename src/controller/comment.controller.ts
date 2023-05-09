import { CommentRepository } from "./../repositories/comment.repositories";
import { DemoRequest } from "./../middleweire/cheekToken";
import { Request, Response } from "express";

let CommentRepo = new CommentRepository();

let GET = async (req: DemoRequest, res: Response) => {
  try {
    let rezult = await CommentRepo.getAll();

    return res.status(200).send({
      status: 200,
      message: "ok",
      data: rezult,
    });
  } catch (error) {
    return res.status(400).send({
      status: 400,
      message: (error as Error).message,
    });
  }
};

let POST = async (req: DemoRequest, res: Response) => {
  try {
    let rezult = await CommentRepo.post({
      ...req.body,
      user_id: req.user_id as string,
    });

    return res.status(200).send({
      status: 200,
      message: "ok",
      data: rezult,
    });
  } catch (error) {
    return res.status(400).send({
      status: 400,
      message: (error as Error).message,
    });
  }
};

let DELETE = async (req: DemoRequest, res: Response) => {
  try {
    let rezult = await CommentRepo.delete(req.params.id, req.user_id as string);

    return res.status(200).send({
      status: 200,
      message: "deleted",
      data: rezult,
    });
  } catch (error) {
    return res.status(400).send({
      status: 400,
      message: (error as Error).message,
    });
  }
};

export default {
  POST,
  DELETE,
  GET,
};
