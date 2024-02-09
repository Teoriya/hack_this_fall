const router = require("express").Router();
const ChamberController = require("../controllers/chamber.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post("/create", authMiddleware, ChamberController.create);

module.exports = router;
