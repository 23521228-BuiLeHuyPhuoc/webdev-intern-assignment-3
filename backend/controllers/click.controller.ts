import type { Request, Response } from "express";
export function handleClick(req: Request, res: Response) {
    console.log(req.body);

}