import { Router } from "express";
import { signUp } from "../controllers/userController";
var router = Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/signUp", signUp);

export default router;
