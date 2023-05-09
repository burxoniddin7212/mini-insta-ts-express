import {
  PhotoRepository,
  photoSchema,
} from "./../repositories/photo.repositories";
import { Request, Response } from "express";
import PhotoSchema from "../modules/Photos";
import { DemoRequest } from "../middleweire/cheekToken";

let PhotoRepo = new PhotoRepository();

let POST = async (req: Request, res: Response) => {
  try {
    const requestData: photoSchema = {
      photo: req.file?.filename,
      title: req.body.title,
      user: req.body.user,
    };
    let record = await PhotoRepo.photoPost(requestData);

    return res.status(200).send({
      status: 200,
      message: "ok",
      data: record,
    });
  } catch (error) {
    return res.status(400).send({
      status: 400,
      message: (error as Error).message,
    });
  }
};

let UPDATE = async (req: DemoRequest, res: Response) => {
  try {
    let record = await PhotoRepo.photoUpdate(
      req.body,
      req.user_id as string,
      req.file?.filename as string
    );

    return res.status(200).send({
      status: 200,
      message: "ok",
      data: record,
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
    let record = await PhotoRepo.photoDelete({
      user_id: req.user_id as string,
      _id: req.params.id,
    });

    return res.status(200).send({
      status: 200,
      message: "deleted",
    });
  } catch (error) {
    if ((error as Error).name == "CastError") {
      return res.status(400).send({
        status: 400,
        message: "Validation error",
      });
    }
    return res.status(400).send({
      status: 400,
      message: error,
    });
  }
};

let GETALL = async (req: Request, res: Response) => {
  try {
    if (req.params?.id) {
      let record = await PhotoRepo.getById(req.params.id);
      return res.status(200).send({
        status: 200,
        message: "ok",
        data: record,
      });
    }
    let record = await PhotoRepo.getAll();

    return res.status(200).send({
      status: 200,
      message: "ok",
      data: record,
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
  UPDATE,
  DELETE,
  GETALL,
};
