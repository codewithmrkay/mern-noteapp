import ratelimite from "../config/upstash.js";

const rateLimiter = async(req,res,next)=>{
  try {
    const {success} = await ratelimite.limit("my-limit-key")
    if(!success){
        return res.status(429).json(
            {message:"to many request try after some time"}
        )
    }
    next()
  } catch (error) {
    console.error("error in ratelimiter : ",error)
    res.status(500).json({message:"internal server error"})
  }
}
export default rateLimiter