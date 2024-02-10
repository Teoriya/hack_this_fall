const router = require("express").Router();
const ChamberController = require("../controllers/chamber.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post("/create", authMiddleware, ChamberController.create);
router.get("/", authMiddleware, ChamberController.inactiveChambers);
router.get("/:id", authMiddleware, ChamberController.chamberById);
router.put("/:id/deactivate", authMiddleware, ChamberController.deactivate);
router.get("/:id/data", ChamberController.getChamberLanguageData);

module.exports = router;
