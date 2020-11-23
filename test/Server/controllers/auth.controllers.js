const { createPangolin } = require("../queries/pangolin.queries");
const { getPangolinByLogin } = require("../queries/pangolin.queries");
const { createJwtToken } = require("../middlewares/jwt.middleware");

//Middleware create New Pangolin
exports.signup = async (req, res) => {
  try {
    const body = req.body;
    const pangolin = await createPangolin(body);
    res.status(200).json({
      data: pangolin,
      error: null,
    });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

//Middleware log Pangolin with his login / password
exports.signin = async (req, res) => {
  try {
    const { login, password } = req.body;
    const pangolin = await getPangolinByLogin(login);
    if (pangolin) {
      const pwdMatch = await pangolin.comparePassword(password);
      if (pwdMatch) {
        const token = createJwtToken(pangolin.login);
        res.status(200).json({
          data: token,
        });
      }
    } else throw new Error("Wrong Login / Password");
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.signout = (req, res) => {
  req.logout();
  res.status(200).json({ data: "logout success", error: null });
};
