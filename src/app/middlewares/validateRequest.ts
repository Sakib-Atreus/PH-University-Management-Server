import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

const validateRequest = (schema: AnyZodObject) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        // console.log(req.body);
  
        // validation check
        // if everything alright then next() ->
        await schema.parseAsync({
          body: req.body,
        });
  
        next();
      } catch (err) {
        next(err);
      }
    };
  };

export default validateRequest;