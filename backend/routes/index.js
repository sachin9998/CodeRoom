import { Router } from "express";
import {
  createProj,
  getProjects,
  login,
  saveProject,
  signUp,
} from "../controllers/userController.js";
var router = Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/signUp", signUp);
router.post("/login", login);

router.post("/createProj", createProj);
router.post("/saveProject", saveProject);

router.get("/getProjects", getProjects);

export default router;
