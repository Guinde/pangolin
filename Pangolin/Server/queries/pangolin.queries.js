const Pangolin = require("../database/models/pangolin.model");

exports.createPangolin = async body => {
  try {
    const { login, password, age, famille, race } = body;
    const hashdPwd = await Pangolin.hashPassword(password);
    const pangolin = new Pangolin({
      login,
      age,
      famille,
      race,
      password: hashdPwd,
    });
    return pangolin.save();
  } catch (e) {
    throw new Error(e.message);
  }
};

exports.getPangolinByLogin = async login => {
  try {
    const pangolin = await Pangolin.findOne({ login: login }).exec();
    return pangolin;
  } catch (e) {
    throw new Error(e.message);
  }
};

exports.getPangolinsFriendsList = async login => {
  try {
    const pangolins = await Pangolin.findOne({ login: login })
      .populate("following")
      .select("following")
      .exec();
    return pangolins;
  } catch (e) {
    throw new Error(e.message);
  }
};

exports.getAllPangolins = async pangolin => {
  try {
    const pangolins = await Pangolin.find({
      _id: { $nin: [pangolin._id, ...pangolin.following] },
    }).exec();
    return pangolins;
  } catch (e) {
    throw new Error(e.message);
  }
};

exports.editPangolin = async (login, body) => {
  try {
    const pangolin = await Pangolin.updateOne({ login: login }, body).exec();
    return pangolin;
  } catch (e) {
    throw new Error(e.message);
  }
};

exports.addPangolin = async (id, body) => {
  try {
    return await Pangolin.updateOne(
      { _id: id },
      { $push: { following: body._id } }
    ).exec();
  } catch (e) {
    throw new Error(e.message);
  }
};

exports.removePangolin = async (id, body) => {
  try {
    return await Pangolin.updateOne(
      { _id: id },
      { $pull: { following: body._id } }
    ).exec();
  } catch (e) {
    throw new Error(e.message);
  }
};
