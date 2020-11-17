const {
  getPangolinsFriendsList,
  editPangolin,
  getPangolinByLogin,
  getAllPangolins,
  addPangolin,
  removePangolin,
} = require("../queries/pangolin.queries");

exports.getPangolin = async (req, res) => {
  try {
    const { login } = req.pangolin;
    const [friends, pangolins] = await Promise.all([
      getPangolinsFriendsList(login),
      getAllPangolins(req.pangolin),
    ]);
    res.status(200).json({ data: req.pangolin, friends, pangolins });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.getPangolinsFriends = async (req, res) => {
  try {
    const pangolins = await getPangolinsFriendsList(req.pangolin.login);
    res.status(200).json({ data: pangolins.following });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.getAllPangolins = async (req, res) => {
  const pangolins = await getAllPangolins();
  res.status(200).json({ data: pangolins, error: null });
};

exports.editPangolin = async (req, res) => {
  if (req.pangolin) {
    try {
      const { login } = req.pangolin;
      await editPangolin(login, req.body);
      const pangolinUpdate = await getPangolinByLogin(login);
      res.status(200).json({ data: pangolinUpdate });
    } catch (e) {}
  }
};

exports.removeFriend = async (req, res) => {
  try {
    const { _id } = req.pangolin;
    await removePangolin(_id, req.body);
    res.status(200).json({ data: "success" });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.addNewFriend = async (req, res) => {
  try {
    const { _id } = req.pangolin;
    await addPangolin(_id, req.body);
    res.status(200).json({ data: "success" });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
