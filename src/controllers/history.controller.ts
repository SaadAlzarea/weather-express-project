import { History } from "../models/history.model"
import { verifyToken } from "../config/jwt"
import { Request, Response } from "express";
import { BAD_REQUEST, CREATED, OK, UNAUTHORIZED } from "../utils/http-status";



export const getHistory = async (req: Request, res: Response) => {
    const { count, skip, limit, sort } = req.query
    console.log(req.headers.authorization)

    const token = req.headers.authorization
    const verify = verifyToken(token?.split(' ')[1] as string)
    if(!verify){
        res.status(UNAUTHORIZED) 
        .json({
            success:false,
            error:{
                message: 'You should To Sign In'
            }
        })
        return
    }
    try {
        if(count == 'true'){
            const historyCount = await History.find();
            res.status(OK) 
            .json({
                success: true,
                total: historyCount.length
            })
        }
      const historyExist = await History.find({user: verify.userId}).populate({
            path: 'weather',
          }).sort(sort as string).limit(Number(limit)).skip(parseInt(skip as string))

      res.status(OK).json({
        success:true,
        data:historyExist
      })
    } catch (err: any) {
        res.status(BAD_REQUEST)
        .json({
            success:false,
            error:{
                message:`Error in get weather: ${err.message}`
            }
        })
    }

}