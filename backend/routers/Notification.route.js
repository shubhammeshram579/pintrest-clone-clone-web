import { Router } from "express";
import {notification,deleteNotification} from "../controllers/Notification.controller.js"

import {verifyJWT} from "../middlewheres/Auth.middlewere.js"

const router = Router();

// midelwere user is loging 
router.use(verifyJWT);


// user creted new post notification router
router.route("/Notification").get(notification)
router.route("/Notification/:notificationId").delete(deleteNotification)


export default router
