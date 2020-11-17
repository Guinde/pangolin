const router = require("express").Router();
const { signup, signin, signout } = require("../controllers/auth.controllers");
const {
  checkParamsSignin,
  checkParamsSignup,
  isAuthenticated,
} = require("../middlewares/security.middleware");

const { isLoggedIn } = require("../middlewares/security.middleware");

/**
 * @route POST /signup
 * @desc Create New User
 */
router.post("/signup", checkParamsSignup, signup);

/**
 * @route POST /signin
 * @desc Login Pangolin
 */
router.post("/signin", checkParamsSignin, signin);

/**
 * @route GET /signout
 * @desc Logout Pangolin
 */
router.get("/signout", isLoggedIn, signout);

module.exports = router;
