const router = require("express").Router();
const authRouter = require("./auth.routes");
const pangolinRouter = require("./pangolin.routes");
const { isLoggedIn } = require("..//middlewares/security.middleware");

router.use("/auth", authRouter);
router.use("/pangolin", isLoggedIn, pangolinRouter);

module.exports = router;
