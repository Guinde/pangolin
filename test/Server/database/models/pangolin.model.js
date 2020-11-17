const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");

const pangolinSchema = Schema({
  login: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  famille: {
    type: String,
    required: true,
  },
  race: {
    type: String,
    required: true,
  },
  nourriture: {
    type: [String],
  },
  following: {
    type: [Schema.Types.ObjectId],
    ref: "pangolins",
  },
});

/**
 * @param { Object } error
 * @param { Object } res
 * @param { Function } res
 * @desc Handle custom errors message
 * @return { String }
 */
const handleErrorSchema = (error, res, next) => {
  if (error.name === "MongoError" && error.code === 11000)
    next(new Error("This Pangolin already exist"));
  else if (error.name === "ValidationError") {
    const err = error.message.split(":");
    const e = err[2];
    next(new Error(e));
  } else next(error);
};

pangolinSchema.post("save", handleErrorSchema);

/**
 * @param { String } pwd
 * @desc hash password before insert to the DB
 * @return { String } password hashed
 */
pangolinSchema.statics.hashPassword = pwd => {
  return bcrypt.hash(pwd, 12);
};

/**
 * @param { String } pwd
 * @desc compare password with DB
 * @return { String } bool
 */
pangolinSchema.methods.comparePassword = function (pwd) {
  return bcrypt.compare(pwd, this.password);
};

module.exports = mongoose.model("pangolins", pangolinSchema);
