import { UserRepository } from './../repositories/user.repository';
import { Request, Response } from "express";
import { DemoRequest } from '../middleweire/cheekToken';


let UserRepo = new UserRepository();

let GET = async (req: Request, res: Response) => {
  try {
    let record
    if (req.query?.name) {
      record = await UserRepo.getAllRegex(req.query.name as string);
    }
    else {
      if (req.params?.id as string) {
        record = await UserRepo.getById(req.params.id as string);
        if (record?.status == "closed") {
          return res.status(200).send({
            status: 200,
            message: "closed profile"
          });
        }
      } else {
        record = await UserRepo.getAll();
      }
    }

    return res.status(200).send({
      status: 200,
      message: "ok",
      data: record
    });
  } catch (error) {
    return res.status(400).send({
      status: 400,
      message: (error as Error).message
    });
  }
}

let GETREGEX = async (req: Request, res: Response) => {
  try {
    let record = await UserRepo.getAllRegex(req.query.name as string);
    return res.status(200).send({
      status: 200,
      message: "ok",
      data: record
    });
  } catch (error) {
    return res.status(400).send({
      status: 400,
      message: (error as Error).message
    });
  }
}

let DELETE = async (req: DemoRequest, res: Response) => {
  try {
    if (!req.body?.password) {
      return res.status(400).send({
        status: 400,
        message: "password required"
      });
    }
    let record = await UserRepo.delete({ user_id: req.user_id as string, password: req.body?.password });
    return res.status(200).send({
      status: 200,
      message: "deleted",
      data: record
    });
  } catch (error) {
    return res.status(400).send({
      status: 400,
      message: (error as Error).message
    });
  }
}

let SIGNIN = async (req: Request, res: Response) => {
  try {
    let record = await UserRepo.signin(req.body.email, req.body.password)
    let { user: { email, _id, user_name }, token } = record;
    return res.status(200).send({ email, _id, user_name, token })
  } catch (error) {
    return res.status(400).send({
      status: 400,
      message: (error as Error).message
    });
  }
}


let SIGNUP = async (req: Request, res: Response) => {
  try {
    let record = await UserRepo.signup(req.body)
    let { email, _id, user_name, token } = record;
    return res.status(200).send({ email, _id, user_name, token })
  } catch (error) {
    return res.status(400).send({
      status: 400,
      message: (error as Error).message
    });
  }
}


export default {
  GET,
  SIGNIN,
  SIGNUP,
  GETREGEX,
  DELETE
}