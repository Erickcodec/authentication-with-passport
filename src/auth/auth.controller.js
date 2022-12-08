const Users = require("../models/users.models");
const { comparePassword } = require("../utils/crypto");

async function verify({ email, password }) {
  try {
    const user = await Users.findOne({
      where: {
        email: email,
      },
    });

    if (user && comparePassword(password, user.password)) {
      return user;
    }

    return null;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  verify,
};
