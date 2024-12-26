import { Router } from "express";

import {getUsers,saveUsers,deleteSaveUsers,saveUsers2} from "../controllers/SaveUser.controller.js"


import {verifyJWT} from "../middlewheres/Auth.middlewere.js"



const router = Router();
router.use(verifyJWT);

// save user for chatbox get chats router
router.route("/Saveuser").post(saveUsers)
router.route("/Saveuser2").post(saveUsers2)
router.route("/SaveUser/getSaveUsers").get(getUsers)
// router.route("/SaveUser/getSaveUsers2").get(getUsers2)
router.route("/SaveUser/deleteSaveUser").delete(deleteSaveUsers)



export default router
