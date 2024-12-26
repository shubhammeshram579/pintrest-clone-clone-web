import { Router } from "express";


const router = Router()
router.get("/" ,async (req,res,next) => {
    try {
          res.send("shubham meshrm")
    } catch (error) {
      console.log("somthing went error",error.message)
      
    }
})


export default router