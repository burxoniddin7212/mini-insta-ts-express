import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface DemoRequest extends Request {
  user_id?: string;
}

let cheekToken = (req: DemoRequest, res: Response, next: NextFunction) => {
  try {
    let { token } = req.headers;
    if (!token) throw new Error("token requared");
    let { user_id } = jwt.verify(token as string, "olma") as jwt.JwtPayload;
    if (user_id) req.user_id = user_id;
    next();
  } catch (error) {
    res.status(401).send({
      status: 401,
      message: (error as Error).message,
    });
  }
};

export default cheekToken;
