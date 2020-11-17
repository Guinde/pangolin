const { extractPangolinFromToken } = require("./jwt.middleware");

exports.checkParamsSignin = (req, res, next) => {
  const { login, password } = req.body;
  if (!login || !password)
    res.status(400).json({ error: "You miss something" });
  else next();
};

exports.checkParamsSignup = (req, res, next) => {
  const { login, password, age, famille, race } = req.body;
  if (!login || !password || !age || !famille || !race)
    res.status(400).json({ error: "You miss something" });
  else next();
};

exports.isLoggedIn = async (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    try {
      const isLogged = await extractPangolinFromToken(token, req);
      if (isLogged) {
        next();
      } else {
        res.status(400).json({ error: "please Signin" });
      }
    } catch (e) {
      res.status(400).json({ error: "please Signin" });
    }
  } else {
    res.status(400).json({ error: "No token" });
  }
};
