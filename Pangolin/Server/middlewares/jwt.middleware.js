const jwt = require("jsonwebtoken");
const { getPangolinByLogin } = require("../queries/pangolin.queries");

const secret = "db503d6b-2fcb-438d-bb47-841991375217";

/**
 * @param { Object } token
 * @desc Create token
 * @return { Object } new token
 */
exports.createJwtToken = login => {
  const jwtToken = jwt.sign(
    {
      login: login,
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
    },
    secret
  );
  return jwtToken;
};

/**
 * @param { Object } token
 * @desc Check if the token is valid
 * @return { Object } token if is valid
 */
const checkExpirationToken = token => {
  const tokenExp = token.exp;
  const nowInSec = Math.floor(Date.now() / 1000);
  if (nowInSec <= tokenExp) {
    return token;
  } else if (nowInSec > tokenExp && nowInSec - tokenExp < 60 * 10) {
    const newToken = createJwtToken(token.login);
    res.cookie("jwt", newToken);
    return jwt.verify(newToken, secret);
  } else {
    throw new Error("token expired");
  }
};

//Middleware extract infos Pangolin from token
exports.extractPangolinFromToken = async (token, req) => {
  try {
    const decodedToken = jwt.verify(token, secret, { ignoreExpiration: true });
    const refreshToken = checkExpirationToken(decodedToken);
    const pangolin = await getPangolinByLogin(refreshToken.login);
    if (pangolin) {
      req.pangolin = pangolin;
      return true;
    } else return false;
  } catch (e) {
    return false;
  }
};

exports.addReqFeatures = (req, res, next) => {
  req.logout = () => {
    req.pangolin = null;
  };
  next();
};
