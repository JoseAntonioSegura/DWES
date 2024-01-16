import { send } from "../services/smtp-service.js";


export async function emailController(req, res, next){
  await send(req.body);
  res.json({success:true})
}
